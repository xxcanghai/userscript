声明：此插件脚本仅供技术研究交流!
----------------------

# elephantHelper 大象助手
为大象增加辅助功能支持等

# 主要功能
1、去除水印

# 开发中的功能
- [ ] 批量提取大象某群组的所有人的MIS号
- [ ] 自动抢会议室
- [ ] 会议室批量添加参会人（目前痛点是 要一个一个输入mis的添加）
- [ ] 大象的黑色主题
- [ ] 自动关键词回复（如“在不在？在么？忙么？“等等）


# 使用方法
1、先安装UserScript支持环境插件，推荐[Tampermonkey](http://tampermonkey.net/)，兼容Chrome和FireFox。

2、安装好**Tampermonkey**后，点击[elephantHelper.user.js](https://github.com/xxcanghai/userscript/raw/master/elephantHelper/elephantHelper.user.js)，会自动进入Tampermonkey界面，点击“安装”按钮即可。

2.1、若上一步没有自动进入Tampermonkey界面的话，也可点击chrome应用栏的Tampermonkey图标，再选择新建脚本，将本目录下的[elephantHelper.user.js](https://github.com/xxcanghai/userscript/raw/master/elephantHelper/elephantHelper.user.js)文件所有代码粘贴入，保存，退出。

3、重新刷新进入Web版大象[https://x.sankuai.com](https://x.sankuai.com)，打开控制台，出现有相应的elephantHelper字样的log日志代表安装成功。


# 受支持的浏览器
Chrome浏览器或FireFox浏览器，以及所有支持安装用户脚本（UserScript）的浏览器。

# 如何二次开发？
1、将本项目拉取到本地。

2、进入Tampermonkey控制台，进入本脚本编辑界面，将`// @require  file:///......`行移动到`// ==/UserScript==`行的上面

3、将`// @require`行后面路径修改为你本地拉取下来项目的`elephantHelper.js`文件的磁盘绝对路径

4、修改代码的`var isDev = false;`中的false改为`true`即可。

5、之后即可在本地项目中修改、开发、调试代码

6、源码采用TypeScript开发，但也可使用纯JS开发，直接删除.ts文件即可
