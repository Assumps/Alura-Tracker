<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <TemporizadorHome @aoTemporizadorFinalizado="finalizarTarefa"/>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TemporizadorHome from "./TemporizadorHome.vue";

export default defineComponent({
  
  name: "FormularioHome",
  emits: ['aoSalvarTarefa'],
  components: { TemporizadorHome },
  data () {
      return{
          descricao: ''
      }
  },
  methods: {
      finalizarTarefa (tempoDecorrido: number): void {
          this.$emit('aoSalvarTarefa', {
              duracaoEmSegundos: tempoDecorrido,
              descricao: this.descricao
          })
          this.descricao = ''
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