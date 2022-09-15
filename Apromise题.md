### promise

```js


// promise
class Promise(){
  constructor(){
    this.status = 'pending'
    function resolve() {
      this.status = 'fullfilled'
    }
    function reject() {
      this.status = 'rejected'
    }
  }
  then(onFullfilled, onRejected){
    if (this.status === 'fullfilled') {
      onFullfilled()
    }
    if (this.status === 'rejected') {
      onRejected()
    }
  }
}

// promise 节流

let quene = []
let max = 3
let total = 100
let loading = 0
let loaded = 0

function loadNext() {
  if (loading === max) return
  loading++
  let fn = quene.shift()
  fn().then(loaded)
}
function loaded() {
  loading--
  loaded++
  if (loading === 0) return
  loadNext()
}

for (let i = 0; i < resources.length; i++) {
  quene.push(() => new Promise(() => {
    axios.get({
      url: resources[i]
    }).then()
  }))
  loadNext()
}

// class promise quene
// let q = new PromiseQuene(3)
// [1, 2, 3].forEach(item => {
//   q.add(() => new Promise(
//     (resolve) => {
//       setTimeout(() => {
//         resolve()
//       }, 1000)
//     }
//   ))
// })

class PromiseQuene {
  constructor(max = 1) {
    this.max = max
    this.quene = []
    this.loading = 0
    this.loaded = 0
    this.total = 0
  }
  add(fn) {
    this.quene.push(fn)
    this.total++
    this.loadNext()
  }
  loadNext() {
    if (this.loading === this.max) return
    this.loading++
    let fn = this.quene.shift()
    fn().then(loaded).catch(loaded)
  }
  loaded() {
    this.loading--
    this.loaded++
    if (this.loading === 0) return
    this.loadNext()
  }
}



// promise all
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
    }
  })
}


// async await 语法糖 generator
function* gen() {
  yield 1
  yield 2
  return 3
}

let g = gen()
g.next()
g.next()

function generatorFunc(fn) {
  return function () {
    return new Promise((resolve, reject) => {
      function go(key, arg) {
        let res
        try {
          res = fn[key](arg)
        } catch (error) {
          return reject(error)
        }
        let { value, done } = res
        if (done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(res => {
            go('next', res)
          }, error => {
            go('throw', error)
          })
        }
      }
      go("next")
    })
  }
}
let f = generator(fn)
f.then(res => console.log(res))

```

