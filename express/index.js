const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');

const User = require('./models/user');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try {
      const user = await User.findById('62cd85522e13171767e6d4c1')
      req.user = user
      next()
    } catch (e) {
      console.log(e)
    }
  })

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 80;

async function start() {
    const url = 'mongodb+srv://tostogan:tostogan@cluster0.kcuokbx.mongodb.net/shop';
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const candidate = await User.findOne();

        if (!candidate) {
            const user = new User({
                email: 'otostogan@yandex.ru',
                name: 'Alex',
                card: {
                    items: []
                }
            });

            await user.save();
        }

        console.log('MongoDB connected');
    } catch (e) {
        console.log(e);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
    );
}

start();