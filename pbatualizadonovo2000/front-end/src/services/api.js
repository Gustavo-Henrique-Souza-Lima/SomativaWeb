import axios from 'axios'; // Importa Axios para requisições HTTP

// cria instancia do axios com URL  base da API
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/books', // URL da API
    headers: {
        'Content-type': 'application/json', // Define JSON com tipo de conteudo
    },
});


// Exporta funcoes  CRUD usando Axios
export default {
    getBooks(){
        return apiClient.get('/'); // GET para listar os livros
    },
    addBook(book){
       return apiClient.post('/', book); // POST para adicionar os livros
    },
    updateBook(id, book){
        return apiClient.put(`/${id}`, book); // PUT para atualizar livro pelo id
    },
    deleteBook(id){
        return apiClient.delete(`/${id}`); // DELETE para excluir livro pelo ID
    },
};