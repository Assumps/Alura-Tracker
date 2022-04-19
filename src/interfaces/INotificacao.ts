import { TipoNotificacao } from "@/enum/TipoNotificacao"
export interface INotificacao {
    id:number
    titulo: string
    texto: string
    tipo: TipoNotificacao
    
}