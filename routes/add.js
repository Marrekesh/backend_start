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
    const course = new Course(req.body.title, req.body.price, req.body.img)

    await course.save()

    res.redirect('/courses')
})

module.exports = router