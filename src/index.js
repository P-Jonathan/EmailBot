const session = require('express-session');
const express = require('express');
const path = require('path');
const ip = require('ip');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './../public/')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    console.log(request.session);
    const { messages = [], errors = [] } = request.session;
    request.session.messages = [];
    request.session.errors = [];
    response.render('index', {
        messages: ['Bienvenido!', ...messages],
        errors: [...errors]
    });
});

app.post('/send', (request, response) => {
    request.session.messages = ['El mensaje fue enviado correctamente.'];
    response.redirect('/');
})

app.listen(port, () => {
    console.log(`Running app on port ${port}.\nOpen app: http://${ip.address()}:${port}`);
});