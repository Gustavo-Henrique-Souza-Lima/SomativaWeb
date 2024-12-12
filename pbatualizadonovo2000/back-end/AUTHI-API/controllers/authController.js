const  User = require('../models/user'); //IMPORTA O MODELO DE USUARIO

const bcrypt = require('bcryptjs'); // IMPORTA BCRYPT PARA HASH DE SENHAS

const jwt = require('jsonwebtoken'); // IMPORTA JSONWEBTOKEN  PARA CRIAR TOKENS JWT

// FUNÇÃO PARA REGISTRAR NOVOS USUARIOS
exports.register = async (req, res) => {
const { username, password} = req.body; // PEGA DADOS DO CORPO DA REQUISIÇÃO


try {
// CRIPTOGRAFA A SENHA ANTES DE SALVAR NO BANCO
const hashedPassword = await bcrypt.hash(password, 10); // O NUMERO 10 REPRESENTA O "SALT ROUNDS"

// CRIA UM NOVO USUARIO COM NOME DE USUARIO E SENHA CRIPTOGRAFADA
const newUser = new User ({ username, password: hashedPassword}); // RESPONDE COM SUCESSO AO
await newUser.save(); // SALVA USUARIO NO BANCO DE DADOS

res.status(201).json({ message: 'Usuário registrado com sucesso' }); // RESPONDE COM SUCESSO AO

}catch (error) {
res.status(500).json({ error: 'Erro ao registrar usuario' }); // RESPONDE COM ERRO AO REGISTRAR
}
};

// FUNCAO PARA FAZER LOGIN DE USUARIOS

exports.login = async (req, res) => {
    const { username, password } = req.body; // PEGA DADOS DO CORPO DA REQUISIÇÃO

    try {
        // BUSCA O USUARIO PELO NOME DE USUARIO
        const user = await User.findOne ({ username });
        if (!user) return res.status(400).json({ error: 'Usuario não encontrado'}); // RETORNA O ERRO 

        // COMPARA A SENHA FORNECIDA COM A SENHA ARMAZENADA NO BANCO
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' }); // RETORN O ERRO SE A SENHA ESTIVER ERRADA


        // CRIA TOKEN JWT PARA AUTENTICAÇÃO
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'}); // TOKEN

        res.json({ token }); // RESPONDE COM O TOKEN JWT
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' }) // RESPONDE COM ERRO AO FAZER LOGIN
    }
};