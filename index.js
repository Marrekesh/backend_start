const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')
//routes
const mainRoutes = require('./routes/main')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const basketRoutes = require('./routes/basket')




const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


//use
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(mainRoutes)
app.use(addRoutes)
app.use(coursesRoutes)
app.use(basketRoutes)

const PORT = 4000

async function start() {

    try {
        const toket =  `mongodb+srv://Marrakesh1:123Sypthon@cluster0.nfcks.mongodb.net/shop` //`mongodb+srv://Marrakesh1:123Sypthon@cluster0.nfcks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        await mongoose.connect(toket, {
            useNewUrlParser: true,
            // useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('server ready')
        })

    } catch(e) {
        console.log(e)
    }


}

start()





