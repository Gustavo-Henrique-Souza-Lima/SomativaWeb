const express = require('express');
const axios = require('axios');
const Book = require('../models/Book');
const router = express.Router();

// *** CRIAÇÃO DO LIVRO COM URL DA IMAGEM (POST) ***
router.post('/', async (req, res) => {
    // Extraímos os dados da requisição
    const { title, author, year, imageUrl, description, pages, language, available, publisher } = req.body; 

    let image = null;

    // Se a URL da imagem for fornecida, vamos baixá-la
    if (imageUrl) {
        try {
            console.log("Baixando a imagem da URL:", imageUrl);  // Log para verificar a URL
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            console.log("Imagem baixada com sucesso. Tamanho da imagem:", response.data.length);  // Verificando o tamanho da imagem

            // Atribuindo a imagem baixada ao campo image
            image = Buffer.from(response.data, 'binary'); 
        } catch (error) {
            console.error("Erro ao baixar a imagem:", error.message);  // Log de erro
            return res.status(500).json({ message: 'Erro ao baixar a imagem', error: error.message });
        }
    }

    try {
        // Criamos o livro e salvamos com a imagem
        const newBook = new Book({ title, author, year, image, description, pages, language, available, publisher }); // Passando a imagem junto aos outros dados
        await newBook.save();
        console.log("Livro criado com sucesso:", newBook);  // Log de sucesso
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Erro ao criar livro:", error);  // Log de erro
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
});

module.exports = router;
