## Node.js的非阻塞I/O
- I/O即Input/Output,一个系统的输入输出
- 阻塞I/O和非阻塞I/O的区别就在于系统接收输入再到输出期间，能不能接受其他的输入

### 事件循环
### Promise
- .then和.catch
    - resolve状态的Promise回调后面的第一个.then
    - reject状态的Promise回调后面的第一个.catch
    - 任何一个rejectd状态且后面，没有.catch的Promise，都会造成浏览器/node环境的全局错误
- 执行.then和.catch会返回一个新的Promise，该Promise最终状态根据then和catch的回调函数的执行结果决定
    - 如果回调函数最终是throw，该Promise是rejected状态
    - 如果回调函数最终是return，该Promise是resolved状态
- 执行then和catch会返回一个新Promise，该Promise最终状态根据then和catch的回调函数的执行结果决定
    - 如果回调函数最终是throw，该Promise是rejected状态
    - 如果回调函数最终是return，该Promise是resolved状态
    - 但如果回调函数最终return了一个Promise，该Promise会和回调函数return的Promise状态保持一致

### Koa
- 核心功能
    - 使用async function实现的中间件
        - 有“暂停执行”的能力
        - 在异步的情况下也符合洋葱模型
- Express vs Koa
    - express门槛更低，koa更强大优雅
    - express封装更多东西，开发更快速，koa可定制型更高