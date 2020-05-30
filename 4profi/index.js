const getProduct = require('./get_product')
const launcher = require('./launcher.js')
const getLinks = require('./get_links')
const fs = require('fs')

const url = 'https://4profi.by/aksessuary-k-mashinkam-dlya-strizhki-volos/lezviya-k-mashinkam-dlya-strizki-volos/'
const category = 'Утюжки и плойки для волос'

const main = async () => {

    const browser = await launcher.StartBrowser()
    const page = await launcher.StartPage(browser)

    data = fs.readFileSync('/home/vasya/my_projects/Tema_work/4profi/links_to_categories.json')
    data = JSON.parse(data)
    key_categ = Object.keys(data)
    const products = []
    for (var i of key_categ) {
        const links = await getLinks(page, data[i])

        for (const link of links) {
            const product = await getProduct(page, link)
            if (product === undefined) {

            } else {
                product['category'] = category
                products.push(product)
            }
        }
    }
    fs.writeFileSync('./out.json', JSON.stringify(products, null, 2))
    await browser.close()
}

main().then(()=>{
    console.log('done')
})