import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro.vue';
import Crud from '../views/crud.vue';
import AddBook from '@/components/AddBook.vue'; 
import BookList from '../components/BookList.vue';
import Deletar from '@/components/Deletar.vue';
import EditBook from '@/components/EditBook.vue';
import BooksCatalog  from '@/components/BooksCatalog.vue'; 
import BookItem from '../components/BookItem.vue';  
import PagIncial from '@/views/PagInicial.vue';
import Perfil from '@/views/Perfil.vue';
import Politica from '@/components/Politica.vue';
import GraphChart from '@/components/GraphChart.vue';
import Grafico from '@/views/Grafico.vue';
import Usuarios from '@/views/Usuarios.vue';
import ReservedBooks from '@/views/ReservedBooks.vue';



const routes = [
  { path: '/', name: 'BookList', component: BookList },
  
  // Rota para adicionar um livro
  { path: '/add-book', name: 'AddBook', component: AddBook },
  
  // Rota para editar um livro, passando o id como parâmetro



  // Outras rotas
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
  },
  {
    path: '/crud',
    name: 'Crud',
    component: Crud,
  },

  // Redirecionamento para login
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/deletar',
    name: 'Deletar',
    component: Deletar
  },
  {
    path: '/edit/:id',
    name: 'EditBook',
    component: EditBook
  },
  {
    path: '/bookscatalog',
    name: 'BooksCatalog',
    component: BooksCatalog
  },

  {
    path: '/books/:id', // Rota para os detalhes do livro
    name: 'BookItem', // Alterado para BookItem
    component: BookItem, // Alterado para BookItem
    props: true, // Permite passar o ID como prop para o componente
  },
  {
    path: '/paginicial',
    name: 'PagInicial',
    component: PagIncial,
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
  },

  {
    path: '/politica',
    name: 'Politica',
    component: Politica,
  },
  {
    path: '/graphchart',
    name: 'GraphChart',
    component: GraphChart,
  },

  {
    path: '/grafico',
    name: 'Grafico',
    component: Grafico,
  },

  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios,
  },

  {
    path: '/reservedbooks',
    name: 'ReservedBooks',
    component: ReservedBooks
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
