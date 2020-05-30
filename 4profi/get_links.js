const allLinks = []

const getLinksPerPage = async (page) => {
    const result = await page.evaluate(() => {
        const links = []
        const elements = document.querySelectorAll('.product-thumb.thumbnail > div .caption > h4> a')
        for(const element of elements){
            link = element.href
            links.push(link)
        }
        return links
    })
    for(const res of result){
        allLinks.push(res)
    }
}

module.exports = async (page, link_on_category) => {
    await page.goto(link_on_category)
    while(1){
        await getLinksPerPage(page)
        try {
            await Promise.all([
                page.waitForNavigation({timeout:5000}),
                page.click('.pagination>li.active~li')
            ])
        } catch(err){
            break
        }
    }
    return allLinks
}