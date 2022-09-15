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









### 1

<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162944470.png" alt="image-20220816162944470" style="zoom:50%;" />

<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162957484.png" alt="image-20220816162957484" style="zoom:50%;" />

<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816163047691.png" alt="image-20220816163047691" style="zoom:50%;" />

### 2



<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162514329.png" alt="image-20220816162514329" style="zoom:50%;" />

<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162558655.png" alt="image-20220816162558655" style="zoom:50%;" />

<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162618469.png" alt="image-20220816162618469" style="zoom:50%;" />

### 3

<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816165859039.png" alt="image-20220816165859039" style="zoom:50%;" />

<img src="/Users/dizhang/Library/Application Support/typora-user-images/image-20220816165923284.png" alt="image-20220816165923284" style="zoom:50%;" />

