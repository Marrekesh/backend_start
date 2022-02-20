const {Router} = require('express')
const Course = require('../models/courses')
const router = Router()

router.get('/courses', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    })
})

router.get('/:id',  async (req, res) => {

    const course = await Course.getById(req.params.id)
    console.log(course)

    res.render('course', {
        course
    })
})

module.exports = router