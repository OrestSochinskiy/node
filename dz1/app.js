const path = require('path')
const fs = require('fs')

const mainDir = path.join(__dirname)



fs.readdir(mainDir, (err, files) => {
    if(err){
        console.log(err);
    }
    console.log(files);
    files.forEach(file =>{
        console.log(file);
        fs.stat(file,(err1, stats) => {
            if (stats.isDirectory()){
                fs.readdir(file, ((err1, files1) => {
                    console.log(files1);
                    files1.forEach(fileName => {
                        const filePath = path.join(mainDir,file,fileName)
                        fs.readFile(filePath, (err2, data) => {
                            if(err2){
                                console.log(err2);
                                return
                            }
                            let dataUser
                            dataUser = JSON.parse(data.toString())
                            console.log(dataUser);
                            if (dataUser.gender === 'male'){
                                const malePath = path.join(__dirname,'2000',fileName)
                                fs.rename(filePath,malePath,err3 => {
                                    if (err3){
                                        console.log(err3);
                                    }
                                })
                            }
                            if (dataUser.gender ==="female"){
                                const femalePath = path.join(__dirname,'1800',fileName)
                                fs.rename(filePath,femalePath,err3 => {
                                    if (err3){
                                        console.log(err3);
                                    }
                                })
                            }
                        })
                    })
                }))

            }
        })
    })
})