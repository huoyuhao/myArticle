---
meta:
  - name: description
    content: 前端git使用
  - name: keywords
    content: 前端git使用,JavaScript,前端,git,
---
# 前端git使用

## 1. git常用命令

### 1.1 初始化

命令|含义
----|------
`git clone git://...git newName`  |    检出仓库 重命名为newName
`git init`     |            命令把这个目录变成Git可以管理的仓库
`git init [project-name]`   |  新建一个目录，将其初始化为Git代码库

### 1.2 分支

命令|含义
----|------
`git branch`   |    列出所有本地分支
`git branch -r`      |  列出所有远程分支
`git branch [branch-name]`   |新建一个分支，但依然停留在当前分支
`git branch -d [branch-name]`   |删除分支
`git push origin --delete [branch-name]` | 删除远程分支
`git push origin [local-branch-name]:[origin-branch-name]` | 新建的本地分支push到远程服务器
`git push [remote] --force` | 强行推送当前分支到远程仓库，即使有冲突
`git push [remote] --all` | 推送所有分支到远程仓库

### 1.3 切换分支

命令|含义
----|------
`git checkout -b [branch-name]`    |  新建一个分支，并切换到该分支
`git checkout [branch-name]`  |   切换到指定分支，并更新工作区
`git checkout -b [local-branch-name] origin/[origin-branch-name]`  |  从远程仓库里拉取一条本地不存在的分支
`git checkout .`  |  恢复暂存区的所有文件到工作区

### 1.4 查看状态

命令|含义
----|------
`git status`    |  显示有变更的文件
`git diff [file-name]`  |  查看修改内容
`git difftool [file-name]`  |  实用工具查看修改内容

### 1.5 添加文件到暂存区

命令|含义
----|------
`git add [file1] [file2] ...`  |  添加指定文件到暂存区
`git add [dir]`      |  添加指定目录到暂存区，包括子目录
`git add .`              |  添加 **当前目录** 的所有文件到暂存区
`git add -A .`              |  将 **项目所有** 的已跟踪的文件的修改与删除和新增的未跟踪的文件都添加到暂存区

### 1.6 提交

命令|含义
----|------
`git commit -m [message]`  |  提交暂存区到仓库区
`git rm [file-name]`              |       删除文件

### 1.7 拉取提交

命令|含义
----|------
`git fetch [remote]`     |   下载远程仓库的所有变动
`git fetch`    |   git fetch 获取线上最新版信息记录，不合并
`git pull`     |   拉取远程分支到本地
`git push --set-upstream origin [branch-name]`  |        推送本地分支到远程仓库

+ git pull是相当于从远程仓库获取最新版本，然后再与本地分支merge，即git pull = git fetch + git merge
+ 相比起来，git fetch 更安全也更符合实际要求，在 merge 前，我们可以查看更新情况，根据实际情况再决定是否合并

### 1.8 清空暂存

命令|含义
----|------
`git checkout .`  |    清空暂存区已修改和删除文件，新建文件无法清空
`git clean -d -f` |    删除当前目录下没有被跟踪的文件和文件夹（即新建文件/夹）
`git stash`       |    把暂存区和工作区的改动保存起来
`git stash save 'message...'` |    把暂存区和工作区的改动保存起来
`git stash list`  |    显示保存进度的列表
`git stash pop [–index] [stash_id]` |    取出储藏中最后存入的工作状态进行恢复，会删除储藏
`git stash pop stash@{1}` |   恢复指定的进度到工作区
`git stash show -p` |   查看堆栈中最新保存的stash和当前目录的差异
`git stash show stash@{1} -p` |   查看堆栈中指定的stash和当前目录的差异
`git stash apply [–index] [stash_id]` |   同git stash pop，不会删除储藏
`git stash clear` |   删除所有存储的进度

### 1.9 合并分支

命令|含义
----|------
`git merge [branch-name]`  |     合并分支到当前分支

### 1.10 配置config

'设置提交代码时的用户信息命令如下：

命令|含义
----|------
`git config [--global] user.name "[name]"`  | 设置提交用户名
`git config [--global] user.email "[email address]"`  | 设置提交用户邮箱

### 1.11 注意事项

+ 合并分支或者每天开始工作之前先拉取一下，将分支更新到最新
+ 切换分支之前请先清空修改文件（可以删除/提交）
+ 不要中文文件名，文件名只能是字母数字减号下划线

## 2. git合作开发命令

命令|含义
----|------
`git remote add upstream https://.....` | 设置upstream
`git remote -v` | 查看
`git fetch upstream` | 拉取
`git rebase upstream/master` | 拉取远程master覆盖本地

## 3. git个性化配置

当我们使用git一段时间之后，想要使用一些git命令的简称，比如`st => status`，这时候我们学习如何进行个性化配置git命令。

首先找到`git`的默认配置文件

1. window文件路径`C:\Users\Administrator*\.gitconfig`
2. linux/mac文件路径`~/.gitconfig`

修改代码如下：

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
