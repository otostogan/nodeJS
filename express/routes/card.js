const {Router} = require('express');
const Card = require('../models/card');
const Course = require('../models/course');
const router = Router();

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);
    await Card.add(course);
    res.redirect('/card');
})

router.delete('/remove/:id', async (req, res) =>{
    const card = await Card.remove(req.params.id);
    res.status(200).json(card);
});

router.get('/add/:id', async (req, res) => {
    const course = await Course.getById(req.params.id);
    await Card.add(course);
    const card = await Card.fetch();
    res.status(200).json(card);
})

router.get('/', async (req, res) =>{
    const card = await Card.fetch();
    res.render('card', { 
        title: "Корзина",
        courses: card.courses,
        price: card.price,
        isCard: true
    })
})

module.exports = router;