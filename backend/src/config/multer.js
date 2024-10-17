import multer from 'multer';
import path from 'path';

// Configuração de onde os arquivos serão armazenados
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Salva os arquivos na pasta /src/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define o nome do arquivo
  }
});

// Inicializa o `multer` com a configuração acima
const upload = multer({ storage: storage });

export default upload;