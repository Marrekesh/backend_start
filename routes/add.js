const {Router} = require('express');
const router = Router();
const Course = require('../models/courses')

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'add courses',
        isAdd: true
    })
})

router.post('/add', async (req, res) => {

    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    })

    try {
        await course.save()
        res.redirect('/courses')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router