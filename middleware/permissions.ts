import { TipoFuncao } from "@/lib/auth";



export function verificarPermissao(

    tipo_funcao:TipoFuncao,

    permissoesPermitidas:TipoFuncao[]

){


    if(

        !permissoesPermitidas.includes(tipo_funcao)

    ){

        throw new Error(
            "Você não tem permissão para realizar esta ação."
        );

    }



    return true;

}





export function obterEntidadeAdministrador(

    tipo_funcao:TipoFuncao

):number|null{


    switch(tipo_funcao){


        case "admin_inema":

            return 1;



        case "admin_bombeiros":

            return 2;



        case "admin_pna":

            return 3;



        default:

            return null;

    }


}






export function podeAcessarEntidade(

    tipo_funcao:TipoFuncao,

    id_entidade:number

){


    if(tipo_funcao === "super_admin"){

        return true;

    }



    const entidadeAdministrador =

        obterEntidadeAdministrador(tipo_funcao);



    if(entidadeAdministrador === null){

        throw new Error(
            "Usuário sem entidade responsável definida."
        );

    }



    if(entidadeAdministrador !== id_entidade){

        throw new Error(
            "Você não tem permissão para acessar esta entidade."
        );

    }



    return true;

}