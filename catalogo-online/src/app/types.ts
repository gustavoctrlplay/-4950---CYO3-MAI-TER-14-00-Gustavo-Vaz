// Aqui colocaremos as tipagens do nosso Site, para evitar bagunça :3

//Exemplo de tipagem:
type Pessoa = {
    nome : string, // Tudo que é palavra, usamos string. RG e CPF também podem ser usados com Strings,
    idade: number, 
    email: string,    
    jogo_favorito: Jogo
}


type Jogo = {
    nome: string,
    online: boolean,
}
// Exemplo de uso dessas tipagens
const lol: Jogo = {
    nome: "League of Legends",
    online: true
}

const danilo: Pessoa = {
    nome: "Danilo",
    idade: 14,
    email: "danilo@cp.com",
    jogo_favorito: lol
}
const valorant: Jogo = {
    nome: "123",
    online: true
}

const fillippo : Pessoa = {
    nome: "f",
    idade: 5,
    email: "f@cp.com",
    jogo_favorito: valorant

}

export type CardProps = {
    id: number, 
    titulo: string, 
    ano_lancamento: number, 
    plataforma: string,
    genero: string, 
    desenvolvedora: string, 
    descricao: string, 
    imagem: string
}

