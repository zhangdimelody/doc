```js
// curry

function curry(fn) {

  return function curried(...arg) {

​    if (arg.length >= fn.length) {

​      return fn.apply(this, arg)

​    }

​    return function (...arg2) {

​      return curried.apply(this, arg.concat(arg2))

​    }

  };

}



// bind

// func.bind(obj)

function bind(obj) {

  const self = this;

  return function () {

​    return self.apply(obj, arguments)

  }

}

// quickSort

function quickSort(arr) {

  let pivot = Math.floor(arr.length / 2)

  let pivotNum = arr.splice(pivot, 1)[0]

  let left = []

  let right = []

  for (let i = 0; i < arr.length; i++) {

​    if (arr[i] < pivotNum) {

​      left.push(arr[i])

​    } else {

​      right.push(arr[i])

​    }

  }

  return quickSort(left).concat([pivot], quickSort(right))

}

// 冒泡

function bubbleSort(arr) {

  for (let i = 0; i < arr.length; i++) {

​    for (let j = i; i < arr.length - 1; i++) {

​      if (arr[i] > arr[j]) {

​        let temp = a[i]

​        a[i] = a[j]

​        a[j] = temp

​      }

​    }

  }

  return arr

}

// Promise all

Promise.all(promiseArr.map(item => { return item.catch(e => { console.log(e) }) }))

  .then(res => { res })



// new

let obj = new A('abc')

// ---

let obj = {}

obj.__proto__ = A.prototype

A.call(obj, 'abc')



// 最长子串





// promise

class Promise(){

  constructor(){

​    this.status = 'pending'

​    function resolve() {

​      this.status = 'fullfilled'

​    }

​    function reject() {

​      this.status = 'rejected'

​    }

  }

  then(onFullfilled, onRejected){

​    if (this.status === 'fullfilled') {

​      onFullfilled()

​    }

​    if (this.status === 'rejected') {

​      onRejected()

​    }

  }

}

// promise 节流

let quene = []

let max = 3

let total = 100

let loading = 0

let loaded = 0



function loadNext(){

  if(loading === max) return

  loading++

  let fn = quene.shift()

  fn().then(loaded)

}

function loaded(){

  loading--

  loaded++

  if(loading === 0) return

  loadNext()

}



for(let i=0; i<resources.length; i++){

  quene.push(()=>new Promise(()=>{

​    axios.get({

​      url: resources[i]

​    }).then()

  }))

  loadNext()

}



// class promise quene



class PromiseQuene {

  constructor(max=1){

​    this.max = max

​    this.quene = []

​    this.loading = 0

​    this.loaded = 0

​    this.total = 0

  }

  add(fn){

​    this.quene.push(fn)

​    this.total++

​    this.loadNext()

  }

  loadNext(){

​    if(this.loading===this.max) return

​    this.loading++

​    let fn = this.quene.shift()

​    fn().then(loaded).catch(loaded)

  }

  loaded(){

​    this.loading--

​    this.loaded++

​    if(this.loading===0) return

​    this.loadNext()

  }

}



let q = new PromiseQuene(3)

[1,2,3].forEach(item=>{

  q.add(()=>new Promise(

​    (resolve)=>{

​      setTimeout(()=>{

​        resolve()

​      }, 1000)

​    }

  ))

})





// async await 语法糖 generator

function* gen(){

  yield 1

  yield 2

  return 3

}



let g = gen()

g.next()

g.next()



function generatorFunc(fn){

  return function(){

​    return new Promise((resolve, reject)=>{

​      function go(key, arg){

​        let res

​        try {

​          res = fn[key](arg)

​        } catch (error) {

​          return reject(error)

​        }

​        let {value, done} = res

​        if(done){

​          resolve(value)

​        }else{

​          return Promise.resolve(value).then(res=>{

​            go('next', res)

​          }, error=>{

​            go('throw', error)

​          })

​        }

​      }

​      go("next")

​    })

  }

}

let f = generator(fn)

f.then(res=>console.log(res))





// script start

// async2 end

// Promise

// script end

// async1 end

// promise1

// promise2

// setTimeout
```

