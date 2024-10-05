import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export async function middleware(req) {
  const session = getCookie('session', { req });

  if (!session) {
    if (req.url.includes('/home')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  try {
    const res = await fetch(`https://hmpp6vkz-8000.inc1.devtunnels.ms/validate?session=${session}`);
    const response = await res.json();

    if (response.status === 'success') {
      if (req.url.includes('/login')) {
        return NextResponse.redirect(new URL('/home', req.url));
      }
      return NextResponse.next();
    } else {
      if (req.url.includes('/home')) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  } catch (err) {
    console.log('Error validating session:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/home', '/login'], 
};
