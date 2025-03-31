import { Container, Owner, Loading, BackButton, IssueList, PageActions, Filters } from "./styles"
import { useEffect, useRef, useState } from "react"
import api from "../../services/api"
import { useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const Repositorio = () => {
    const { repositorio } = useParams()
    const [repositorioData, setRepositorioData] = useState({})
    const [issuesData, setIssuesData] = useState([])
    const [loading, setLoading] = useState(true) // teste
    const [page, setPage] = useState(1) // páginação
    const [state, setState] = useState('all') // Estados de filtro

    const container = useRef()

    useGSAP(() => {
        gsap.fromTo(container.current, {
            opacity: 0,
            scale: 0,
            rotate: 30,
        }, {
            duration: 0.5,
            opacity: 1,
            scale: 1,
            rotate: 0,
        })
    }, { scope: container, dependencies: [loading] })


    function handlePage(action) {
        action === 'next' ? setPage(page + 1) : setPage(page - 1)
    }

    function handleFilter(action) {
        action === 'open' && setState('open')
        action === 'closed' && setState('closed')
        action === 'all' && setState('all')
    }

    function handleLoading() {
        setLoading(true)

    }


    useEffect(() => {
        async function issueList() {
            const response = await api.get(`/repos/${repositorio}/issues`, {
                params: {
                    state,
                    per_page: 5,
                    page
                }
            })
            setIssuesData(response.data)
        }
        issueList()
    }, [page, state])

    useEffect(() => {
        async function load() {

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${repositorio}`),
                api.get(`/repos/${repositorio}/issues`, {
                    params: {
                        state,
                        per_page: 5,
                        page
                    }
                })
            ])
            setRepositorioData(repositorioData.data)
            setIssuesData(issuesData.data)
            setLoading(false)
        }
        load()
    }, [])


    return (
        <Container ref={container} load={loading}>
            <BackButton to={'/'} onClick={() => { handleLoading() }}>
                <FaArrowLeft size={35} color="black" />
            </BackButton>
            <Owner>
                <img src={repositorioData.owner?.avatar_url} alt="avatar" />
                <h1>{repositorioData.name}</h1>
                <p>{repositorioData.description}</p>
                <p>{repositorioData.language}</p>
            </Owner>

            <IssueList>
                <Filters>
                    <button type="button" onClick={() => { handleFilter('closed') }}>Closed</button>
                    <button type="button" onClick={() => { handleFilter('open') }}>Open</button>
                    <button type="button" onClick={() => { handleFilter('all') }}>All</button>
                </Filters>
                {issuesData.map((issues) => {
                    return (
                        <li key={String(issues.id)}>
                            <img src={issues.user.avatar_url} alt="avatarurl" />
                            <div>
                                <strong>
                                    <a href={issues.html_url}>{issues.title}</a>
                                    {
                                        issues.labels.map((label) => {
                                            return (
                                                <span key={String(label.id)}>{label.name}</span>
                                            )
                                        })
                                    }
                                </strong>
                                <p>{issues.user.login}</p>
                            </div>
                        </li>

                    )
                })}
            </IssueList>

            <PageActions isDisabled={page < 2}>
                <button className="back" type="button" onClick={() => handlePage('back')}>Voltar</button>
                <span>{page}</span>
                <button type="button" onClick={() => handlePage('next')}>Próximo</button>
            </PageActions>
        </Container>
    )
}
export default Repositorio