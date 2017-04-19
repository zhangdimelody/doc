// ()=>{
  var Event = {
    // 通过on接口监听事件eventName
    // 如果事件eventName被触发，则执行callback回调函数
    on: function(eventName, callback) {
      //你的代码
      if (!this.handles) {
        // this.handles={};
        Object.defineProperty(this, "handles", {
          value: {},
          enumerable: false,
          configurable: true,
          writable: true
        })
      }

      if (!this.handles[eventName]) {
        this.handles[eventName] = [];
      }
      this.handles[eventName].push(callback);
    },
    // 触发事件 eventName
    emit: function(eventName) {
      //你的代码
      if (this.handles[arguments[0]]) {
        for (var i = 0; i < this.handles[arguments[0]].length; i++) {
          this.handles[arguments[0]][i](arguments[1]);
        }
      }
    }
  };

  //<br>var Event = {
  // 通过on接口监听事件eventName
  // 如果事件eventName被触发，则执行callback回调函数
  // on: function(eventName, callback) {
  //     //你的代码
  //   },
  //   // 触发事件 eventName
  //   emit: function(eventName) {
  //     //你的代码
  //   }
  // };

// }