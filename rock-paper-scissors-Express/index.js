const http = require('http');
const fs = require('fs');
const url = require('url');
// const queryString = require('queryString');
const game = require('./game')
const express = require('express')


// 玩家胜利次数，如果超过3次，则后续往该服务的请求返回500
let playerWinCount = 0
// 玩家上一次的游戏动作
let lastPlayAction = null
// 玩家连续出同一个动作的次数
let sameCount = 0

const app = express()

// 通过app.get设定/favicon.ico路径的路由
// .get代表请求method是get，所以这里可以用post, delete等。
app.get('/favicon.icon', function (req, res) {
    // 一句status(200)代表writeHead(200), end
    // res.writeHead(200)
    // res.end()
    res.status(200)

    return
})

// 设定/game路由
app.get('/game', function(req, res, next) {
    if (playerWinCount >= 3 || sameCount === 9) {
        res.status(500)
        res.send('我不会再晚了！')

        return
    }

    // 通过next执行后续服务
    next()

    // 当后续中间件执行完之后，会执行到这个位置
    if (res.playerWon) {
        playerWinCount++
    }
},
 function (req, res, next) {
    // express自动帮我们吧query处理好挂在request上
    // const parseUrl = url.parse(req.url)
    // const query = queryString.decode(parseUrl.query)
    // const playerAction = query.action
    const query = req.query
    const playerAction = query.action

    if (!playerAction) {
        res.status(400)
        res.send()

        return
    }

    if (playerAction === lastPlayAction) {
        sameCount++
        if (sameCount >= 3) {
            res.status(400)
            res.send('你作弊，我再也不玩了！')
            sameCount = 9

            return
        }
    } else {
        sameCount = 0
    }

    lastPlayAction = playerAction
    // 把用户操作挂在response上传递给下一个中间件
    res.playerAction = playerAction
    next()
},
function(req, res) {
    const playerAction = res.playerAction
    const result = game(playerAction)

    // 如果这里执行setTimeout，会导致前面的洋葱模型失败
    // 因为playerWon不是在中间件执行流程所属的那个事件循环里赋值的
    // setTimeout(() => {
        res.status(200)
        if (result === 0) {
            res.send('平局')
        } else if (result === -1) {
            res.send('你输了')
        } else {
            res.send('你赢了')
            res.playerWon = true
        }
    // },500)
})

app.get('/', function(req, res) {
    // send接口会判断你传入的值得类型，文本的话则会处理text/HTMLAllCollection,
    // Buffer则会处理为下载
    res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
})


app.listen(9000)
