```js
// 二叉树
let tree1 = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 3
        },
        right: {
            val: 4
        }
    },
    right: {
        val: 5,
        left: {
            val: 6
        },
        right: {
            val: 7,
            left: {
                val: 8
            }
        }
    }
}
let res = []
function DeepTraverse(node) {
    if (node) {
      res.push(node.value) 
      if (node.left) 
        DeepTraverse(node.left) 
      if (node.right) 
        DeepTraverse(node.right) 
      return res
    }
}
function DeepTraversal(node) {
    if (node) {
      console.log(node.value) 
      node.left && DeepTraversal(node.left) 
      node.right && DeepTraversal(node.right)
    }
}
// 广度遍历
function BreadthTraversal(node) {
    let queue = []
    let res = []
    if (node) {
      queue.push(node) 
     	while (queue.length) {
            let current = queue.shift() 
            res.push(current.value) 
            current.left && queue.push(current.left) 
            current.right && queue.push(current.right)
        }
        return res
    }
}
// 左视角
function LeftTravesal(node) {
    let queue = [] let arr = []
    if (node) {
        queue.push(node) 
      	while (queue.length) {
            let len = queue.length 
            arr.push(queue[0].value) 
          	while (len--) {
                let current = queue.shift() 
                current.left && queue.push(current.left) 
              	current.right && queue.push(current.right)
            }
        }
        return arr
    }
}
/* function TreeNode(x) {
this.val = x;
this.left = null;
this.right = null;
} */
function FindPath(root, expectNumber) {
    var result = [];
    if (root === null) {
        return result;
    }
    dfsFind(root, expectNumber, [], 0, result);
    return result;
}
function dfsFind(root, expectNumber, path, currentSum, result) {
    currentSum += root.val;
    path.push(root.val);
    if (currentSum == expectNumber && root.left == null && root.right == null) {
        result.push(path.slice(0));
    }
    if (root.left != null) {
        dfsFind(root.left, expectNumber, path, currentSum, result);
    }
    if (root.right != null) {
        dfsFind(root.right, expectNumber, path, currentSum, result);
    }
    path.pop();
}
```

最大堆/最小堆