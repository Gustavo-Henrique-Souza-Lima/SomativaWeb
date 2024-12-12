const mongoose = require('mongoose');

// DEFINE O ESQUEMA DE USUÁRIO
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'O nome de usuário é obrigatório'],
    unique: true,
    trim: true, // Remove espaços no início/fim
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'O e-mail informado é inválido'], // Validação de e-mail
  },
  endereço: {
    type: String,
    trim: true,
  },
  idade: {
    type: Number,
    min: [0, 'A idade não pode ser negativa'], // Validação mínima
    max: [120, 'A idade máxima permitida é 120 anos'], // Validação máxima
  },
  telefone: {
    type: String,
    match: [/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O telefone deve estar no formato (XX) XXXXX-XXXX'], // Máscara de telefone
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [8, 'A senha deve ter pelo menos 8 caracteres'], // Tamanho mínimo
  },
  dataCriacao: {
    type: Date,
    default: Date.now, // Registra automaticamente a data de criação
  },
  ativo: {
    type: Boolean,
    default: true, // Indica se o usuário está ativo
  },
  genero: {
    type: String,
    enum: ['masculino', 'feminino', 'outro', 'prefiro_nao_dizer'], // Lista de opções válidas
    required: [true, 'O gênero é obrigatório'], // O campo de gênero é obrigatório
  },
  escolaridade: {
    type: String,
    enum: ['fundamental', 'medio', 'superior', 'pos_graduacao', 'mestre', 'doutorado'], // Opções de escolaridade
    required: [true, 'A escolaridade é obrigatória'],
  },
  preferenciaQuadrinhos: {
    type: String,
    enum: ['marvel', 'dc', 'nenhuma'], // Preferência entre Marvel ou DC
    required: [true, 'A preferência de quadrinhos é obrigatória'],
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // Papel do usuário

});

// EXPORTA O MODELO DE USUÁRIO
module.exports = mongoose.model('User', userSchema);
