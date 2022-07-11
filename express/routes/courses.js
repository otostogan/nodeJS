const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {

    const courses = await Course.getAll();

    res.status(200);
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    
    const course = await Course.getById(req.params.id);

    res.status(200);
    res.render('course', {
        layout: 'empty',
        title: course.title,
        course
    })
})

module.exports = router;