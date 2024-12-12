const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book'); // O modelo Book do mongoose
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

mongoose.connect('mongodb+srv://gustavolimsouza08:lzozAUMmRjp1oKU9@library.tij8y.mongodb.net/library', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// ** Atualização (PUT) - Editar Livro **
app.put('/api/books/:id', async (req, res) => {
  console.log('ID do livro recebido no PUT:', req.params.id);
  console.log('Dados recebidos no PUT:', req.body);

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // 'new': retorna o livro atualizado; 'runValidators': valida os dados enviados
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Erro no PUT:', error);
    res.status(500).json({ message: 'Erro ao atualizar livro', error: error.message });
  }
});

// ** Buscar todos os livros **
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error('Erro ao buscar os livros:', err.message);
    res.status(500).json({ message: 'Erro ao buscar os livros', error: err.message });
  }
});

// ** Adicionar Livro **
app.post('/books', async (req, res) => {
  const { title, author, year, image, description, pages, language, available, publisher  } = req.body;
  const newBook = new Book({ title, author, year, image, description, pages, language, available, publisher  });

  try {
    await newBook.save();
    res.status(201).send('Livro adicionado com sucesso');
  } catch (err) {
    console.error('Erro ao adicionar livro:', err.message);
    res.status(500).json({ message: 'Erro ao adicionar livro', error: err.message });
  }
});

// ** Deletar Livro **
app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).send('Livro não encontrado');
    }
    res.status(200).send('Livro deletado com sucesso');
  } catch (err) {
    console.error('Erro ao deletar livro:', err.message);
    res.status(500).send('Erro ao deletar livro');
  }
});


// Rota para buscar um livro por ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);  // Mongoose: busca livro pelo ID
    if (!book) {
      return res.status(404).send({ message: 'Livro não encontrado' });
    }
    res.json(book);  // Retorna o livro encontrado
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar livro', error });
  }
});


// Rota para buscar reservas com detalhes do livro
app.get('/reservations', async (req, res) => {
  try {
    const booksWithReservations = await Book.find({ reservations: { $gt: 0 } });
    res.status(200).json(booksWithReservations);
  } catch (error) {
    console.error('Erro ao buscar reservas:', error.message);
    res.status(500).json({ message: 'Erro ao buscar reservas', error: error.message });
  }
});





// Incrementar reservas de um livro
app.post('/reserve/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    // Encontre o livro pelo ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Converte o campo reservations para número, se necessário
    if (typeof book.reservations !== 'number') {
      book.reservations = parseInt(book.reservations, 10) || 0; // Converte para número ou inicializa como 0
    }

    // Incrementa a quantidade de reservas
    book.reservations += 1;

    // Salva o livro com a nova contagem de reservas
    await book.save();

    // Retorna os dados de reserva (incluindo a nova quantidade de reservas)
    res.status(200).json({
      title: book.title,
      totalReservations: book.reservations, // Aqui retorna o número atualizado de reservas
    });
  } catch (error) {
    console.error('Erro ao reservar livro:', error);
    res.status(500).json({ message: 'Erro ao reservar livro', error });
  }
});


// ** Devolver Livro (POST) **
app.post('/return/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    // Encontre o livro pelo ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Verifica se há reservas para decrementar
    if (book.reservations && book.reservations > 0) {
      book.reservations -= 1; // Decrementa as reservas
    } else {
      return res.status(400).json({ message: 'Nenhuma reserva para este livro' });
    }

    // Atualiza a disponibilidade do livro
    book.available = true;

    // Salva as alterações
    await book.save();

    // Retorna a nova quantidade de reservas e disponibilidade
    res.status(200).json({
      title: book.title,
      totalReservations: book.reservations,
      available: book.available,
    });
  } catch (error) {
    console.error('Erro ao devolver livro:', error);
    res.status(500).json({ message: 'Erro ao devolver livro', error });
  }
});




app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
