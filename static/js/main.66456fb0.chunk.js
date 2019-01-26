(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{211:function(e,t,a){},213:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(70),o=a.n(s),c=(a(85),a(6)),i=a.n(c),l=a(16),u=a(71),m=a(72),p=a(77),d=a(73),f=a(78),h=a(11),v=a(28),x=a.n(v),b=a(74),w=a.n(b),y=a(75),k=a.n(y),E=a(76);var g=function(e){var t=e.sensorId,a=e.sensorType,n=e.location,s=e.timestamp,o=e.sensorDataValues;return r.a.createElement("div",{className:k()("flex flex-col bg-white max-w-sm shadow-lg rounded-lg overflow-hidden mb-4 p-5",{"border-black border-4":93===t})},r.a.createElement("div",{className:"flex flex-row justify-between"},r.a.createElement("span",{className:"text-sm text-grey-dark uppercase"},r.a.createElement("span",{className:"font-bold"},"#".concat(t))," ",a),r.a.createElement("span",{className:"text-sm text-grey-dark"},Object(E.format)(s,"hh:mm a"))),r.a.createElement("div",{className:"text-sm text-grey-dark pt-2"},n),r.a.createElement("div",{className:"flex flex-row flex-wrap justify-between"},o.map(function(e){var t=e.value,a="";switch(e.value_type){case"P1":a="PM10";break;case"P2":a="PM2.5";break;case"humidity":a="hum";break;case"temperature":a="temp";break;case"hdop":a="hdop";break;case"ratioP2":a="ratioP2";break;case"durP2":a="durP2";break;case"ratioP1":a="ratioP1";break;case"durP1":a="durP1"}return r.a.createElement("div",{key:e.id,className:"w-48 py-3"},r.a.createElement("span",{className:"text-4xl"},Number.parseFloat(t).toFixed(2)),r.a.createElement("span",{className:"text-xl"},a))})))},j=(a(211),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={sensorData:[]},a.fetch=a.fetch.bind(Object(h.a)(Object(h.a)(a))),a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.fetch(),this.intervalId=setInterval(this.fetch,6e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalId)}},{key:"fetch",value:function(){var e=Object(l.a)(i.a.mark(function e(){var t,a,n,r,s=this;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.get("https://api.airquality.codeforafrica.org/v1/now/");case 3:return t=e.sent,a=t.data.map(function(){var e=Object(l.a)(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=t.id,e.t1=t.sensor.id,e.t2=t.sensor.sensor_type.name,e.next=5,s.nominatimGeocoder(t.location.latitude,t.location.longitude);case 5:return e.t3=e.sent,e.t4=t.timestamp,e.t5=t.sensordatavalues,e.abrupt("return",{id:e.t0,sensorId:e.t1,sensorType:e.t2,location:e.t3,timestamp:e.t4,sensorDataValues:e.t5});case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),e.next=7,Promise.all(a);case 7:(a=e.sent).sort(function(e,t){return new Date(t.timestamp).getTime()-new Date(e.timestamp).getTime()}),a.sort(function(e,t){return t.sensorId-e.sensorId}),n=[],r=[],a.forEach(function(e){r.includes(e.sensorId)||(n.push(e),r.push(e.sensorId))}),this.setState({sensorData:n}),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(0),console.error(e.t0),this.setState({sensorData:[]});case 20:case"end":return e.stop()}},e,this,[[0,16]])}));return function(){return e.apply(this,arguments)}}()},{key:"nominatimGeocoder",value:function(){var e=Object(l.a)(i.a.mark(function e(t,a){var n,r,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://nominatim.openstreetmap.org/reverse?format=jsonv2&limit=1&lat=".concat(t,"&lon=").concat(a),r=w()(this.fn),e.prev=2,e.next=5,r(n);case 5:return s=e.sent,e.abrupt("return",s?s.display_name:"");case 9:return e.prev=9,e.t0=e.catch(2),console.error("nominatimGeocoder error -> ",e.t0),e.abrupt("return","");case 13:case"end":return e.stop()}},e,this,[[2,9]])}));return function(t,a){return e.apply(this,arguments)}}()},{key:"fn",value:function(e){x.a.get(e).then(function(e){return e.data})}},{key:"render",value:function(){var e=this.state.sensorData;return r.a.createElement("div",{className:"container mx-auto px-4 py-4"},r.a.createElement("div",{className:"text-5xl text-center m-4"},r.a.createElement("span",null,e.length),r.a.createElement("span",{className:"text-2xl"},"sensors")),r.a.createElement("div",{className:"flex flex-row flex-wrap justify-between"},e.map(function(e){var t=e.id,a=e.sensorId,n=e.sensorType,s=e.location,o=e.timestamp,c=e.sensorDataValues;return r.a.createElement(g,{key:t,sensorId:a,sensorType:n,location:s,timestamp:o,sensorDataValues:c})})))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},79:function(e,t,a){e.exports=a(213)},85:function(e,t,a){}},[[79,2,1]]]);
//# sourceMappingURL=main.66456fb0.chunk.js.map