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
docker info # 查看当前 Docker 运行环境；
docker images # 查看本地镜像列表；
docker search # 搜索仓库中的镜像；
docker history # 查看镜像历史Layer层级信息;
docker stats # 查看容器资源占用状态；
docker top # 查看容器内运行的进程；
docker logs # 查看容器stdout日志，加上 -f 持续输出

docker ps # 查看我们正在运行的容器

# 查看所有的容器
docker ps -a


```

## DockerFile语法


