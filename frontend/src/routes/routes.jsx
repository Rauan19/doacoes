import { Route, Routes } from 'react-router-dom';
import { MainPages } from '../pages/mainpage/mainpage';
import { PageHome } from '../pages/home/home';
import Login from '../pages/login/login';
import Register from '../pages/registrar/registrar';
import MinhasCampanhas from '../pages/minhasCampanhas/MinhasCampanha';
import MinhasDoacoes from '../pages/MinhasDoacoes/minhasdoacoes';
import { CriarCampanha } from '../pages/criarCampanha/campanha';
import EditarCampanha from '../pages/minhasCampanhas/editarCampanha';
import RedefinirSenha from '../pages/redefninirSenha/redefinir';
import PaginaRedefinirSenha from '../pages/redirecionareredefinirsenha/redefinirSenha';
import { Private } from './private';

export const TodasRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPages />} >
               <Route  path='/' element={<PageHome/>}   />
               <Route path='/login' element={<Login/>} />
               <Route  path='/registro'  element={<Register/>} />
               <Route path='/minhascampanhas' element={<Private Component={MinhasCampanhas}/>} />
               <Route path='/minhasdoacoes' element={ <Private Component={MinhasDoacoes}/>} />
               <Route path='/criarcampanha' element={ <Private Component={CriarCampanha} />} />
               <Route path="/editar-campanha/:id" element={<Private Component={EditarCampanha}  />} />
               <Route path="/redefinir-senha" element={<RedefinirSenha />} />
               <Route path="/redefinir-senha/:token" element={<PaginaRedefinirSenha />} />



            </Route>
        </Routes>
    );
};
