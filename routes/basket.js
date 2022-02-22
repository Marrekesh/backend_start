const {Router} = require('express')
const router = Router()
const Course = require('../models/courses')
const Basket = require('../models/basket')

router.post('/card/add', async (req, res) => {
    const course = await Course.getById(req.body.id)
    await Basket.add(course)
    res.redirect('/basket')
})

router.get('/basket', async (req, res) => {
    const basked = await Basket.fetch()
    res.render('basket', {
        title: 'basket',
        isBasket: true,
        courses: basked.courses,
        price: basked.price
    })
})

router.delete('/basket/remove/:id', async (req, res) => {
    const basket = await Basket.remove(req.params.id)
    res.status(200).json(basket)
})



module.exports = router