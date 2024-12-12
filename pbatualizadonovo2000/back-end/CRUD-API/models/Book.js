const mongoose = require('mongoose');

// Define o esquema do livro no Mongoose
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Campo título, obrigatório
  author: { type: String, required: true }, // Campo autor, obrigatório
  year: { type: Number }, // Campo ano, opcional
  image: { type: String }, // URL da imagem, opcional
  description: { type: String }, // Descrição do livro, opcional
  pages: { type: Number }, // Número de páginas, opcional
  language: { type: String }, // Linguagem do livro, opcional
  available: { type: Boolean, default: true }, // Disponibilidade do livro, padrão é true
  publisher: { type: String }, // Editora do livro, opcional
  reservations: { type: Number, default: 0 }, // Contagem de reservas do livro, padrão é 0
});

// Exporta o modelo do livro baseado no esquema definido
module.exports = mongoose.model('Book', BookSchema);
