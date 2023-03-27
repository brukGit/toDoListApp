let elImg = document.querySelectorAll('img.delete')

console.log(`first ${elImg.length}`)
console.log(`element - ${elImg.item(0).parentElement}`)

// console.log(`parent - ${elImg.parentElement.length}`)
// console.log(`grandparent - ${elImg.parentElement.parentElement}`)

console.log(`grparent - ${elImg.item(0).parentElement.parentElement}`)

elImg.item(0).parentElement.parentElement.remove()
elImg = document.querySelectorAll('img')
console.log(`later ${elImg.length}`)