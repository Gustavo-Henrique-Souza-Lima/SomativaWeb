// authRoutes.js

const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware'); // Corrigido para importar ambos os middlewares
const router = express.Router();

// Rota para registro de usuários
router.post('/register', async (req, res) => {
  try {
    // Desestruturação dos dados do corpo da requisição
    const { username, email, password, telefone, endereço, idade, genero, escolaridade, preferenciaQuadrinhos, role } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!username || !email || !password || !genero || !escolaridade || !preferenciaQuadrinhos || !role) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
    }

    // Verifica se o campo role tem um valor válido
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: 'O campo role deve ser "user" ou "admin".' });
    }

    // Verifica se o email já está em uso
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'E-mail já está em uso!' });
    }

    // Criptografa a senha do usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    // Cria um novo usuário com os dados fornecidos
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      telefone,
      endereço,
      idade,
      genero,
      escolaridade,
      preferenciaQuadrinhos,
      role,
    });

    // Salva o novo usuário no banco de dados
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });

  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    res.status(500).json({ error: 'Erro ao registrar usuário: ' + error.message });
  }
});

// Rota para login de usuários
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!email || !password) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
    }

    // Busca o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    // Compara a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    // Gera um token JWT para o usuário autenticado
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'sua_chave_secreta', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login realizado com sucesso!', token, user: { username: user.username, email: user.email, role: user.role } });

  } catch (error) {
    console.error('Erro ao realizar login:', error.message);
    res.status(500).json({ error: 'Erro ao realizar login: ' + error.message });
  }
});

// Rota para deletar usuários (requere admin)
router.delete('/user/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Busca e deleta o usuário pelo ID
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário: ' + error.message });
  }
});

// Rota para buscar o perfil do usuário (requere autenticação)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // O usuário está autenticado e o ID do usuário está disponível no req.user
    const user = await User.findById(req.user.id).select('-password'); // Não retorna a senha do usuário
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Erro ao carregar perfil:', error.message);
    res.status(500).json({ error: 'Erro ao carregar perfil: ' + error.message });
  }
});

// Rota para listar todos os usuários (requere admin)
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Busca todos os usuários no banco
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários: ' + error.message });
  }
});

module.exports = router;
