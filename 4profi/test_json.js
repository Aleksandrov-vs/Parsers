// const getProduct = require('./get_product')
// const launcher = require('./launcher.js')
// const getLinks = require('./get_links')
const fs = require('fs')
data = fs.readFileSync('/home/vasya/my_projects/Tema_work/4profi/links_to_categories.json')
data = JSON.parse(data)
a = Object.keys(data)
console.log(data['Утюжки и плойки для волос'])
for (let i of a) {

    console.log(data[i])
}
// str = "привет хара Характеристики сколько стоит характерисики"
// var expr = new RegExp('(Характерисики)+[\d|\D]')
// a = str.replace(/(Характеристики)[\D|\d]*/, '')
// console.log(a)
