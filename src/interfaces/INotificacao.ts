import { TipoNotificacao } from "@/enum/TipoNotificacao"
export interface INotificacao {
    titulo: string
    texto: string
    tipo: TipoNotificacao
    id:number
}