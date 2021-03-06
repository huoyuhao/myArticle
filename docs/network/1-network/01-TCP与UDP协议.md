---
meta:
  - name: description
    content: TCP与UDP协议
  - name: keywords
    content: TCP与UDP协议,TCP,UDP,
---
# TCP与UDP协议

## TCP、UDP 协议的区别

TCP协议全称是传输控制协议是一种面向连接的、可靠的、基于字节流的传输层通信协议，由 IETF 的RFC 793定义。TCP 是面向连接的、可靠的流协议。

UDP协议全称是用户数据报协议，在网络中它与TCP协议一样用于处理数据包，是一种无连接的协议。

| 区别 | TCP | UDP |
| --- | --- | --- |
| 是否面向连接 | 面向连接 | 无连接 |
| 传输可靠性 | 可靠 | 可靠 |
| 传输形式 | 字节流 | 数据报文段 |
| 传输效率 | 慢 | 快 |
| 所需资源 | 多 | 少 |
| 首部字节 | 20-60字节 | 8字节 |
| 适用场景 | 适用于要求可靠传输的应用，例如文件传输 | 适用于实时应用（IP电话、视频会议、直播等） |

### UDP 不能保证数据可靠性，但是传输速度却非常快

## TCP和UDP分别对应的常见应用层协议

### TCP对应的应用层协议

+ FTP：定义了文件传输协议，使用21端口。常说某某计算机开了FTP服务便是启动了文件传输服务。下载文件，上传主页，都要用到FTP服务。

+ Telnet：它是一种用于远程登陆的端口，用户可以以自己的身份远程连接到计算机上，通过这种端口可以提供一种基于DOS模式下的通信服务。如以前的BBS是-纯字符界面的，支持BBS的服务器将23端口打开，对外提供服务。

+ SMTP：定义了简单邮件传送协议，现在很多邮件服务器都用的是这个协议，用于发送邮件。如常见的免费邮件服务中用的就是这个邮件服务端口，所以在电子邮件设置-中常看到有这么SMTP端口设置这个栏，服务器开放的是25号端口。

+ POP3：它是和SMTP对应，POP3用于接收邮件。通常情况下，POP3协议所用的是110端口。也是说，只要你有相应的使用POP3协议的程序（例如Fo-xmail或Outlook），就可以不以Web方式登陆进邮箱界面，直接用邮件程序就可以收到邮件（如是163邮箱就没有必要先进入网易网站，再进入自己的邮-箱来收信）。

+ HTTP：从Web服务器传输超文本到本地浏览器的传送协议。

### UDP对应的应用层协议

+ DNS：用于域名解析服务，将域名地址转换为IP地址。DNS用的是53号端口。

+ SNMP：简单网络管理协议，使用161号端口，是用来管理网络设备的。由于网络设备很多，无连接的服务就体现出其优势。

+ TFTP(Trival File Transfer Protocal)：简单文件传输协议，该协议在熟知端口69上使用UDP服务。
