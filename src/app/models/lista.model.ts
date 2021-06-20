export interface Lista {
    id?: Number, 
    nome?: string, 
    descricao?: string, 
    itens?: Item[]
}

export interface Item {
    id?: Number,
    nomeItem?: String,
    quantidade?: String,
}