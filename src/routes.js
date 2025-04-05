import { BrowserRouter, Route, Routes as RouteBD } from 'react-router-dom'
import Home from './Pages/Home'
import Repositorio from './Pages/Repositorio'

const Routes = () => {
    return (
        <BrowserRouter basename='listas-repositorio'>
            <RouteBD>
                <Route exact path='/' Component={Home}></Route>
                <Route exact path='/repositorio/:repositorio' Component={Repositorio}></Route>
            </RouteBD>
        </BrowserRouter>
    )
}
export default Routes