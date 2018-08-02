var express = require('express');
var router = express.Router();
const multer = require("multer");
var db = require("../../config/db.js")
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //文件上传成功后会放入public下的upload文件夹
        cb(null, './public/upload')
    },
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".")
            //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
        cb(null, file.fieldname + "-" + Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
});

var list = [{
        name: "张三",
        age: 15,
        hobby: "吃"
    }]
    /* GET users listing. */

router.get('/get-prodcot', function(req, res, next) {
    var callback = req.query.callback //通过地址栏传过来的js函数进行传入实参只能事字符串
    res.cookie("islogin", "sucess", { maxAge: 1000 * 60 * 60 * 1000 })
    if (callback) {
        res.send(callback + '(' + JSON.stringify(list) + ')');
    } else {
        res.json({ name: "你呢好" })
    }

});
router.get('/list', function(req, res, next) {
    //通过地址栏传过来的js函数进行传入实参只能事字符串
    // res.cookie("islogin", "sucess", { maxAge: 1000 * 60 * 60 * 1000 })
    db.query("select * from list", function(err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
            console.log(result)
        }
    })

});
router.post('/list_uploading', function(req, res, next) {
    let {
        name,
        region,
        price,
        introduce,
        burdening,
        sort,
        background,
        imageUrl,
        context
    } = req.body
    var city = (+new Date()) + '';
    var contenext = "http://resource1.lechun.cc/proImgStorage/3178715420772962116_O.jpg"
    console.log(name, region, price, introduce, burdening)
    var sql = "insert into list (`name`,`space`,`pirc`,`initcentst`,`contes`,`inventory`,`backgrounds`,`pircer`,`city`,conten,contenext) values(?,?,?,?,?,?,?,?,?,?,?)"
    db.query(sql, [
        name,
        region,
        price,
        JSON.stringify(introduce),
        burdening,
        sort,
        background,
        imageUrl,
        city,
        context,
        contenext
    ], (error, results) => {
        if (error) throw error;
        res.json(results)
        console.log(results)
    })
});
router.get('/class-list', function(req, res, next) {
    db.query("select * from classlist", function(err, result) {
        if (err) {
            router.post('/upload', upload.single('file'), function(req, res, next) {
                //拼接文件上传后的网络路径，
                console.log(req.file.filename)
                var url = 'http://localhost:3000/upload/' + req.file.filename;
                //将其发回客户端
                res.json({
                    code: 1,
                    data: url
                });
            });
            console.log(err)
        } else {
            result.forEach((item, index) => {
                var indes = JSON.parse(item.list).join(",");
                let sql = "select * from list where id in (" + indes + ")"
                db.query(sql, function(err, results) {
                    console.log(results)
                    item.list = results
                    if (index == result.length - 1) {
                        res.json(result)
                        console.log(result)
                    }
                })
            })
        }
    })

});

router.get("/get_query", function(req, res, next) {
    const mobile = req.query.mobile
    var str = ""
    while (str.length < 6) {
        str += Math.floor(Math.random() * 10)
    }
    console.log(req.session)
    req.session.str = str;
    req.session.mobiles = mobile
    res.json({ str: str })
})
router.post("/pwds", function(req, res, next) {
    var { mobile, note } = req.body
    var { str, mobiles } = req.session
    console.log(req.body)
    if (str == note && mobiles == mobile) {
        let sql = 'select * from user where mobile=?'
        db.query(sql, [mobile], (error, result) => {
            if (error) throw error;
            if (result.length >= 1) {
                res.cookie('token', mobile, { maxAge: 1000 * 60 * 60 * 24 * 30 }); //用cookie存储值传给客户端
                res.json({
                    code: 2,
                    msg: '登录成功'
                })
            } else {
                let sql = 'insert into user (mobile) values (?)';
                res.cookie('token', mobile, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                db.query(sql, [mobile], (error, results) => {
                    if (error) throw error;
                    res.json({
                        code: 2,
                        msg: '登录成功'
                    })
                })
            }
        })

    } else {
        res.json({ code: "1", msg: "登录失败" })
    }
})
router.get("/user_joint", (req, res, next) => {
    let cokks = req.cookies.token;
    db.query("select * from user where mobile=?", [cokks], (err, results) => {
        if (err) throw err;
        res.json({
            code: 2,
            data: results[0]
        })
    })
})
var upload = multer({
    storage: storage
});
router.post('/upload', upload.single('file'), function(req, res, next) {
    //拼接文件上传后的网络路径，
    console.log(req.file.filename)
    var url = 'http://localhost:3000/upload/' + req.file.filename;
    //将其发回客户端
    res.json({
        code: 1,
        data: url
    });
});
router.post('/uploading', (req, res) => {
    const {
        userid,
        videoUrl,
        test
    } = req.body;
    console.log(req.body)
    var sql = 'insert into video (userid, videoUrl,test) values (?, ?, ?)';
    db.query(sql, [userid, videoUrl, test], (error, results) => {
        if (error) throw error;
        res.json({
            code: 2,
            msg: '上传成功'
        })
    })
})

module.exports = router;