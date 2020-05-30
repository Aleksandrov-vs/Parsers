const getProduct = require('./getProduct')
const launcher = require('./launcher.js')
const getLinks = require('./getLinks')
const fs = require('fs')

const url = "https://profistyle.by/tehnika-dlya-parikmahera/mashinki-zapasnye-lezviya-nasadki/mashinki-andis//"
const category = 'Утюжки и плойки для волос'


const main = async () => {

    const browser = await launcher.StartBrowser()
    const page = await launcher.StartPage(browser)

    const links = await getLinks(page, url)
    const products = []

    for(const link of links){
        const product = await getProduct(page, link)
        if(product !== undefined){
            product['category'] = category
            products.push(product)
        }
    }

    fs.writeFileSync('./out.json', JSON.stringify(products, null, 2))
    await browser.close()
}

main().then(()=>{
    console.log('done')
})