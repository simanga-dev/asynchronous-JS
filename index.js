const fs = require('fs')
const superagent = require('superagent')

//Creating promising function
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could find the file ')
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("couldn't write file " )
            resolve('success')
        })
    })
}


const getDogPic = async () => {
    try {

        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`Breed: ${data}`)
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message)
    
        await writeFilePro(`dog-img.txt`, res.body.message)
        console.log('random Dog image')
    } catch(err) {
        console.log(err)
    }

    return `2: READY`
}

console.log(`1: Will get dog pics`)
getDogPic().then(x => {

    console.log(x)
    console.log(`3: Done getting dog pics`)
})

// using promises function
/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
    console.log(`Breed: ${data}`)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res => {
        console.log(res.body.message)
        
        return writeFilePro(`dog-img.txt`, res.body.message)

    }).then(()=> {
        console.log('random Dog image')
    })
    .catch( err => {
    console.log(err)
    })
*/


    


