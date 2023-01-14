import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest, res: NextResponse) {
    // req.headers.set("Access-Control-Allow-Origin", "*");
    const token = req.cookies.get("supabase-auth-token");
    console.log("session token :"+ JSON.stringify(token));
    if (!token) {
        return NextResponse.redirect(new URL("/authentication", req.url));
    }
}

export const config = {
    matcher: ['/', '/Dashboard', '/Categories', '/Menu', '/Profile', '/RegisterRestaurant'],
};
