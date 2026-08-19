import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import axios from "axios";
import { login } from "../services/Service";

// Definir os Estado e Funções Disponibilizadas pela Context
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogin(usuario: UsuarioLogin): void
    handleLogout(): void
    isLoading: boolean
}

// Quem irá consumia a context
interface AuthProviderProps {
    children: ReactNode
}

// criar o contexto usando a tipagem AuthContextProps
//  O contexto iré disponibilizar os estados e as funções globalmente
export const AuthContext = createContext({} as AuthContextProps)

// Inicializar o provedor Authprovider 
// O provedor irá impolementar as funções e inicializar os estados
export function AuthProvider({ children }: AuthProviderProps) {

    // inicializar o estado usuario, que é do tipo UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    })

    // innicializador 
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true)

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            alert("Usuário Autenticado com Sucesso!")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(`Erro ao autenticar usuário: ${error.response.status}`)
                console.log('Resposta da API: erro.message')
            } else {
                alert("Erro ao autenticar o usuário! Verifique a conexão com a API!")
            }
        } finally {
            setIsLoading(false)
        }
    }
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}