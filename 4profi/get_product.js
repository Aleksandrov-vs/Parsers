const parse = async (page,link_to_product) =>{
    await page.goto(link_to_product)
    try {
        const links_img = await page.evaluate(() => {
            const links_img = []
            const mainElement = document.querySelector('div.thumbnails')
            const elements = mainElement.querySelectorAll('a')
            for (const element of elements) {
                links_img.push(element.href)
            }
            return links_img
        });
        const title = await page.evaluate((page) => {
            return (document.querySelector(' [itemprop="name"]').innerText.trim())
        });
        const text = await page.evaluate((page) => {
            let text = ''
            text = document.querySelector('.tab-content').innerText
            text = text.replace(/(Характеристики)[\D|\d]*/, '')
            return text
        })
        const price = parseFloat(await page.evaluate((page) => {
            return (document.querySelector('.price> [itemprop="price"]').getAttribute('content').trim())
        }))
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const product_data = {
            category: "",
            create_date: `${dd}/${mm}/${yyyy}`,
            description: text,
            photo_urls: links_img,
            price: {unit: 1, value: price},
            rating: 0,
            sub_category: 1,
            sub_title: '',
            title: title,
            update_date: `${dd}/${mm}/${yyyy}`,
        }
        return product_data
    } catch (e) {
    }
}

module.exports = async (page, link)=>{
    const result = await parse(page, link)
    return result
}