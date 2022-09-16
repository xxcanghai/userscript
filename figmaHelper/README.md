# figmaHelper Figma前端助手


# 主要功能
1. 增加对选中元素的属性展示转换后的单位值
2. 支持自定义转换公式

示例：
![](https://i.imgur.com/llQPlRQ.png)

# 开发中的功能
- [ ] 自定义单位字符串，当前写死为`rpx`单位。
- [ ] 支持`Code`面板对生产后的css代码中的px单位进行转换。


# 使用方法
1、先安装UserScript支持环境插件，推荐[Tampermonkey](http://tampermonkey.net/)，兼容Chrome和FireFox。

2、安装好**Tampermonkey**后，点击[figmaHelper.user.js](https://raw.githubusercontent.com/xxcanghai/userscript/master/figmaHelper/figmaHelper.user.js)，会自动进入Tampermonkey界面，点击“安装”按钮即可。

2.1、若上一步没有自动进入Tampermonkey界面的话，也可点击chrome应用栏的Tampermonkey图标，再选择新建脚本，将本目录下的[figmaHelper.user.js](https://github.com/xxcanghai/userscript/blob/master/figmaHelper/figmaHelper.user.js)文件所有代码粘贴入，保存，退出。

3、重新刷新进入figma网站[https://www.figma.com/](https://www.figma.com/)，进入指定某一个设计稿页面，打开控制台，出现有相应的figmaHelper字样的log日志代表安装成功。


# 受支持的浏览器
Chrome浏览器或FireFox浏览器，以及所有支持安装用户脚本（UserScript）的浏览器。

# 如何二次开发？
1、将本项目拉取到本地。

2、进入Tampermonkey控制台，进入本脚本编辑界面，将`// @require  file:///......`行移动到`// ==/UserScript==`行的上面

3、将`// @require`行后面路径修改为你本地拉取下来项目的`figmaHelper.js`文件的磁盘绝对路径

4、修改代码的`var isDev = false;`中的false改为`true`即可。

5、之后即可在本地项目中修改、开发、调试代码
