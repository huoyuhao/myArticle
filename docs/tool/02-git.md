---
meta:
  - name: description
    content: 前端git使用
  - name: keywords
    content: 前端git使用,JavaScript,前端,git,
---
# 前端git使用

## git常用命令

### 初始化

命令|含义
----|------
`git clone git://...git` |    检出仓库
`git init`     |            命令把这个目录变成Git可以管理的仓库
`git init [project-name]`   |  新建一个目录，将其初始化为Git代码库

### 分支

命令|含义
----|------
`git branch`   |    列出所有本地分支
`git branch -r`      |  列出所有远程分支
`git branch [branch-name]`   |新建一个分支，但依然停留在当前分支
`git branch -d [branch-name]`   |删除分支

### 切换分支

命令|含义
----|------
`git checkout -b [branch-name]`    |  新建一个分支，并切换到该分支
`git checkout [branch-name]`  |   切换到指定分支，并更新工作区
`git checkout -b [local-branch-name] origin/[origin-branch-name]`  |  从远程仓库里拉取一条本地不存在的分支

### 查看状态

命令|含义
----|------
`git status`    |  显示有变更的文件
`git diff [file-name]`  |  查看修改内容
`git difftool [file-name]`  |  实用工具查看修改内容

### 添加文件到暂存区

命令|含义
----|------
`git add [file1] [file2] ...`  |  添加指定文件到暂存区
`git add [dir]`      |  添加指定目录到暂存区，包括子目录
`git add .`              |  添加当前目录的所有文件到暂存区

### 提交

命令|含义
----|------
`git commit -m [message]`  |  提交暂存区到仓库区
`git rm [file-name]`              |       删除文件

### 拉取提交

命令|含义
----|------
`git pull`     |   拉取远程分支到本地
`git push --set-upstream origin [branch-name]`  |        推送本地分支到远程仓库
`git push origin  [local-branch-name]:[origin-branch-name]`            |        推送分支

### 合并分支

命令|含义
----|------
`git merge [branch-name]`  |     合并分支到当前分支

### 注意事项

+ 合并分支或者每天开始工作之前先拉取一下，将分支更新到最新
+ 切换分支之前请先清空修改文件（可以删除/提交）
+ 不要中文文件名，文件名只能是字母数字减号下划线

## git个性化配置

当我们使用git一段时间之后，想要使用一些git命令的简称，比如`st => status`，这时候我们学习如何进行个性化配置git命令。

首先找到`git`的默认配置文件，文件路径`C:\Users\Administrator*\.gitconfig`
发现代码如下

```js
[core]
  autocrlf = true
  excludesfile = XXX
[user]
  name = XXX
  email = XXX@XX.com
```

在下面添加如下代码

```js
[alias]
  st = status
  ci = commit
  co = checkout
  br = branch
  df = diff
  dft = difftool
  dfs = diff --staged
  dfts = difftool --staged
  mr = merge
  mrt = mergetool
  last = log -1 HEAD
  ls = log --oneline --graph --all --decorate
  rb = rebase -i
  cp = cherry-pick
[diff]
  tool = bc4
[difftool]
  prompt = true
[difftool "bc4"]
  cmd = \"D:/XXX/BCompare.exe\" "$(cygpath -w $LOCAL)" "$REMOTE"
[merge]
  tool = bc4
[mergetool]
  prompt = true
[mergetool "bc4"]
  #trustExitCode = true
  cmd = \"D:/XXX/BCompare.exe\" "$LOCAL" "$REMOTE" "$BASE" "$MERGED"
```

其中`alias`里面的内容都是`git`命令的缩写
`difftool`和`mergetool`是使用`BCompare`软件显示文件差异以及解决合并冲突
