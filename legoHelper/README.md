# LegoHelper 乐高助手
为乐高项目增加辅助功能支持等

# 主要功能
### 乐高装配中心页面
1、组件属性面板中，点击`保存`按钮自动预览最后一次预览的组件

2、组件属性面板中，变更任何一项配置自动预览最后一次预览的组件

3、双击左侧组件树中的组件，自动预览该组件

4、选中左侧组件树中的组件，按`Del`键删除该组件

5、进入配装中心页面后自动展开组件属性面板

6、增加装配页面与组件页面左侧树状菜单顶部的工具栏，可**全部展开**、**全部折叠**树状菜单

7、增加可**搜索**左侧树状菜单，输入文字实时搜索，并高亮显示，按**回车**可循环定位组件位置

8、增加装配中心页面的底部组件属性面板中的文本输入框可拖拽调整宽度，鼠标移入即显示右下角三角，拖拽即可调整宽度

9、装配中心页面的添加组件弹框、打开页面弹窗，显示弹窗后默认光标置入搜索栏

10、添加组件弹框，打开页面弹框，输入文字可**实时**搜索，不必再点击搜索按钮，进行网络接口搜索

11、添加组件弹框，打开页面弹框，双击可直接添加组件、打开页面，不必再点击确定按钮。

### 乐高组件管理页面
1、增加快捷键，在代码编辑框内按`Command+S`、`Ctrl+S`键保存当前组件脚本。

# 受支持的浏览器
Chrome浏览器或FireFox浏览器，以及所有支持安装用户脚本（UserScript）的浏览器。

# 使用方法
1、先安装UserScript支持环境插件，推荐[Tampermonkey](http://tampermonkey.net/)，兼容Chrome和FireFox。

2、安装好**Tampermonkey**后，进入新建脚本，将本目录下的[legoHelper.user.js](https://github.com/xxcanghai/userscript/raw/master/legoHelper/legoHelper.user.js)粘贴入，保存，退出。

3、进入乐高项目地址[http://lego.waimai.sankuai.com/](http://lego.waimai.sankuai.com/)，打开控制台，出现有相应的LegoHelper字样的log日志代表安装成功。



# 安装livereload
1. chrome 插件 livereload
2. 在需要刷新的页面 开启livereload,点击图标
3. npm install
4. node legoHelper/livereload.js

# 测试环境的livereload
1. json-server db.json  --port 3000 --static ./legoHelper