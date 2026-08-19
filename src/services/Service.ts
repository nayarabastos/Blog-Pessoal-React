import axios from "axios";
 
const api = axios.create({
    baseURL: 'https://blogpessoal-9fux.onrender.com'
})
 
// Função  cadastrar Usuario
 
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) =>{
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}
 
// Função  autenticar Usuario
 
export const login = async (url: string, dados: Object, setDados: Function) =>{
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

