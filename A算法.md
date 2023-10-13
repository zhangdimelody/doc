#### 1. 数组

#### 二分查找

* 有序数组：

  两个下标 low： 0 和 high ：length，

  **while** (lowIndex <= highIndex)

  如果大于中间值，移动low到 中间index+1；如果小于中间值，移动high到中间值-1

* 有序旋转数组：

  两个下标 low： 0 和 high ：length，

  **while** (lowIndex <= highIndex)

  如果中间值大于low，左边是有序的。如果target在区间： high=mid-1 否则 low=mid+1

  否则 右边是有序的；如果target在区间则 low=mid+1 否则 high=mid-1

有序数组中单独的数

```js
function singleNonDuplicate(nums) {
     let i = 0, j = nums.length - 1;// 数组长度必为奇数，所以一前一后两个元素下标为偶数
     while(i < j){
         let mid = i + ((j - i) >> 1);
       	 let mid = Math.floor((i+j) / 2)
         if(mid % 2 === 1){
             // mid为奇数则-1变为偶数 则mid现在必为“边缘” 不必再分四种情况来讨论
             // 这就是仅对偶数索引进行二分搜索！
             mid--;
         }
         if(nums[mid + 1] === nums[mid]){
             // 去除mid那一对数之后，左侧数必为偶数，右侧数必为奇数，继续去紧挨着那对数的右边1个找
             i = mid + 2;
         }
         else{
             // 去除mid那一对数之后，左侧数为奇数，右侧数必为偶数，继续去紧挨着那对数的左边1个找
             j = mid;// 此时mid已经在原基础上左移一位了 所以j直接放在mid这个位置即可
         }
     }
     return nums[i];
 };
```









### a. 排序（快、冒泡、堆排序）

### b. 二分查找（有序）（两个有序数组第k大的值）

### c. dp动态规划（0，1背包）（最大公共子串）

--------------------------------

数组，字符串，树

关键词：排序、搜索 【二分搜索】





### 2023.8.8 实现斐波那契的第N个值（从0开始），要求时间复杂度为O(n)

```js
function fib(n) {
    if (n == 0 || n === 1) return 1;
    return fib(n - 1) + fib(n - 2);
};

console.log(fib(3)); // 5
console.log(fib(5)); // 8

//  O(2^n) 
```

存在问题：复杂度为 **O(2^n)** ，它不为**O(n)**，然后还有会重复计算，比如计算n=3时，会计算`fib(1) + fib(2)`，再次计算fib(4)时，会先算`fib(3) = fib(1) + fib(2)`，然后再计算`fib(4) = fib(1) + fib(2) + fib(3)`，在这里，fib(1)和fib(2)重复计算了两次，对于性能损耗极大。

##### **动态规划**

涉及动态规划其中最关键的特征——**重叠子问题**

```js
function fibonacci(n) { 
    if (n <= 1) return n;
    let fib = [0, 1]; // 保存斐波那契数列的结果 
    for (let i = 2; i <= n; i++) { 
        fib[i] = fib[i - 1] + fib[i - 2]; // 计算第i个斐波那契数 
    } 
    return fib[n]; 
}

```

### 动态规划的常用状态转移方程

状态转移方程示例：

1. **斐波那契数列**（Fibonacci Sequence）：
   - `dp[i] = dp[i-1] + dp[i-2]`，其中 `dp[i]` 表示第 `i` 个斐波那契数。
2. **爬楼梯问题**（Climbing Stairs）：
   - `dp[i] = dp[i-1] + dp[i-2]`，其中 `dp[i]` 表示爬到第 `i` 级楼梯的方法数。
3. **背包问题**（Knapsack Problem）：
   - `dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])`，其中 `dp[i][j]` 表示在前 `i` 个物品中选择总重量不超过 `j` 的最大价值，`weight[i]` 表示第 `i` 个物品的重量，`value[i]` 表示第 `i` 个物品的价值。
4. **最长递增子序列**（Longest Increasing Subsequence）：
   - `dp[i] = max(dp[j] + 1, dp[i])`，其中 `dp[i]` 表示以第 `i` 个元素结尾的最长递增子序列的长度，`j` 为 `0` 到 `i-1` 的索引，且 `nums[i] > nums[j]`。
5. **最大子数组和**（Maximum Subarray Sum）：
   - `dp[i] = max(nums[i], nums[i] + dp[i-1])`，其中 `dp[i]` 表示以第 `i` 个元素结尾的最大子数组和。
6. **最长公共子序列**（Longest Common Subsequence）：
   - 如果 `str1[i]` 等于 `str2[j]`，则 `dp[i][j] = dp[i-1][j-1] + 1`；
   - 否则，`dp[i][j] = max(dp[i-1][j], dp[i][j-1])`，其中 `dp[i][j]` 表示 `str1` 的前 `i` 个字符和 `str2` 的前 `j` 个字符的最长公共子序列的长度。
7. **编辑距离**（Edit Distance）：
   - 如果 `word1[i]` 等于 `word2[j]`，则 `dp[i][j] = dp[i-1][j-1]`；
   - 否则，`dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`，其中 `dp[i][j]` 表示将 `word1` 的前 `i` 个字符转换为 `word2` 的前 `j` 个字符所需的最少操作次数。
8. **打家劫舍**（House Robber）：
   - `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`，其中 `dp[i]` 表示前 `i` 个房屋能够获得的最大金额，`nums[i]` 表示第 `i` 个房屋中的金额。
9. **最大正方形**（Maximal Square）：
   - 如果 `matrix[i][j]` 等于 1，则 `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`；
   - 否则，`dp[i][j] = 0`，其中 `dp[i][j]` 表示以 `matrix[i][j]` 为右下角的最大正方形的边长。

