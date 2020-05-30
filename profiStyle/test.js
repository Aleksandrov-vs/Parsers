const fs = require('fs')
data = fs.readFileSync('/home/vasya/my_projects/Tema_work/4profi/out.json')
data = JSON.parse(data)
for (let i = 0;i <= data.length;i++){
console.log(data[i].link_to_product)
console.log(data[i].description)
console.log('\n', '----------------------------------------------------------------------------------------------------','\n')
}