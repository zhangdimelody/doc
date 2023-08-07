https://blog.csdn.net/qq_34998786/article/details/117138142

#### npm

### `npm5` 版本下 `install` 规则

`npm` 并不是一开始就是按照现有这种规则制定的。

**`5.0.x` 版本**：

不管 `package.json` 中依赖是否有更新，`npm install` 都会根据 `package-lock.json` 下载。针对这种安装策略，有人提出了这个 issue[6] ，然后就演变成了 `5.1.0` 版本后的规则。

**`5.1.0` 版本后**：

当 `package.json` 中的依赖项有新版本时，`npm install` 会无视 `package-lock.json` 去下载新版本的依赖项并且更新 p`ackage-lock.json`。针对这种安装策略，又有人提出了一个 issue[7] 参考 `npm` 贡献者 `iarna` 的评论，得出 `5.4.2` 版本后的规则。

**`5.4.2` 版本后**：

如果只有一个 `package.json` 文件，运行 `npm install` 会根据它生成一个 `package-lock.json` 文件，这个文件相当于本次 `install` 的一个快照，它不仅记录了 `package.json` 指明的直接依赖的版本，也记录了间接依赖的版本。

如果 `package.json` 的 `semver-range version` 和 `package-lock.json` 中版本兼容(`package-lock.json` 版本在 `package.json` 指定的版本范围内)，即使此时 `package.json` 中有新的版本，执行 `npm install` 也还是会根据 `package-lock.json` 下载。

如果手动修改了 `package.json` 的 `version ranges`，且和 `package-lock.json`中版本不兼容，那么执行 `npm install` 时 `package-lock.json` 将会更新到兼容 `package.json` 的版本。

#### yarn

### yarn 的主要优化

`yarn` 的出现主要做了如下优化：

- **并行安装**：无论 `npm` 还是 `yarn` 在执行包的安装时，都会执行一系列任务。`npm` 是按照队列执行每个 `package`，也就是说必须要等到当前 `package` 安装完成之后，才能继续后面的安装。而 `yarn` 是同步执行所有任务，提高了性能。
- **离线模式**：如果之前已经安装过一个软件包，用 `yarn` 再次安装时之间从缓存中获取，就不用像 `npm` 那样再从网络下载了。
- **安装版本统一**：为了防止拉取到不同的版本，`yarn` 有一个锁定文件 (`lock file`) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，`yarn` 就会创建（或更新）`yarn.lock` 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。
- **更好的语义化**：`yarn` 改变了一些 `npm` 命令的名称，比如 `yarn add/remove`，比 `npm` 原本的 `install/uninstall` 要更清晰。



分别解决什么问题？



区别？



lock 功能？干什么用的？



运行时都干了些什么？运行原理？（生成依赖树）

## 安装依赖树流程

1. 执行工程自身 `preinstall`。当前 `npm` 工程如果定义了 `preinstall` 钩子此时会被执行。
2. 确定首层依赖。模块首先需要做的是确定工程中的首层依赖，也就是 `dependencies` 和 `devDependencies` 属性中直接指定的模块（假设此时没有添加 `npm install` 参数）。工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，`npm` 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。
3. 获取模块。获取模块是一个递归的过程，分为以下几步：

- 获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 `package.json`中往往是 `semantic version`（`semver`，语义化版本）。此时如果版本描述文件（`npm-shrinkwrap.json` 或 `package-lock.json`）中有该模块信息直接拿即可，如果没有则从仓库获取。如 `package.json` 中某个包的版本是 `^1.1.0`，`npm`就会去仓库中获取符合 `1.x.x` 形式的最新版本。
- 获取模块实体。上一步会获取到模块的压缩包地址（`resolved` 字段），`npm` 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。
- 查找该模块依赖，如果有依赖则回到第 `1` 步，如果没有则停止。

- 模块扁平化（`dedupe`）。上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 `A` 模块依赖于 `loadsh`，`B` 模块同样依赖于 `lodash`。在 `npm3` 以前会严格按照依赖树的结构进行安装，因此会造成模块冗余。`yarn` 和从 `npm5` 开始默认加入了一个 `dedupe` 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 `node-modules` 的第一层。当发现有重复模块时，则将其丢弃。这里需要对重复模块进行一个定义，它指的是模块名相同且 `semver` 兼容。每个 `semver` 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个兼容版本，而不必版本号完全一致，这可以使更多冗余模块在 `dedupe`过程中被去掉。
- 安装模块。这一步将会更新工程中的 `node_modules`，并执行模块中的生命周期函数（按照 `preinstall`、`install`、`postinstall` 的顺序）。
- 执行工程自身生命周期。当前 `npm` 工程如果定义了钩子此时会被执行（按照 `install`、`postinstall`、`prepublish`、`prepare` 的顺序）。

yarn 为什么快？



pnpm  有什么优势？为什么又有个这







