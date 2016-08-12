# LegoHelper 乐高助手
为乐高项目增加辅助功能支持等

# 主要功能
## 乐高装配中心页面
1、组件属性面板中，点击`保存`按钮自动预览最后一次预览的组件
2、组件属性面板中，变更任何一项配置自动预览最后一次预览的组件
3、双击左侧组件树中的组件，自动预览该组件
4、选中左侧组件树中的组件，按`Del`键删除该组件
5、进入配装中心页面后自动展开组件属性面板

## 乐高组件管理页面
1、增加快捷键，在代码编辑框内按`Command+S`、`Ctrl+S`键保存当前组件脚本。

# 受支持的浏览器
Chrome浏览器或FireFox浏览器，以及所有支持安装用户脚本（UserScript）的浏览器。

# 使用方法
1、先安装UserScript支持环境插件，推荐[Tampermonkey](http://tampermonkey.net/)，兼容Chrome和FireFox。

2、安装好**Tampermonkey**后，进入新建脚本，将本目录下的`legoHelper.user.js`粘贴入，保存，退出。

3、进入乐高项目地址[http://lego.waimai.sankuai.com/](http://lego.waimai.sankuai.com/)，打开控制台，出现有相应的LegoHelper字样的log日志代表安装成功。
