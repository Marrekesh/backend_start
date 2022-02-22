const path = require('path')
const fs = require('fs')

const p = path.join(__dirname, '..', 'data', 'basket.json')

class Basket {

    static async add(course) {
        const basket = await Basket.fetch()

        const index = basket.courses.findIndex(c => c.id === course.id)
        const candidate = basket.courses[index]

        if (candidate) {
            candidate.count++
            basket.courses[index] = candidate
        } else {
            course.count = 1
            basket.courses.push(course)
        }

        basket.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(basket), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }

    static async remove(id) {
        const basket = await Basket.fetch()

        const index = basket.courses.findIndex(c => c.id === id)

        const course = basket.courses[index]

        if (course.count === 1) {
            basket.courses = basket.courses.filter(c => c.id !== id)
        } else {
             course.count--
        }

        basket.price -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(basket), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(basket)
                }
            })
        })
    }

}

module.exports = Basket