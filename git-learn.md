## GIT
--------------------------

### 删除远程 dist 文件夹
1. git rm -r -n --cached  dist/\*      //-n：加上这个参数，执行命令时，是不会删除任何文件，而是展示此命令要删除的文件列表预览
2. git rm -r --cached  dist/\* 
3. git commit -m"移除src目录下所有文件的版本控制" 
4. git push origin master   //提交到远程服务器


