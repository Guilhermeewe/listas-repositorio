import api from '../../services/api'
import gsap from 'gsap'
import { FaPlus, FaBars, FaSpinner, FaTrash, FaGithubAlt } from 'react-icons/fa'
import { Container, DeleteButton, Form, Repositorios, SubmitButton, Main } from './styles'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { IoLogoGithub } from 'react-icons/io5'

const Home = () => {
    const [input, setInput] = useState('') // inspecionar o estado e valor do input 
    const [repos, setRepos] = useState([]) // vetores contendo os dados dos repositórios inseridos 
    const [loading, setLoading] = useState(false) // controlar animação de requisição
    const [alert, setAlert] = useState(null) // controlar alertas de erro na aplicação

    const container = useRef()
    const repositorioGSAP = useRef()


    useGSAP(() => {
        gsap.fromTo(container.current, {
            opacity: 0,
            scale: 0,
            rotate: -30

        }, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            rotate: 0
        })
    },)

    //DidaMount
    useEffect(() => {
        const repos = localStorage.getItem('repos')

        repos && setRepos(JSON.parse(repos))

    }, [])

    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repos))
    }, [repos])

    //DidUpdate 

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        async function request() {
            setLoading(true)
            try {

                if (input === '') {
                    throw new Error('Digite um repositório')
                }

                const response = await api.get(`repos/${input}`)

                const hasRepo = repos.find((r) => r.name === input) // verificar se o repositório já foi adicionado

                if (hasRepo) {
                    throw new Error('Repositório já adicionado')
                }

                const data = {
                    name: response.data.full_name
                }

                setRepos([...repos, data])
                setInput('')
            }
            catch (error) {
                setAlert(true)
                console.log(error)
            }
            finally {
                setLoading(false)
            }

        }

        request()

        console.log(repos)
    }, [input, repos])

    function handleOnChange(e) {
        setInput(e.target.value)
        setAlert(null)
    }

    const handleDelete = useCallback((repo) => {
        const find = repos.filter((r) => r.name !== repo)
        setRepos(find)
    }, [repos])

    useGSAP(() => {
        gsap.fromTo(repositorioGSAP.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3
        }, {
            opacity: 1,
            scale: 1
        })
    }, { dependencies: [repos] })

    return (
        <Main >
            <FaGithubAlt color='white' size={500} className='logo' />
            <Container ref={container} className='main-container'>
                <h1>
                    <IoLogoGithub size={60} color='black' />
                    My Repositories
                </h1>
                <Form onSubmit={handleSubmit} onError={alert}>
                    <input
                        type="text"
                        placeholder="Add a repository"
                        value={input}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <SubmitButton loading={loading ? 1 : 0}>
                        {loading ? (
                            <FaSpinner color='black' size={20} />
                        ) : (
                            <FaPlus color='black' size={20} />
                        )}
                    </SubmitButton>

                </Form>

                <Repositorios ref={repositorioGSAP} >
                    {repos.map((repo) => (
                        <li key={repo.name}>
                            <span>
                                <DeleteButton onClick={() => handleDelete(repo.name)} >
                                    <FaTrash size={20} />
                                </DeleteButton>
                                {repo.name}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={30} color='black' />
                            </Link>
                        </li>
                    ))}
                </Repositorios>
            </Container>
        </Main>
    )
}

export default Home