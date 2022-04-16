<template>
  <FormularioHome @aoSalvarTarefa="salvarTarefa" />

  <div class="lista">
    <BoxHome v-if="listaEstaVazia">
      Voce nao esta muito produtivo hoje
    </BoxHome>
    <TarefaHome
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormularioHome from "../components/FormularioHome.vue";
import TarefaHome from "../components/TarefaHome.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxHome from "../components/BoxHome.vue";

export default defineComponent({
  name: "App",
  components: {
    FormularioHome,
    TarefaHome,
    BoxHome,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
});
</script>
