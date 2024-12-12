// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware para verificar o token de autenticação
const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, 'sua_chave_secreta');
    req.user = decoded; // A informação do usuário será armazenada em req.user
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

// Middleware para verificar se o usuário tem o papel de administrador
const verifyAdmin = (req, res, next) => {
  // Verifica se o token foi validado antes
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
