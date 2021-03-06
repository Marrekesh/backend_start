const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
//routes
const mainRoutes = require('./routes/main')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


//use
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(mainRoutes)
app.use(addRoutes)
app.use(coursesRoutes)

const PORT = 4000

app.listen(PORT, () => {
    console.log('server ready')
})