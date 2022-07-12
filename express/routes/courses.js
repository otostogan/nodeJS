const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {

    const courses = await Course.find();

    res.status(200);
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
})

router.get('/:id/edit', async (req, res) => {

    const course = await Course.findById(req.params.id);

    if(!req.query.allow){
        res.redirect('/');
        return;
    }

    res.render('course-edit', {
        title: `Редактирование курса ${course.title}`,
        course
    })
})

router.get('/:id', async (req, res) => {
    
    const course = await Course.findById(req.params.id);

    res.status(200);
    res.render('course', {
        layout: 'empty',
        title: course.title,
        course
    })
})

module.exports = router;