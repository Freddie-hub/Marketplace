const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRoute = require('./routes/users');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', usersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
