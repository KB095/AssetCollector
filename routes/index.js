const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require("fs");
const { formidable } = require('formidable');
const path = require('path');


router.get('/', (req, res) => {
    res.render('dashboard', {layout: 'main'})
})


router.post('/', (req, res) => {
    const handleError = (err, res) => {
        res
          .status(500)
          .contentType("text/plain")
          .end("Oops! Something went wrong!")
    }

    var form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        console.log(files)
        var qrCode = fields.code.replace(/[^0-9]+/g, '0')

        var oldPath1 =  `${files.first.filepath}`
        var newPath1 = `./assets/${qrCode}_1.jpg`

        var oldPath2 =  `${files.second.filepath}`
        var newPath2 = `./assets/${qrCode}_2.jpg`

        var oldPath3 =  `${files.third.filepath}`
        var newPath3 = `./assets/${qrCode}_3.jpg`

        var oldPath4 =  `${files.fourth.filepath}`
        var newPath4 = `./assets/${qrCode}_4.jpg`

        var oldPath5 =  `${files.fifth.filepath}`
        var newPath5 = `./assets/${qrCode}_5.jpg`
        

        if(files.first.size > 0){
            fs.rename(oldPath1, newPath1, function (err) {
                if (err) {
                    res.render('nok', {layout: 'main'})
                }
            })
        }
        if(files.second.size > 0){
            fs.rename(oldPath2, newPath2, function (err) {
                if (err) {
                    res.render('nok', {layout: 'main'})
                }
            })
        }
        if(files.third.size > 0){
            fs.rename(oldPath3, newPath3, function (err) {
                if (err) {
                    res.render('nok', {layout: 'main'})
                }
            })
        }
        if(files.fourth.size > 0){
            fs.rename(oldPath4, newPath4, function (err) {
                if (err) {
                    res.render('nok', {layout: 'main'})
                }
            })
        }
        if(files.fifth.size > 0){
            fs.rename(oldPath5, newPath5, function (err) {
                if (err) {
                    res.render('nok', {layout: 'main'})
                }
            })
        }
        
        let content = `${qrCode};${fields.place};${fields.note}\n`
        fs.appendFile(`./assets/assetList.txt`, content, (err)=> {
            if (err) {
                res.render('nok', {layout: 'main'})
            }
        })

        res.render('ok', {layout: 'main'})
    })
})


module.exports = router