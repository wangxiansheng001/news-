# news-
--localstrage  不能跨域，但是可以通过postMassage实现跨域的实现

浅谈postMessage跨域通信与localStorage实现跨域共享
我们可能有需要在多个域名之间共用同一个localStorage的需要

一、我们先测试不同域名之间的通信

1.有 child.html 如下，代码中 window.parent.postMessage(data,origin) 方法允许来自不同源的脚本采用异步方式进行通信，可以实现跨文本档、多窗口、跨域消息传递。接受两个参数：
data：要传递的数据，html5规范中提到该参数可以是JavaScript的任意基本类型或可复制的对象，然而并不是所有浏览器支持任意类型的参数，部分浏览器只能处理字符串参数，所以在传递参数时需要使用JSON.stringify()方法对对象参数序列化。
origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，只是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然也可以将参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

2.然后在 main.html 中引入 child.html，window.addEventListener('message', function(e) { dosomething....}, false);  用来监听iframe 中发过来的消息
 
3.这时我们就可以看到效果了，如下图，当我们点击包含在main.html 中的 child.html页面时，main.html中的FrameColor也跟着变了



 二、接下来我们实现跨域之间的localstorage共享 

　　1.解决思路：在A域和B域下引入C域，所有的读写都由C域来完成，本地数据存在C域下; 因此 A哉和B域的页面必定要引入C域的页面; 当然C域最好是主域，原因后面会提到(在localstorage 不方便的情况下使用cookie);

【A域】【B域】需要读写时，通过postMessage 向【C域】发送跨哉消息，
【C域】监听跨域消息，在接到批定的消息时进行读写操作，
【C域】接到跨域消息时，如果是写入删除可以不做什么，如果是读取，就要先读取本域本地数据通过postMessage向父页面发送消息,
【A 域 / B 域】在读取【C域】数据时就需要监听来自【C域】的跨域消息
　　

　　2.注意事项：

　　window.postMessage()方法，向【C域】发消息，应用iframe.contentWindow.postMessage() 这样iframe内的【C 域】才可以接到，

　　同理，【C域】向 【A 域B域】发消息时应用，window.parent.postMessage()，【A域、B域】的逻辑一定要在iframe 加载完成后进行。

 

　　3.代码：

　　【C域】页面如下：c.js

　　【A域】页面如下：我们再C中设置了 localStorage    a.js

上传A、C之后我们见到效果如上图

 

　　【B域】页面如下：我们读取A中设置的 localStorage  b.js

 
访问c打开console见到效果如下 



至此我们实现了跨域 localStorage 的读取和删除。
