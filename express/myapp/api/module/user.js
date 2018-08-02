var express = require('express');
var router = express.Router();
var db = require("../../config/db.js")
router.get('/list', function(req, res, next) {
    let {
        page,
        pageSize
    } = req.query;
    console.log(req.query)
    let sql = 'select * from list';
    if (page) {
        sql = `select * from list`
    }

    if (Object.keys(req.query).length >= 3) {
        sql += ' where ';
        let index = 0;
        for (let key in req.query) {
            if (['page', 'pageSize'].indexOf(key) == -1) {
                if (index != 0) {
                    sql += ' and ';
                }
                sql += key + '=' + req.query[key].toString();
                index += 1;
            }
        }
    }
    var str = ""
    if (!page) {
        str += ` where strot=2`
    }
    str += ` order by id desc`;
    if (page) {
        str += ` LIMIT ${page*pageSize}, ${pageSize}`
    }

    db.query(sql + str, [], (error, results) => {
        if (error) throw error;
        if (page) {
            db.query(sql, [], (error, results2) => {
                if (error) throw error;
                res.json({
                    count: results2.length,
                    data: results
                })
            })
        } else {
            res.json(results)
        }
    })

});
router.post('/updata', (req, res) => {
    const bodyData = req.body;
    console.log(bodyData)
    let sql = `update list set `;
    for (let key in bodyData) {
        console.log(key)
        if (key != 'id' && bodyData[key]) {
            sql += '`' + key + "`='" + bodyData[key] + "', ";
        }
    };
    sql = sql.substr(0, sql.length - 2) + ' where id=' + bodyData.id;
    console.log(sql);

    db.query(sql, [], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
router.get('/class-list', function(req, res, next) {
    db.query("select * from classlist", function(err, result) {
        let count = 0;
        result.forEach((item, index) => {
            if (item.list) {
                var indes = JSON.parse(item.list).join(",");
                let sql = "select * from list where id in (" + indes + ") and strot = 2"
                db.query(sql, [], function(err, results) {
                    console.log(results)
                    count += 1
                    item.list = results
                    if (count == result.length) {
                        res.json(result)
                        console.log(result)
                    }
                })
            } else {
                count += 1;
            }
        })
    })
});
module.exports = router;