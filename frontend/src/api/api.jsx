import axios from 'axios';

// Crie uma instância do Axios
const api = axios.create({
  baseURL: 'https://doacoes.onrender.com', // Substitua pelo caminho correto da sua API
});



export default api; // Exporte a instância para uso em outros arquivos
