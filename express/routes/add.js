const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(200);

    res.render('add', {
        title: 'Добавить курс',
        isAdd: true,
    })
})

router.post('/', (req, res) => {
    const {title, price, img} = req.body;

    res.redirect('/courses');
})

module.exports = router;