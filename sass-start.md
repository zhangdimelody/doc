# sass入门（中文版）(M译)

------

### [原文](http://sass.bootcss.com/docs/guide/)

在使用sass之前，需要在项目中设置它。如果你只是想浏览下，请继续阅读，但我们建议你先安装sass，[点击这里](http://sass.bootcss.com/install/)如果你想学习如何安装。

### 预处理
css自身会很有趣，但是样式表会变的越来越大，越来越复杂，而且很难去维护。这就是一个预处理器可以帮助的地方。sass可以让你用一些不存在于css的特性，像变量、嵌套、混入、继承和别的极好的东西，让写css更加有趣。
一旦你开始使用sass，他将得到你的编译后sass文件并将它保存成一份正常css文件，以便于你在你的网站里使用。

### 变量
把变量作为一种方式去存储你想要在整个样式表里重用的信息，你可以存储像颜色、字体栈或任何css值你想要重用的。sass使用$标志来建一个变量。例如：
当sass被处理的时候，它将我们定义的$font-stack 和 $primary-color变量得到，然后将变量放入css后，输出正常的css。当这些颜色运转、保证他们在整个站点一致时，极其强大。

### 嵌套
当你写html时你可能会注意到它有一个相当明显的嵌套、视觉层次。css却不是。sass将会让你的css选择，以一种跟你html一样的视觉层次的方式来嵌套。下面的例子是在一个站点导航中的一些典型的样式：
你将会注意到ul li 和 a 选择器被嵌套在nav选择器中。这是一个很棒的方式去组织你的css并且让它更具有可读性。当你生成css你将会得到像这样的东西。

### 局部模块
你可以新建部分sass文件，包含css小片段，以便于可以包含在别的sass文件中。这是一个很棒的方式去模块化你的css并能更易于维护。一个局部模块是一个以下划线开头的简单的sass文件，你可能命名它像 _partial.scss。下划线让sass知道这个文件仅仅是一个局部模块，并他应该被生成放入一个css文件。sass局部模块和@import指令一起被使用。

### 导入
css有一个导入参数可以让你拆分css成更小、更易维护的部分。唯一的缺陷是每次在css中使用@import，它会创建一个http请求。sass建立于上层当前的css@import，但需要一个http请求，sass将拿你想要导入、结合的文件给你想要导入到的文件，这样你可以提供一个简单的css文件给web浏览器了。
我们举例你有几个sass文件， _reset.scss 和 base.scss。我们想要导入_reset.scss到base.scss中。注意我们将用 @import ‘reset’; 在 base.scss 文件中。当你导入一个文件不需要包含文件扩展名.scss, sass很聪明并将补齐。当你生成css时你将会得到。

### 混入
css里的一些东西写起来很乏味，特别是css3和许多库的前缀。混入让你可以做那些你想要在整个站点重用的css声明组。你甚至可以传入变量来让你的混入更加灵活。一个好的混入应用是针对库前缀。这里有个border-radius的例子：
用@mixin命令来新建一个混入并给他命名。我们已经命名我们的混入border-radius。我们也会使用变量$radius在括号内，这样我们可以传入随意一个半径。创建混入之后，你可以继续使用它作为一个css声明，以@include开头跟上混入的名字。当你的css生成时会像这样：

### 扩展／继承
这是sass最有用的特征之一。使用@extend让你共用一组css属性从一个选择器到另一个。它会保持你的sass很清爽。在例子中，我们将会创建一系列简单的错误、警告、成功信息。
（markdown没有显示出demo）上列代码允许你带入css属性到.message并应用他们于.success，.error，.warning。奇迹发生了随着css的生成，而且帮你避免在html元素上去写多样的class名称。


### 运算
在css里做算术是很有用的。sass有少数的数学运算标准像：＋ ，－，＊，/，%。在例子中，我们将会做一些简单的算术去计算aside和article的宽度。
我们创建了一个非常简单的流体格，基于960px。在sass中的运算让我们可以做一些像：带入像素值，将他们转化成百分比而省去了很多的麻烦。生成好的css如下：


#### PS
文中的demo例子在markdown中都没有显示出来
