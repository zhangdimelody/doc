var pubsub = {};
var eventsData = {};
/*
  eventsData = {
    "eventName": [{
            "callback": fn
          }],
    "eventName2": [{
            "callback": fn2
          }]
  }
*/ 

(function(q){
  q.publish = function(eventname, argusss){
    if(!eventsData[eventname]) return;
    for(var i in eventsData[eventname]){
      eventsData[eventname][i]["callback"](argusss);
    }
  };
  q.subscribe = function(eventname, fn){
    if(!eventsData[eventname]){
      eventsData[eventname].push({
          "callback": fn
        });
    }
  };
  return q;
})(pubsub)



pubsub.subscribe("clickname", function(){
  var argsss = arguments || {};
  console.log(argsss);
});

pubsub.publish("clickname", {c: 3} );

