const puppeteer = require('puppeteer')
const fs = require('fs')


const parse_product_page = async () => {

}


const get_links_categ_page = async (page) => {

    const result = await page.evaluate(() => {
        const links = []
        const elements = document.querySelectorAll('.product-thumb.thumbnail > div .caption > h4> a')
        for(const element of elements){
            link = element.href
            links.push(link)
        }

        return links
    })
    return result

}





module.exports.parser = async (page, link_on_category) => {
    await page.goto(link_on_category)
    let links_categ_page = []
    while(1){
        console.log(await page.url())
        links_categ_page = links_categ_page.concat(await get_links_categ_page(page))
        try{const [response] = await Promise.all([
            page.waitForNavigation({timeout:5000}),
            page.click('.pagination>li.active~li'),
        ]);
        }catch(err){
            break;
        }
    }
    const json = JSON.stringify(links_categ_page)
    fs.writeFileSync('links_to_products.json', json)
}