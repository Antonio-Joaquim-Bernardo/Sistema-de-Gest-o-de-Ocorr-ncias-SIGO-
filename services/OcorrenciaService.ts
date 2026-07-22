import OcorrenciaModel from "../models/OcorrenciaModel";
import UsuarioModel from "../models/UsuarioModel";
import HistoricoService from "./HistoricoService";
import { UsuarioToken } from "@/lib/auth";
import { obterEntidadeAdministrador } from "@/middleware/permissions";


export default class OcorrenciaService {


    static async criarOcorrencia(
        dados:any
    ){

        const usuario = await UsuarioModel.buscarPorId(
            dados.id_usuario
        );


        if(!usuario){

            throw new Error(
                "Usuário não encontrado."
            );

        }


        if(!dados.id_categoria){

            throw new Error(
                "Categoria da ocorrência é obrigatória."
            );

        }


        if(!dados.titulo){

            throw new Error(
                "O título da ocorrência é obrigatório."
            );

        }


        if(!dados.descricao){

            throw new Error(
                "A descrição da ocorrência é obrigatória."
            );

        }


        const ocorrencia =
            await OcorrenciaModel.criar(
                dados
            );


        await HistoricoService.registrar({

            id_usuario:dados.id_usuario,

            id_ocorrencia:ocorrencia.id_ocorrencia,

            acao:"Ocorrência criada."

        });


        return ocorrencia;

    }





    static async listarOcorrencias(
        usuario:UsuarioToken
    ){


        switch(usuario.tipo_funcao){


            case "super_admin":

                return await OcorrenciaModel.listar();



            case "cidadao":

                return await OcorrenciaModel.listarPorUsuario(
                    usuario.id_usuario
                );



            default:


                const entidade = 
                    obterEntidadeAdministrador(
                        usuario.tipo_funcao
                    );


                if(entidade === null){

                    throw new Error(
                        "Usuário sem entidade responsável."
                    );

                }


                return await OcorrenciaModel.listarPorEntidade(
                    entidade
                );


        }


    }







    static async buscarOcorrencia(
        id:number,
        usuario:UsuarioToken
    ){


        const ocorrencia =
            await OcorrenciaModel.buscarPorId(
                id
            );


        if(!ocorrencia){

            throw new Error(
                "Ocorrência não encontrada."
            );

        }



        if(usuario.tipo_funcao === "super_admin"){

            return ocorrencia;

        }





        if(usuario.tipo_funcao === "cidadao"){


            if(
                ocorrencia.id_usuario !== usuario.id_usuario
            ){

                throw new Error(
                    "Você não tem permissão para consultar esta ocorrência."
                );

            }


            return ocorrencia;

        }





        const entidade =

            obterEntidadeAdministrador(
                usuario.tipo_funcao
            );



        if(entidade !== null){


            const lista =

                await OcorrenciaModel.listarPorEntidade(
                    entidade
                );



            const permitido =

                lista.some(
                    (item:any)=>
                    item.id_ocorrencia === id
                );



            if(!permitido){

                throw new Error(
                    "Esta ocorrência não pertence à sua entidade."
                );

            }


        }



        return ocorrencia;


    }








    static async atualizarEstado(
        id:number,
        estado:string,
        usuario:UsuarioToken
    ){


        const estadosPermitidos = [

            "aberto",

            "em_atendimento",

            "equipa_enviada",

            "resolvida",

            "cancelada"

        ];



        if(
            !estadosPermitidos.includes(
                estado
            )
        ){

            throw new Error(
                "Estado inválido."
            );

        }




        const anterior =

            await this.buscarOcorrencia(
                id,
                usuario
            );




        const atualizada =

            await OcorrenciaModel.atualizarEstado(
                id,
                estado
            );




        await HistoricoService.registrar({

            id_usuario:usuario.id_usuario,

            id_ocorrencia:id,

            acao:
            `Estado alterado de ${anterior.estado} para ${estado}.`

        });



        return atualizada;


    }









    static async atualizarOcorrencia(
        id:number,
        dados:any,
        usuario:UsuarioToken
    ){


        await this.buscarOcorrencia(
            id,
            usuario
        );



        const atualizada =

            await OcorrenciaModel.atualizarDados(
                id,
                dados
            );



        await HistoricoService.registrar({

            id_usuario:usuario.id_usuario,

            id_ocorrencia:id,

            acao:
            "Dados da ocorrência atualizados."

        });



        return atualizada;


    }









    static async eliminarOcorrencia(
        id:number,
        usuario:UsuarioToken
    ){



        if(
            usuario.tipo_funcao === "cidadao"
        ){

            throw new Error(
                "Cidadãos não podem eliminar ocorrências."
            );

        }




        await this.buscarOcorrencia(
            id,
            usuario
        );



        await HistoricoService.registrar({

            id_usuario:usuario.id_usuario,

            id_ocorrencia:id,

            acao:
            "Ocorrência eliminada."

        });



        return await OcorrenciaModel.eliminar(
            id
        );


    }


}