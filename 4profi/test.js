 const fs = require('fs')
 const puppeteer = require('puppeteer')
 const parse = async (page,link_to_product) =>{
  await page.goto(link_to_product)
   const text = await page.evaluate((page) => {
        let text = ''
        text = document.querySelector('.tab-content').innerText
        text = text.replace(/(Характеристики)[\D|\d]*/, '')
    return text
   })
  return text
 }


const main = async()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless : false})
    const page = await browser.newPage()
    await page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    url ='https://4profi.by/shhipcy-vypryamiteli-plojki/kiepe-pro-19'
    a = await parse(page, url)
    console.log(a)
    // browser.close()
 }
main()

