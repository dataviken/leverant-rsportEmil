const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Mock user data (Du kan ersätta detta med en databas senare)
const users = [
  { id: 1, username: 'företag1', password: '$2a$10$gJ9tCOayP9V5ygn.n72yIuB9rM5rgIz5NjStMzHho.HMSvLM1HZby' } // lösenord: "password"
];

// Endpoint för inloggning
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hitta användaren i den mockade datan (du kan ersätta det med en databas)
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Fel användarnamn' });
  }

  // Jämför lösenord
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Serverfel' });
    }

    if (!result) {
      return res.status(400).json({ message: 'Fel lösenord' });
    }

    // Skapa en JWT-token
    const token = jwt.sign({ id: user.id, username: user.username }, 'hemlignyckel', { expiresIn: '1h' });

    res.json({ message: 'Inloggad', token });
  });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
