const {Router} = require('express')
const Course = require('../models/courses')
const router = Router()

router.get('/courses', async (req, res) => {
    const courses = await Course.find() // find, static mongoose method for get all data
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    })
})

router.get('/courses/:id',  async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('course', {
        title: `${course.title}`,
        course
    })
})

module.exports = router