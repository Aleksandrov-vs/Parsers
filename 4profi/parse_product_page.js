const puppeteer = require('puppeteer')
const fs = require('fs')


const parse = async (page,link_to_product) =>{
    await page.goto(link_to_product)
    await page.waitFor(1000)
    try {
        const links_img = await page.evaluate((page) => {
            const links_img = []
            const elements = document.querySelectorAll('.thumbnails>.images-additional>a')
            for (const element of elements) {
                links_img.push(element.href)
            }
            return links_img
        });
        const title = await page.evaluate((page) => {
            return (document.querySelector(' [itemprop="name"]').innerText)
        });
        const text = await page.evaluate((page) => {
            let text = ''
            const elements = document.querySelectorAll('.tab-content>#tab-description *[style*="text-align: justify;"]')
            for (element of elements){
                text = text + (element.innerText)
            }
            return text
        });
        const price = parseFloat(await page.evaluate((page) => {
            return (document.querySelector('.price> [itemprop="price"]').getAttribute('content'))
        }));
        const product_data = {
            category: "",
            create_date: 1,
            description: [text],
            photo_urls: [links_img],
            price: {unit: 1, value: [price]},
            rating: 1.1,
            sub_category: 1,
            sub_title: '',
            title: [title],
            update_date: 1,
        }
        fs.appendFileSync('products_data.json',JSON.stringify(product_data))
    }catch (e) {
        console.log(e)
        console.log(page.url())
        await page.alert()
    }

}


module.exports.parse = async (page)=>{
    const links_to_products = JSON.parse(fs.readFileSync('links_to_products.json'))
    for (link of links_to_products){
        await parse(page,link)
    }
}