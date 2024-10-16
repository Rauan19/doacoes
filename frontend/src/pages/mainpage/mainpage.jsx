import { ContainerMainPages} from "./styles"
import { Header } from "../../components/header/header"
import { Outlet } from "react-router-dom"
export const MainPages = () => {
    return (
       <ContainerMainPages>
         <Header/>
         <Outlet/>

       </ContainerMainPages>
    )
}