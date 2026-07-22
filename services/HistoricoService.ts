import HistoricoModel from "../models/HistoricoModel";
import OcorrenciaModel from "../models/OcorrenciaModel";
import UsuarioModel from "../models/UsuarioModel";


export default class HistoricoService {



    static async registrar(

        dados:any

    ){



        const usuario =

            await UsuarioModel.buscarPorId(

                dados.id_usuario

            );



        if(!usuario){

            throw new Error(

                "Usuário não encontrado."

            );

        }






        const ocorrencia =

            await OcorrenciaModel.buscarPorId(

                dados.id_ocorrencia

            );



        if(!ocorrencia){

            throw new Error(

                "Ocorrência não encontrada."

            );

        }






        if(!dados.acao){

            throw new Error(

                "A ação é obrigatória."

            );

        }






        return await HistoricoModel.criar(

            dados

        );


    }









    static async listarTodos(){


        return await HistoricoModel.listarTodos();


    }









    static async listarPorOcorrencia(

        id_ocorrencia:number

    ){



        const ocorrencia =

            await OcorrenciaModel.buscarPorId(

                id_ocorrencia

            );



        if(!ocorrencia){

            throw new Error(

                "Ocorrência não encontrada."

            );

        }






        return await HistoricoModel.listarPorOcorrencia(

            id_ocorrencia

        );


    }









    static async listarPorUsuario(

        id_usuario:number

    ){



        const usuario =

            await UsuarioModel.buscarPorId(

                id_usuario

            );



        if(!usuario){

            throw new Error(

                "Usuário não encontrado."

            );

        }






        return await HistoricoModel.listarPorUsuario(

            id_usuario

        );


    }









    static async buscarPorId(

        id_historico:number

    ){



        const historico =

            await HistoricoModel.buscarPorId(

                id_historico

            );



        if(!historico){

            throw new Error(

                "Registro de histórico não encontrado."

            );

        }






        return historico;


    }



}