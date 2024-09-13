const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

let animals = require('./animals');
app.get('/animals', (req, res) => {
  res.json(animals);
});

app.post('/animals', (req, res) => {
  const newAnimal = {
      id: animals.length + 1,
      name: req.body.name,
      species: req.body.species,
  };
  animals.push(newAnimal);
  res.status(201).json(newAnimal); // Return the newly created animal
});

// PUT request to update an existing animal
app.put('/animals/:id', (req, res) => {
  const animalId = parseInt(req.params.id);
  const animalToUpdate = animals.find((animal) => animal.id === animalId);

  if (!animalToUpdate) {
      return res.status(404).json({ error: "Animal not found" });
  }

  // Update the animal's name and species
  animalToUpdate.name = req.body.name || animalToUpdate.name;
  animalToUpdate.species = req.body.species || animalToUpdate.species;

  res.json(animalToUpdate);
});


// DELETE request to remove an animal
app.delete('/animals/:id', (req, res) => {
  const animalId = parseInt(req.params.id);
  animals = animals.filter((animal) => animal.id !== animalId);

  res.status(204).send(); // 204 No Content (successful deletion, no response body)
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
