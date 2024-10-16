import { useState } from "react"; // Importando useState
import { ComponetHeader } from "./styles";
import { FaRegHeart, FaRegUserCircle, FaBars } from "react-icons/fa"; // Importando ícones
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("doacao"); // Remove o token do localStorage
    setTimeout(() => {
      navigate("/login"); // Redireciona para a página de login
    }, 100); // Atraso de 100 ms antes do redirecionamento
  };

  const handleLogin = () => {
    navigate("/login"); // Navega para a página de login
  };

  const handleMinhasDoacoes = () => {
    navigate("/minhasdoacoes"); // Navega para a página de Minhas Doações
  };

  const handleMinhasCampanhas = () => {
    navigate("/minhascampanhas"); // Navega para a página de Minhas Campanhas
  };

  // Função para verificar se o usuário está logado
  const isLoggedIn = () => {
    const token = localStorage.getItem("doacao");
    return token !== null;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };

  return (
    <ComponetHeader>
      <div>
        <FaRegHeart size="30px" />
        <h2>DoeAqui</h2>
      </div>
      <nav className={isMenuOpen ? "open" : ""}> {/* Classe para o menu aberto */}
        <p onClick={handleMinhasDoacoes}>Minhas Doações</p>
        <p onClick={handleMinhasCampanhas}>Minhas Campanhas</p>
        {isLoggedIn() ? (
          <h2 onClick={handleLogout}>
            <FaRegUserCircle /> Sair
          </h2>
        ) : (
          <h2 onClick={handleLogin}>
            <FaRegUserCircle /> Login
          </h2>
        )}
      </nav>
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars size="30px" />
      </div>
    </ComponetHeader>
  );
};
