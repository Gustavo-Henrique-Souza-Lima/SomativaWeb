const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis de ambiente

const authRoutes = require('./routes/authRoutes'); // Caminho para as rotas de autenticação
const { verifyAdmin } = require('./middlewares/authMiddleware'); // Middleware para verificar administrador

const app = express();

// Configurações de CORS
app.use(cors({
    origin: 'http://localhost:8080', // Altere para a URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware para processar requisições JSON
app.use(express.json());

// Rota protegida de exemplo para administradores
app.get('/api/admin-only', verifyAdmin, (req, res) => {
    res.status(200).json({ message: 'Bem-vindo, administrador!' });
});

// Usando as rotas de autenticação
app.use('/api/auth', authRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
