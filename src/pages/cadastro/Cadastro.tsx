import axios from "axios"
import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"
import { ClipLoader } from "react-spinners"

function Cadastro() {

  // Redirecionar o usuário para uma outra rota
  const navigate = useNavigate()

  // Estado Responsável por controlar o loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Estado Responsável por guardar os dados do usuário que serão persistidos (gravados) no bd da minha API
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  })

  // HEstado responsável por guardar a senha digitada o campo confirmar senha
  const [confirmarSenha, setConfirmmarSenha] = useState<string>('')

  // Tratar efeito colateral do sucesso do cadastro 
  // redirecionar para a página de login
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  // Função responsável por au=tualizar o estado usuario
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // Função Responsável por atualizar o estado connfirmarSenha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmmarSenha(e.target.value)
  }

  // Função responsável por enviar uma requisição do tipo POST com os dados do usuário
  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {

    // Impede o envio automátioco do formulário
    e.preventDefault()

    // Validação da senha digitada
    if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
      alert("Senhas não confererem e/ou não possuem pelo menos 8 caracteres")
      setUsuario({ ...usuario, senha: '' })
      setConfirmmarSenha('')
      return
    }

    setIsLoading(true)

    try {
      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
      alert("usuário cadastrado com sucesso!")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Erro ao cadastrar usuário: ${error.response.status}`)
        console.log('Resposta da API: erro.message')
      } else {
        alert("Erro ao cadastrar o usuário! Verifique a conexão com a API!")
      }
    } finally {
      setIsLoading(false)
    }
  }

  //  Função para retornar para página inicial
  function retornar() {
    navigate('/')
  }

  console.log(JSON.stringify(usuario))
  console.log("Confirma Senha: ", confirmarSenha)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen
            place-items-center font-bold">
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                    w-full min-h-screen bg-cover bg-center"
        ></div>
        <form className="flex justify-center items-center flex-col w-2/3 gap-3"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type="reset"
              className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 cursor-pointer"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center cursor-pointer"
            >
              {
                isLoading ? (
                  <ClipLoader
                    color="#ffffff"
                    size={24}
                  />
                ) : (
                  <span>Cadastrar</span>
                )
              }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro