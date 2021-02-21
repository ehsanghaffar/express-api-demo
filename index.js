// validation package
const Joi = require('joi');
const express = require('express');
const app = express();

// middleware
app.use(express.json());

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course2'}
]


// Validate with Joi 
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  }
}


//  CRUD operations method
// GET
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// GET all Courese
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// get with params
app.get('/api/courses/:id', (req, res) => {

  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course not found') // 404

  res.send(course);
});


// POST
app.post('/api/Courses', (req, res) => {

  // Joi validation method
  const { error } = validateCourse(req.body)
  if (error) { 
    res.status(400).send(error.details[0].message);
    return;
  }

  // request
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);

})
  // UPDATE
  app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found') // 404 

    // validate
    // If invalid, return 400 - Bad Request
    const { error } = validateCourse(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // Update course
    course.name = req.body.name;
    res.send(course);
  });



// DELETE
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found') // 404

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`) );


