import { Container, Owner, Loading, BackButton, IssueList, PageActions } from "./styles"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

const Repositorio = () => {
    const { repositorio } = useParams()
    const [repositorioData, setRepositorioData] = useState({})
    const [issuesData, setIssuesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    const handlePage = (a) => {
        setPage(a == 'back' ? page - 1 : page + 1)
    }

    useEffect(() => {
        async function issueList() {
            const response = await api.get(`/repos/${repositorio}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                    page: page
                }
            })
            setIssuesData(response.data)
        }
        issueList()
    }, [page])

    useEffect(() => {
        async function load() {

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${repositorio}`),
                api.get(`/repos/${repositorio}/issues`, {
                    params: {
                        state: 'open',
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
        <Container>
            <BackButton to={'/'}>
                <FaArrowLeft size={35} color="black" />
            </BackButton>
            <Owner>
                <img src={repositorioData.owner?.avatar_url} alt="avatar" />
                <h1>{repositorioData.name}</h1>
                <p>{repositorioData.description}</p>
                <p>{repositorioData.language}</p>
            </Owner>

            <IssueList>
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

            <PageActions>
                <button className="back" isDisabled={page} type="button" onClick={() => { handlePage("back") }}>Voltar {page}</button>
                <button type="button" onClick={() => { handlePage("next") }}>Próxima {page}</button>
            </PageActions>
        </Container>
    )
}
export default Repositorio