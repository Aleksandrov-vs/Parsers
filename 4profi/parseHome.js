const puppeteer = require('puppeteer')
const fs = require('fs')
module.exports.ParseHomePage=async (page)=>{
    const home_url = 'https://4profi.by/instrument-dlya-barberov/'

    await page.goto(home_url)
    await page.click("#menu > button")
    await page.waitForSelector('#menu-list > li',{timeout: 2000})

    const result = await page.evaluate(async ()=> {
        const elements = await document.querySelectorAll("#menu-list > li")
        const categories = {}
        for (let element of elements) {
            const name = element.innerText
            const countChild = element.childElementCount
            let link = ''
            // тут можно решить  проблему вложенных категорий, если количествуо детей равно 1 то их нет
            if (countChild <= 1) {
                link = element.childNodes[0].href
            } else {
                link = element.childNodes[3].href
            }
            const category = {[name]: link}
            Object.assign(categories, category)
        }
        return JSON.stringify(categories)
    })
    try {
        fs.writeFileSync('links_to_categories.json', result)

    }catch(err) {
          console.log(err)
    }

}