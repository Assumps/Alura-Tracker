import clienteHttp from "@/http";
import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETOS, REMOVER_PROJETOS } from "@/store/actions";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETO, NOTIFICAR } from "@/store/mutations";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            clienteHttp.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETO, resposta.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string) {
            return clienteHttp.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
            return clienteHttp.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS]({ commit }, id: string) {
            return clienteHttp.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    },
}