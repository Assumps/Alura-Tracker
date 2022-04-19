<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulario para criacao de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa voce deseja Iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <TemporizadorHome @aoTemporizadorFinalizado="finalizarTarefa"/>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TemporizadorHome from "./TemporizadorHome.vue";
import { useStore } from 'vuex'
import { key } from '@/store'
import { TipoNotificacao } from "@/enum/TipoNotificacao";
import { NOTIFICAR } from "@/store/mutations";

export default defineComponent({
  
  name: "FormularioHome",
  emits: ['aoSalvarTarefa'],
  components: { TemporizadorHome },
  setup (props, contexto) {
    const store = useStore(key)

    const descricao = ref("")
    const idProjeto = ref("")

    const projetos = computed(() => store.state.projeto.projetos)


    const finalizarTarefa =  (tempoDecorrido: number): void => {

      const projeto = projetos.value.find((p) => p.id == idProjeto.value);
      if (!projeto) {
        store.commit(NOTIFICAR, {
          titulo: 'Ops!',
          texto: "Selecione um projeto antes de finalizar a tarefa!",
          tipo: TipoNotificacao.FALHA,
        });
        return;
      }
          contexto.emit('aoSalvarTarefa', {
              duracaoEmSegundos: tempoDecorrido,
              descricao: descricao.value,
              projeto: projetos.value.find(proj => proj.id == idProjeto.value)
          })
          descricao.value = ''
      }


    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa
      
    }
  }
  
});
</script>


<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>