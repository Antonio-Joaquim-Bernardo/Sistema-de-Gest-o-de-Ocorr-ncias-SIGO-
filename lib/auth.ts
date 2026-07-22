import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";


const segredo = process.env.JWT_SECRET;


if(!segredo){

    throw new Error(
        "JWT_SECRET não configurado no ambiente."
    );

}


const JWT_SECRET:string = segredo;



export type TipoFuncao =

    | "super_admin"
    | "admin_inema"
    | "admin_bombeiros"
    | "admin_pna"
    | "cidadao";





export interface UsuarioToken extends JwtPayload {

    id_usuario:number;

    tipo_funcao:TipoFuncao;

}





export function criarToken(

    dados:UsuarioToken

){


    return jwt.sign(

        {
            id_usuario:dados.id_usuario,
            tipo_funcao:dados.tipo_funcao
        },

        JWT_SECRET,

        {
            expiresIn:"7d"
        }

    );

}





export function verificarToken(

    token:string

):UsuarioToken {


    const dados = jwt.verify(

        token,

        JWT_SECRET

    );



    if(

        typeof dados === "string" ||

        !dados.id_usuario ||

        !dados.tipo_funcao

    ){

        throw new Error(
            "Token inválido."
        );

    }



    return dados as UsuarioToken;


}