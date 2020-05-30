const parse = async (page, link_to_product) => {
    await page.goto(link_to_product)

    try {
        //картинка(промотка => клик на нее => сохр ссылки => клик обратно )
        await  page.waitFor('body > div.zoomContainer')
        await page.hover('body > div.zoomContainer')
        await page.click('body > div.zoomContainer')
        const link_img = await page.evaluate(async (page, link_to_product) => {
            const link_img = document.querySelector('.mfp-img').src
            return link_img
        });
        await page.click('button[title="Close (Esc)"]')
        //название товара
        const title = await page.evaluate((page) => {
            return (document.querySelector('[itemprop="name"]').innerText.trim())
        });
        //описание
        const text = await page.evaluate((page) => {
            let text= ''
            try {
                text = document.querySelector('#tab-description').innerText
            }catch (e) {
                return text
            }
            return text
            });
        //цена
        const price = parseFloat(await page.evaluate((page) => {
            return (document.querySelector('.autocalc-product-special').innerText)
        }))

        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const product_data = {
            category: "",
            create_date: `${dd}/${mm}/${yyyy}`,
            description: text,
            photo_urls: link_img,
            price: {unit: 1, value: price},
            rating: 0,
            sub_category: 1,
            sub_title: '',
            title: title,
            update_date: `${dd}/${mm}/${yyyy}`,
            link_to_product: link_to_product,
        }
        return product_data
    } catch (e) {
        console.log(e)
    }

}

module.exports = async (page, link)=>{
    const result = await parse(page, link)
    return result
}