import { NextRequest } from "next/server";
import { verificarToken, UsuarioToken } from "@/lib/auth";



export function autenticar(

    request:NextRequest

):UsuarioToken {


    const token =

        request.cookies.get("token")?.value;



    if(!token){

        throw new Error(
            "Acesso negado. Faça login."
        );

    }



    try{


        return verificarToken(token);



    }catch{


        throw new Error(
            "Token inválido ou expirado."
        );


    }


}