import { NextRequest } from "next/server";
import { autenticar } from "./auth";
import { verificarPermissao } from "./permissions";



export function apenasAdministradores(
    request: NextRequest
){


    const usuario =
        autenticar(request);



    verificarPermissao(

        (usuario as any).tipo_funcao,

        [
            "super_admin",
            "admin_pna",
            "admin_inema",
            "admin_bombeiros"
        ]

    );



    return usuario;


}