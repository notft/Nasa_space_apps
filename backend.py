import sqlite3
import json
from fastapi import FastAPI, Request, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
import uuid
import hashlib
import time

app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = sqlite3.connect("foodapp.sql", check_same_thread=False)
cur = db.cursor()
try:
    cur.execute("CREATE TABLE SESSIONS (SESSION VARCHAR(255), ID BIGINT, FOREIGN KEY (ID) REFERENCES USERS(ID))")
    # cur.execute("CREATE TABLE CARTS (ITEM_ID VARCHAR(255), USER_ID)")
    cur.execute("CREATE TABLE USERS (ID BIGINT PRIMARY KEY, NAME VARCHAR(255), EMAIL VARCHAR(255), PASSWORD VARCHAR(255), NGO BOOL, USER BOOL)")
    cur.execute("CREATE TABLE ITEMS (ID VARCHAR(255) PRIMARY KEY, NAME VARCHAR(255), RESTAURANT VARCHAR(255), QUANTITY VARCHAR(255), IMG VARCHAR(255), USERID VARCHAR(255))")
    db.commit()
except:
    pass
# cur.execute("INSERT INTO ITEMS VALUES (, 'Dosa', 'Hotel', 10, 'https://test/sasdiasdo')")
# db.commit()

class Item(BaseModel):
    session: str
    name: str
    restaurant: str
    quantity: str
    image_url: str

class Signup(BaseModel):
    name: str
    email: str
    password: str
    usertype: str

class Login(BaseModel):
    email: str
    password: str

@app.post("/upload_image")
async def upload_image(file: UploadFile):
    try:
        ext = file.filename.split(".")[-1]
        filename = str(uuid.uuid4()) + "." + ext
        with open(f"uploads/{filename}", "wb") as f:
            f.write(await file.read())
        return {"status": "success", "msg": "Image Uploaded", "data": {"filename": filename, "url": f"http://localhost:8000/uploads/{filename}"}}
    except:
        return {"status": "failed", "msg": "Server Error"}

@app.get("/fetch_items")
def fetch_items():
    cur.execute("SELECT * FROM ITEMS")
    data = cur.fetchall()
    response = {}
    for x, i in enumerate(data):
        response[x] = {"id": i[0], "name": i[1], "restaurant": i[2], "quantity": i[3], "image_url" : i[4]}
    return response

@app.post("/add_item")
def add_items(item: Item, request: Request):
    try:
        print(item)
        # cookie = request.cookies.get("session")
        # print(cookie)
        cookie = item.session
        cur.execute(f'SELECT ID FROM SESSIONS WHERE SESSION = "{cookie}"')
        rows = cur.fetchall()
        if (len(rows) > 0):
            cur.execute(f'INSERT INTO ITEMS VALUES ("{uuid.uuid4()}", "{item.name}", "{item.restaurant}", "{item.quantity}", "{item.image_url}", "{rows[0][0]}")')
            db.commit()
            return {"status": "success"}
        else:
            return {"status": "failed", "msg": "Invalid Session"}
    except:
        return {"status": "failed", "msg": "Server Error"}

@app.post("/signup_user")
def signup_user(user: Signup):
    try:
        password_hash = hashlib.sha3_512(user.password.encode()).hexdigest()
        # if (user.usertype in ["ngo", "user"]):
        #     return {"status": "failed", "msg": "Invalid Request"}
        cur.execute(f'SELECT * FROM USERS WHERE EMAIL = "{user.email}"')
        if (len(cur.fetchall()) == 0):
            cur.execute("SELECT * FROM USERS")
            index = len(cur.fetchall()) + 1
            if (user.usertype == "ngo"):
                cur.execute(f'INSERT INTO USERS (ID, NAME, EMAIl, PASSWORD, NGO) VALUES ({index}, "{user.name}", "{user.email}", "{password_hash}", 1)')
            else:
                cur.execute(f'INSERT INTO USERS (ID, NAME, EMAIl, PASSWORD, USER) VALUES ({index}, "{user.name}", "{user.email}", "{password_hash}", 1)')
            db.commit()
            scookie = hashlib.sha256(str(uuid.uuid4()).encode()).hexdigest()
            cur.execute(f'INSERT INTO SESSIONS VALUES ("{scookie}", {index})')
            db.commit()
            return {"status": "success", "msg": "Signup Successfull", "data" : {"cookie": scookie, "timestamp": time.time()}}
        else:
            return {"status": "failed", "msg": "Email Already Exist"}
    except:
        return {"status": "failed", "msg": "Server Error"}

@app.post("/login_user")
def login_user(user: Login):
    try:
        password_hash = hashlib.sha3_512(user.password.encode()).hexdigest()
        if (user.email.count("'") > 0 or user.email.count('"') > 0 or user.email.count("-") > 0 or user.email.count(" ") > 0):
            return {"status": "failed", "msg": "Invalid Request"}
        cur.execute(f'SELECT ID FROM USERS WHERE EMAIL = "{user.email}" AND PASSWORD = "{password_hash}"')
        rows = cur.fetchall()
        if (len(rows) == 1):
            scookie = hashlib.sha256(str(uuid.uuid4()).encode()).hexdigest()
            cur.execute(f'INSERT INTO SESSIONS VALUES ("{scookie}", {rows[0][0]})')
            db.commit()
            return {"status": "success", "msg": "Login Successfull", "data" : {"cookie": scookie, "timestamp": time.time()}}
        else:
            return {"status": "failed", "msg": "Incorrect Username or Password"}
    except:
        return {"status": "failed", "msg": "Server Error"}

@app.get("/validate")
def validate(session: str):
    cur.execute(f'SELECT USERS.NAME, USERS.EMAIL, USERS.NGO, USERS.USER FROM SESSIONS JOIN USERS ON SESSIONS.ID = USERS.ID WHERE SESSION = "{session}"')
    rows = cur.fetchall()
    if (len(rows) == 1):
        return {"status": "success", "data": {"name": rows[0][0], "email": rows[0][1], "ngo": rows[0][2], "user": rows[0][3]}}
    else:
        return {"status": "failed"}

@app.get("/")
def root():
    return {"status": "perfect"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
