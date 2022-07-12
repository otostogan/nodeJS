const {Router} = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', (req, res) => {
    res.status(200);

    res.render('add', {
        title: 'Добавить курс',
        isAdd: true,
    })
})

router.post('/', async (req, res) => {
    const {title, price, img} = req.body;

    try{
        const course = new Course({title, price, img});
        await course.save();
        res.redirect('/courses');
    }catch(e){
        console.log(e);
    }
    
})

module.exports = router;