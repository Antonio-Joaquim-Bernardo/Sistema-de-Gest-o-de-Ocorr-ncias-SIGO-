import { NextRequest } from "next/server";
import { autenticar } from "./middleware/auth";


export function middleware(
    request: NextRequest
) {

    return autenticar(request);

}



export const config = {

    matcher: [
        "/dashboard/:path*"
    ]

};