import axios from 'axios'
import { useState } from 'react'
import { FaGithub } from "react-icons/fa";

const UsuarioGithub = () => {

    const [userName, setUserName] = useState('')
    const [usuario, setUsuario] = useState({})
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)

    const buscarUsuario = async () =>{
        try{
            setCarregando(true)
            const resposta = await axios.get(`https://api.github.com/users/${userName}`)
            setUsuario(resposta.data)
        }catch (error){
            setErro(error.message)
        }finally{
            setCarregando(false)
        }
    }

    if(carregando){
        return <p>carregando...</p>
    }

    if(erro){
        return <p>erro...</p>
    }

  return (
    <div className='bg-[#001] w-full h-full flex flex-col justify-center items-center gap-10'>
        <FaGithub size={50} className='text-white'/>
        <h1 className='text-white text-2xl font-bold'>  Digite algum usuario do GitHub</h1> 

        <input 
        className='w-1/2 border-2 border-black rounded-md bg-[#fff] p-5'
        type="text"
        placeholder='digite o nome do usuario que deseja pesquisar...'
        onChange={(e)=> setUserName(e.target.value)}
        />

        <button onClick={buscarUsuario} className='bg-[#fff] w-170 h-15 rounded-md font-bold'>Procurar</button>

        <div className='pb-20 flex flex-col '>
            <ul className='text-white font-bold text-2xl flex flex-col items-center justify-center'>
                <li>username: {usuario.name}</li>     
                <li>id: {usuario.id}</li>   
                <li className='h-100 w-100'><img src={usuario.avatar_url} alt="" /></li>            
                <li><a href={usuario.html_url} >{usuario.html_url}</a></li>
            </ul>
        </div>
    </div>
  )
}

export default UsuarioGithub    