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
import { computed, defineComponent } from "vue";
import TemporizadorHome from "./TemporizadorHome.vue";
import { useStore } from 'vuex'
import { key } from '@/store'
import { TipoNotificacao } from "@/enum/TipoNotificacao";
import { NOTIFICAR } from "@/store/mutations";

export default defineComponent({
  
  name: "FormularioHome",
  emits: ['aoSalvarTarefa'],
  components: { TemporizadorHome },
  data () {
      return{
          descricao: '',
          idProjeto: ''
      }
  },
  methods: {
      finalizarTarefa (tempoDecorrido: number): void {

      const projeto = this.projetos.find((p) => p.id == this.idProjeto);
      if (!projeto) {
        this.store.commit(NOTIFICAR, {
          titulo: 'Ops!',
          texto: "Selecione um projeto antes de finalizar a tarefa!",
          tipo: TipoNotificacao.FALHA,
        });
        return;
      }
          this.$emit('aoSalvarTarefa', {
              duracaoEmSegundos: tempoDecorrido,
              descricao: this.descricao,
              projeto: this.projetos.find(proj => proj.id == this.idProjeto)
          })
          this.descricao = ''
      }
  },
  setup () {
    const store = useStore(key)
    return {
      projetos: computed(() => store.state.projetos),
      store
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