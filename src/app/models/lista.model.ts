export interface Lista {
    id?: number, 
    nome?: string, 
    descricao?: string, 
    itens?: Item[]
}

export interface Item {
    id?: number,
    nomeItem?: String,
    quantidade?: number,
}