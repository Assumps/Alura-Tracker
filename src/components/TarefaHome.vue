<template>
    <BoxHome>
    <div class="box has-text-weight-bold">
    <div class="column is-4">
        {{tarefa.descricao || 'Tarefa sem Descricao'}}
    </div>
    <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
    </div>
    <div class="column">
        <CronometroHome :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
    </div>
    </div>
    </BoxHome>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/ITarefa'
import { defineComponent, PropType } from 'vue'
import CronometroHome from './CronometroHome.vue'
import BoxHome from '@/components/BoxHome.vue'

export default defineComponent({

    name: 'TarefaHome',
    components: {
        CronometroHome,
        BoxHome
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }

})
</script>


