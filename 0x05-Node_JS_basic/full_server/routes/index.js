const router = require('express').Router();
const AppController = require('../controllers/AppController');
const StudentsController = require('../controllers/StudentsController');

router.get('/', AppController.getHomepage);
router.get('/students', StudentsController.getAllStudents);
router.get('/students/:major', StudentsController.getAllStudentsByMajor);

module.exports = router;
