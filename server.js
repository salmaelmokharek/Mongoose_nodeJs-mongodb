// Load environment variables from .env file
require('dotenv').config();

// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas (Person database)'))
  .catch(err => console.error('Connection error:', err));

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  age: Number, // Age is a number
  favoriteFoods: [String] // Array of strings for favorite foods
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

// 1. Create and Save a Record of a Model
const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: 'John Doe',
      age: 25,
      favoriteFoods: ['pizza', 'pasta']
    });
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error('Error saving person:', err);
  }
};

// 2. Create Many Records with model.create()
const arrayOfPeople = [
  { name: 'Alice', age: 30, favoriteFoods: ['sushi', 'ramen'] },
  { name: 'Bob', age: 22, favoriteFoods: ['burger', 'fries'] },
  { name: 'Mary', age: 28, favoriteFoods: ['salad'] }
];

const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople); // Use await instead of callback
    console.log('People created:', people);
  } catch (err) {
    console.error('Error creating people:', err);
  }
};

// 3. Use model.find() to Search Database
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name: name }); // Use await instead of callback
    console.log('People found by name:', people);
  } catch (err) {
    console.error('Error finding people:', err);
  }
};

// 4. Use model.findOne() to Return a Single Matching Document
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food }); // Use await instead of callback
    console.log('Person who likes', food, ':', person);
  } catch (err) {
    console.error('Error finding person by food:', err);
  }
};

// 5. Use model.findById() to Search by _id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId); // Use await instead of callback
    console.log('Person by ID:', person);
  } catch (err) {
    console.error('Error finding person by ID:', err);
  }
};

// 6. Perform Classic Updates by Running Find, Edit, then Save
const updatePersonFavorites = async (personId) => {
  try {
    const person = await Person.findById(personId); // Use await instead of callback
    if (!person) throw new Error('Person not found');
    person.favoriteFoods.push('hamburger');
    const updatedPerson = await person.save(); // Use await instead of callback
    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

// 7. Perform New Updates Using model.findOneAndUpdate()
const updatePersonAge = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    ); // Use await instead of callback
    console.log('Updated person age:', updatedPerson);
  } catch (err) {
    console.error('Error updating person age:', err);
  }
};

// 8. Delete One Document Using model.findByIdAndDelete
const removePersonById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndDelete(personId); // Use await instead of findByIdAndRemove (deprecated)
    console.log('Removed person:', removedPerson);
  } catch (err) {
    console.error('Error removing person:', err);
  }
};

// 9. Delete Many Documents with model.deleteMany()
const removeManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: 'Mary' }); // Use deleteMany instead of remove (deprecated)
    console.log('Remove result:', result);
  } catch (err) {
    console.error('Error removing people:', err);
  }
};

// 10. Chain Search Query Helpers
const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec(); // Use await instead of callback
    console.log('Query chain result:', data);
  } catch (err) {
    console.error('Error in query chain:', err);
  }
};

// Test the functions (run them sequentially with async/await)
(async () => {
// 1
//   await createAndSavePerson();
// 2
//   await createManyPeople(arrayOfPeople);
// 3
//   await findPeopleByName('Alice');
// 4
//   await findOneByFood('pizza');
// 5
  // await findPersonById('some_id_here'); // Replace with actual ID
// 6
  // await updatePersonFavorites('some_id_here'); // Replace with actual ID
// 7
//   await updatePersonAge('Alice');
// 8
  // await removePersonById('some_id_here'); // Replace with actual ID
// 9
//   await removeManyPeople();
// 10
//   await queryChain();
})();

