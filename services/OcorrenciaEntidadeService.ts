import OcorrenciaEntidadeModel from "../models/OcorrenciaEntidadeModel";
import OcorrenciaModel from "../models/OcorrenciaModel";
import HistoricoService from "./HistoricoService";
import EntidadeResponsavelModel from "../models/EntidadeResponsavelModel";


export default class OcorrenciaEntidadeService {



static async adicionarEntidades(

    id_ocorrencia:number,

    entidades:number[],

    id_usuario:number

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



    if(
        !entidades ||
        entidades.length === 0
    ){

        throw new Error(
            "Nenhuma entidade selecionada."
        );

    }



    const resultado =

        await OcorrenciaEntidadeModel.adicionarEntidades(

            id_ocorrencia,

            entidades

        );




    for(const id_entidade of entidades){


        const entidade =

            await EntidadeResponsavelModel.buscarPorId(

                id_entidade

            );



        if(entidade){


            await HistoricoService.registrar({


                id_usuario,


                id_ocorrencia,


                acao:

                `Entidade ${entidade.nome} atribuída à ocorrência.`


            });


        }


    }




    return resultado;


}


    static async listarEntidades(

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



        return await OcorrenciaEntidadeModel.listarPorOcorrencia(

            id_ocorrencia

        );


    }









    static async removerEntidade(

        id_ocorrencia:number,

        id_entidade:number,

        usuario:any

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





        const tipo_funcao =

            usuario.tipo_funcao;





        if(tipo_funcao !== "super_admin"){



            const entidadePermitida = {



                admin_inema:1,


                admin_bombeiros:2,


                admin_pna:3



            } as any;





            if(

                entidadePermitida[tipo_funcao]

                !==

                id_entidade

            ){



                throw new Error(

                    "Você não pode remover esta entidade."

                );


            }



        }





        return await OcorrenciaEntidadeModel.removerEntidade(

            id_ocorrencia,

            id_entidade

        );


    }



}