<template>
  <FormularioHome @aoSalvarTarefa="salvarTarefa" />

  <div class="lista">
    <BoxHome v-if="listaEstaVazia">
      Voce nao esta muito produtivo hoje
    </BoxHome>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaHome
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho> 
        <p class="modal-card-title">Editando uma Tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label"> Descricao </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">
          Salvar Alteracoes
        </button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormularioHome from "../components/FormularioHome.vue";
import TarefaHome from "../components/TarefaHome.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxHome from "../components/BoxHome.vue";
import Modal from "../components/Modal.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/actions";

export default defineComponent({
  name: "App",
  components: {
    FormularioHome,
    TarefaHome,
    BoxHome,
    Modal
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");

    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (t) => !filtro.value || t.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro,
    };
  },
});
</script>
