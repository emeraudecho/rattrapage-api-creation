const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middlewares/auth');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/v1/game', auth, gameRoutes); // Routes protégées par l'authentification
app.use('/api/v1/users', userRoutes); // Routes pour l'authentification

// Connexion à la base de données
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
