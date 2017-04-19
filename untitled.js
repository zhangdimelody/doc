function a(){}
a.prototype.abc = "1"

function b(){
  this.abc = "2"
  return this;
}
b.prototype = new a();
b.prototype.test = function(){
  console.log("hahah")
  return this;
}
b.prototype.test2 = function(){
  console.log("链是调用");
  return this;
}

var ads = new b();
ads.test().test2();

