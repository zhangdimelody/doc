// [
//     {
//         "id":"1",
//         "childrens":[{
//             "id":"12",
//             "childrens":[]
//           },{
//             "id":"13",
//             "childrens":[{
//                "id":"123",
//                "childrens":[]
//             }]
//           }]
//     },
//     {
//         "id":"2",
//         "childrens":[]
//     }
// ]
let countArr = []
let count = 0
function getDeep(arr){
  for(let i=0;i<arr.length;i++){
    let item = arr[i].childrens
    // if(arr[i].childrens){
    //     count++
    //     getDeep(arr[i].childrens)
    // }
    while(item&&item.length){
      getDeep(item)
      count++
    }
    countArr.push(count)
  }
  return Math.max.prototype.call(countArr)
}

// let count = 1;
// function getDeep(arr = []){

//   for(let i=0;i<arr.length;i++){
//     if(arr[i].childrens){
//       count++
//       getDeep(arr[i].childrens)
//     }
//   }
//   return count
// }

// arr.reduce()