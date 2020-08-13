---
meta:
  - name: description
    content: 前端docker学习
  - name: keywords
    content: 前端docker学习,docker,前端,docker学习,docker教程
---
# 前端docker学习

## Docker介绍

**Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口**。它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样.

## Docker 用途

+ 提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
+ 提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容
+ 组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构

## 核心概念

核心概念：镜像、容器与仓库

Docker 主要包含三个基本概念，分别是镜像、容器和仓库，理解了这三个概念，就理解了 Docker 的整个生命周期。

+ 镜像：Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

+ 容器：容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的命名空间容器可以被。创建、启动、停止、删除和暂停等等，说到镜像与容器之间的关系，可以类比面向对象程序设计中的类和实例。

+ 仓库：镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。一个 Docker Registry 中可以包含多个仓库；每个仓库可以包含多个标签；每个标签对应一个镜像，其中标签可以理解为镜像的版本号。

## Docker安装

[mac](https://docs.docker.com/docker-for-mac/install/)

[windows](https://docs.docker.com/docker-for-windows/install/)

[centos](https://docs.docker.com/engine/install/centos/)

安装完成后，运行下面的命令，验证是否安装成功。`docker version`

## Docker命令

```conf
docker info # 查看当前 Docker 运行环境
docker search # 搜索仓库中的镜像
docker history # 查看镜像历史Layer层级信息
docker stats # 查看容器资源占用状态
docker logs # 查看容器stdout日志，加上 -f 持续输出
docker cp # 在容器和本地文件系统中拷贝文件

docker images # 查看本地镜像列表
docker rmi 镜像id # 删除镜像，-f表示强制

docker ps # 查看我们正在运行的容器
docker ps -a # 查看所有的容器
docker rm -f 容器id # 删除容器，-f表示强制
docker exec # 对容器执行命令，比如最常用的 docker exec -ti 容器id bash 进入容器终端 exit退出
docker start/restart/stop/pause/unpause 容器id # 对容器进行启动、重启、停止、暂停和取消暂停操作

docker login/logout # 登录/登出
docker pull # 从仓库拉取镜像
docker push # 推送镜像到仓库


```

## DockerFile语法

+ FROM 指令用于指定要构建的镜像的基础镜像。它通常是 Dockerfile 中的第一条指令。

+ RUN 指令用于在镜像中执行命令，这会创建新的镜像层。每个 RUN 指令创建一个新的镜像层。

+ COPY 指令用于将文件作为一个新的层添加到镜像中。通常使用 COPY 指令将应用代码赋值到镜像中。

+ EXPOSE 指令用于记录应用所使用的网络端口。

+ ENTRYPOINT 指令用于指定镜像以容器方式启动后默认运行的程序。

其他的 Dockerfile 指令还有 LABEL、ENV、ONBUILD、HEALTHCHECK、CMD 等

```conf
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
```

+ FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。
+ COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。
+ WORKDIR /app：指定接下来的工作路径为/app。
+ RUN npm install：在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
+ EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。

```conf
docker build -t "liam:test" ./
# 根据当前目录的dockerfile文件创建镜像liam，标签为test
docker run -d -p 8081:8080 -v /data/liam:/data/www --name=sniper-test liam:test
# docker run sniper:test 根据镜像创建容器
# -d 后台运行容器，并返回容器ID
# -p 8081:8080 指定端口映射，格式为：主机(宿主)端口:容器端口，即主机8081端口映射到docker容器内部端口8080
# -v /data/liam:/data/www 主机的目录 /data/liam 映射到容器的 /data/www
# --name=sniper-test 为容器指定一个名称
```

## 参考文章

[C语言中文网 - docker教程](http://c.biancheng.net/docker/)

[阮一峰的网络日志 - docker入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

[菜鸟教程 - docker教程](https://www.runoob.com/docker/docker-tutorial.html)
