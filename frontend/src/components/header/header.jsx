import { useState, useEffect } from "react"; // Importando useState e useEffect
import { ComponetHeader } from "./styles";
import { FaRegHeart, FaRegUserCircle, FaBars } from "react-icons/fa"; // Importando o ícone de menu
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controle de 

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("doacao")); // Verifica o token no localStorage
    setIsLoggedIn(!!token); // Atualiza o estado de login
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };

  const handleLogout = () => {
    localStorage.removeItem("doacao"); // Remove o token do localStorage
    setIsLoggedIn(false); // Atualiza o estado de login
    navigate("/login"); // Redireciona para a página de login
    window.location.reload(); // Recarrega a página
  };

  const handleLogin = () => {
    navigate("/login"); // Navega para a página de login
    window.location.reload(); // Recarrega a página ao navegar para login
  };

  const handleMinhasDoacoes = () => {
    navigate("/minhasdoacoes"); // Navega para a página de Minhas Doações
  };

  const handleMinhasCampanhas = () => {
    navigate("/minhascampanhas"); // Navega para a página de Minhas Campanhas
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
        {isLoggedIn ? (
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
