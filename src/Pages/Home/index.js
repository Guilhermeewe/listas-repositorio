import api from '../../services/api'
import { FaGithub, FaPlus, FaBars, FaSpinner, FaTrash } from 'react-icons/fa'
import { Container, DeleteButton, Form, Repositorios, SubmitButton } from './styles'
import { useCallback, useLayoutEffect, useState } from 'react'


const Home = () => {
    const [input, setInput] = useState('') // inspecionar o estado do input 
    const [repos, setRepos] = useState([]) // vetores contendo os dados dos repositórios inseridos 
    const [loading, setLoading] = useState(false) // controlar animação de requisição

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        async function request() {
            setLoading(true)
            try {
                const response = await api.get(`repos/${input}`)

                const data = {
                    name: response.data.full_name
                }

                setRepos([...repos, data])
                setInput('')
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }

        }

        request()

        console.log(repos)
    }, [input, repos])

    const handleDelete = useCallback((repo) => {
        const find = repos.filter((r) => r.name !== repo)
        setRepos(find)
    }, [repos])
    // async function handleSubmit(e) {
    //     e.preventDefault()

    //     const response = await api.get(`repos/${input}`)

    //     const data = {
    //         name: response.data.full_name,
    //     }

    //     setRepos([...repos, data])
    //     setInput('')

    // }

    return (
        <Container>
            <h1>
                <FaGithub size={60} color='black' />
                Meus Repositórios
            </h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar Repositório"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color='black' size={20} />
                    ) : (
                        <FaPlus color='black' size={20} />
                    )}
                </SubmitButton>

            </Form>

            <Repositorios>
                {repos.map((e) => (
                    <li key={e.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(e.name)} >
                                <FaTrash size={20} />
                            </DeleteButton>
                            {e.name}
                        </span>
                        <a href="/Repositorio">
                            <FaBars size={30} />
                        </a>
                    </li>
                ))}
            </Repositorios>
        </Container>
    )
}

export default Home