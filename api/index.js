const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/people_db';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age:  { type: Number, required: true }
});
const Person = mongoose.model('Person', PersonSchema);

// Create
app.post('/people', async (req, res) => {
  try {
    const p = new Person(req.body);
    await p.save();
    res.status(201).json(p);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
app.get('/people', async (_, res) => {
  const all = await Person.find();
  res.json(all);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
