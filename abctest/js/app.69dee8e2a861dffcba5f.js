webpackJsonp([1],{"+hbV":function(t,e,n){"use strict";var a=n("lbHh");n.n(a);e.a={mounted:function(){this.axios.get("/initSession4Test/47",{params:{}}).then(function(t){}).catch(function(t){console.log(t)})}}},0:function(t,e){},"0XNt":function(t,e){},"1E2i":function(t,e,n){"use strict";function a(t){n("XTPq")}var s=n("tPOS"),i=n("hJ2R"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,"data-v-7381a92b",null);e.a=c.exports},"4T6w":function(t,e){},"6b4L":function(t,e,n){"use strict";function a(t){n("cwZB")}var s=n("VhZm"),i=n("qDqf"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,null,null);c.exports},"8hXn":function(t,e,n){"use strict";function a(t){n("SrBU")}var s=n("+hbV"),i=n("rCvo"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,"data-v-9736d4b0",null);c.exports},AsA4:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"service"},t._l(10,function(t){return n("mt-cell",{attrs:{title:"服务"}})}))},s=[],i={render:a,staticRenderFns:s};e.a=i},Ceer:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"market"},t._l(10,function(t){return n("mt-cell",{attrs:{title:"集市"}})}))},s=[],i={render:a,staticRenderFns:s};e.a=i},FK94:function(t,e){},FzVX:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bindhouse"},[n("ul",[n("li",[t._v(t._s(t.data.sect_name)+" "+t._s(t.data.city_name))]),t._v(" "),n("li",[n("span",{staticClass:"fl"},[t._v(t._s(t.data.cell_addr))]),t._v(" "),n("span",{staticClass:"fr"},[t._v(t._s(t.data.cnst_area)+"平米")])]),t._v(" "),n("li",[t._v("\n\t\t\t"+t._s(t.data.mng_cell_id)+"(户号)\n\t\t")])]),t._v(" "),n("mt-button",{staticClass:"bottomBtn",attrs:{size:"large"},nativeOn:{click:function(e){t.addHouse(e)}}},[t._v("绑定房子")])],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},GHzg:function(t,e,n){"use strict";e.a={methods:{}}},JUjs:function(t,e,n){"use strict";var a=n("fxnj"),s=(n.n(a),n("Au9i")),i=(n.n(s),void 0);e.a={created:function(){i=this;i.receiveData.postData(i,"/getUrlJsSign",{url:"https://test.e-shequ.com/weixin/wuye/myhouse.html"})},data:function(){return{number:""}},methods:{show:function(){alert("调js-sdk")},submit:function(){/^\d{18}$/.test(this.number)?this.$router.push("/bindHouse/"+this.number):s.MessageBox.alert("请输入正确账单号","www.e-shequ.com")}}}},LtGa:function(t,e,n){"use strict";e.a={methods:{}}},M93x:function(t,e,n){"use strict";function a(t){n("xSPO")}var s=n("xJD8"),i=n("Peg7"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,null,null);e.a=c.exports},"NF/U":function(t,e,n){"use strict";e.a={methods:{}}},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("//Fk"),s=n.n(a),i=n("7+uW"),r=n("M93x"),o=n("YaEn"),c=n("Au9i"),u=n.n(c),l=n("d8/S"),d=(n.n(l),n("mw3O")),f=n.n(d),m=n("mtWM"),v=n.n(m),h=n("Rf8U"),_=n.n(h),p=n("i9wj"),g=(n.n(p),n("TM+h")),b=(n.n(g),n("lbHh")),x=n.n(b),w=n("w0m6");i.default.prototype.receiveData=w.a,i.default.use(u.a);var C=v.a.create({transformRequest:[function(t){return t=f.a.stringify(t)}],headers:{"Content-Type":"application/json",Accept:"*/*"},baseURL:"https://test.e-shequ.com/wechat/hexie/wechat",withCredentials:!0,transformResponse:[function(t){return t}]});C.interceptors.request.use(function(t){return x.a.get("session")&&(t.headers.Cookie=""+x.a.get("Cookie")),t},function(t){return s.a.reject(t)}),i.default.use(_.a,C),i.default.config.productionTip=!1,i.default.config.debug=!0,new i.default({el:"#app",router:o.a,template:"<App/>",components:{App:r.a}})},Peg7:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},Rpxd:function(t,e){},SrBU:function(t,e){},"TM+h":function(t,e){function n(t,e){var n=document.getElementsByTagName("html")[0],a=document.body.clientWidth||document.documentElement.clientWidth;n.style.fontSize=a/t*e+"px"}window.onload=function(){n(750,100)},window.onresize=function(){n(750,100)}},VhZm:function(t,e,n){"use strict";e.a={methods:{}}},W6Iq:function(t,e){},XTPq:function(t,e){},YPwu:function(t,e){},YaEn:function(t,e,n){"use strict";var a=n("7+uW"),s=n("/ocq"),i=(n("8hXn"),n("Zjg2")),r=(n("idHs"),n("sGZ3"),n("6b4L"),n("1E2i")),o=n("YuzB"),c=n("rKr7"),u=n("caN2");a.default.use(s.a),e.a=new s.a({routes:[{path:"/",name:"Myhouse",component:r.a},{path:"/my",name:"My",component:i.a},{path:"/myhouse",name:"Myhouse",component:r.a},{path:"/addHouse",name:"AddHouse",component:o.a},{path:"/bindHouse/:number",name:"BindHouse",component:c.a},{path:"/pay",name:"Pay",component:u.a}]})},YuzB:function(t,e,n){"use strict";function a(t){n("4T6w")}var s=n("JUjs"),i=n("foRK"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,"data-v-1759fe58",null);e.a=c.exports},Zjg2:function(t,e,n){"use strict";function a(t){n("FK94")}var s=n("NF/U"),i=n("iZ8k"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,null,null);e.a=c.exports},caN2:function(t,e,n){"use strict";function a(t){n("Rpxd")}var s=n("dPCN"),i=n("vcqR"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,"data-v-6fcd9ed2",null);e.a=c.exports},cwZB:function(t,e){},"d8/S":function(t,e){},dPCN:function(t,e,n){"use strict";e.a={data:function(){return{selected:"1"}},methods:{}}},foRK:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"lite-divider",staticStyle:{"margin-top":"35px","margin-left":"15px","margin-right":"15px"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.number,expression:"number"}],staticClass:"hidden-input",staticStyle:{"text-align":"left"},attrs:{placeholder:"输入账单编号快速缴费"},domProps:{value:t.number},on:{input:function(e){e.target.composing||(t.number=e.target.value)}}}),t._v(" "),n("div",{staticClass:"scan-icon",on:{click:t.show}})]),t._v(" "),n("mt-button",{staticClass:"subBtn",attrs:{size:"large"},nativeOn:{click:function(e){t.submit(e)}}},[t._v("提交")])],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},hJ2R:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"myhouse"},[0==t.dataArr.length?n("div",{staticClass:"nohouse"}):n("ul",{staticClass:"house-list"},t._l(t.dataArr,function(e,a){return n("li",[n("p",[n("span",{staticClass:"fl"},[t._v(t._s(e.sect_name)+" "+t._s(e.city_name))]),t._v(" "),n("i",{staticClass:"fr del-icon",on:{click:function(n){t.del(e,a)}}})]),t._v(" "),n("p",[n("span",{staticClass:"fl"},[t._v(t._s(e.cell_addr))]),t._v(" "),n("span",{staticClass:"fr"},[t._v(t._s(e.cnst_area)+"平米")])]),t._v(" "),n("p",[t._v(t._s(e.ver_no)+"（户号）")])])})),t._v(" "),n("mt-button",{staticClass:"bottomBtn",attrs:{size:"large"},nativeOn:{click:function(e){t.addHouse(e)}}},[t._v("添加房子")])],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},i9wj:function(t,e){},iZ8k:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my"},[n("mt-cell",{attrs:{title:"缴费",value:"缴费","is-link":"",to:"/pay"}}),t._v(" "),n("mt-cell",{attrs:{title:"我的维修单",value:"查看维修单","is-link":"",to:"#"}}),t._v(" "),n("mt-cell",{attrs:{title:"我的消息",value:"查看消息","is-link":"",to:"#"}}),t._v(" "),n("mt-cell",{attrs:{title:"我的发布",value:"查看发布","is-link":"",to:"#"}}),t._v(" "),n("mt-cell",{attrs:{title:"我是业主",value:"绑定房屋","is-link":"",to:"/myhouse"}}),t._v(" "),n("mt-cell",{attrs:{title:"常用地址",value:"收货地址","is-link":"",to:"#"}}),t._v(" "),n("mt-cell",{attrs:{title:"关注我们","is-link":"",to:"#"}}),t._v(" "),n("mt-cell",{attrs:{title:"客服电话",value:"021-50876295"}})],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},idHs:function(t,e,n){"use strict";function a(t){n("YPwu")}var s=n("GHzg"),i=n("AsA4"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,null,null);c.exports},qDqf:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"community"},t._l(10,function(t){return n("mt-cell",{attrs:{title:"社区"}})}))},s=[],i={render:a,staticRenderFns:s};e.a=i},rCvo:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index"},[n("router-view",{staticClass:"contetn"}),t._v(" "),n("div",{staticClass:"foot"},[n("router-link",{staticClass:"foot-item",attrs:{to:"/service"}},[t._v("服务")]),t._v(" "),n("router-link",{staticClass:"foot-item",attrs:{to:"/market"}},[t._v("集市")]),t._v(" "),n("router-link",{staticClass:"foot-item",attrs:{to:"/community"}},[t._v("社区")]),t._v(" "),n("router-link",{staticClass:"foot-item",attrs:{to:"/my"}},[t._v("我的")])],1)],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},rKr7:function(t,e,n){"use strict";function a(t){n("W6Iq")}var s=n("zu+F"),i=n("FzVX"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,"data-v-1e89cc4c",null);e.a=c.exports},sGZ3:function(t,e,n){"use strict";function a(t){n("0XNt")}var s=n("LtGa"),i=n("Ceer"),r=n("VU/8"),o=a,c=r(s.a,i.a,!1,o,null,null);c.exports},tPOS:function(t,e,n){"use strict";var a=n("Au9i"),s=(n.n(a),void 0);e.a={created:function(){s=this},mounted:function(){s.showList()},data:function(){return{dataArr:[]}},methods:{showList:function(){s.receiveData.getData(s,"/hexiehouses","data",function(){console.log(s.data.result),s.data.result instanceof Array?s.dataArr=s.data.result:s.data.result?s.dataArr.push(s.data.result):s.dataArr=[]})},addHouse:function(){this.$router.push("/addHouse")},del:function(t,e){a.MessageBox.confirm("确定要删除吗?").then(function(n){s.dataArr.splice(e,1);var i="/hexiehouse/delete/"+t.mng_cell_id;s.receiveData.getData(s,i,"delData",function(){Object(a.Toast)({message:"删除成功",position:"top",duration:1e3})})}).catch(function(t){})}}}},vcqR:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("mt-navbar",{model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[n("mt-tab-item",{attrs:{id:"1"}},[t._v("选项一")]),t._v(" "),n("mt-tab-item",{attrs:{id:"2"}},[t._v("选项二")]),t._v(" "),n("mt-tab-item",{attrs:{id:"3"}},[t._v("选项三")])],1),t._v(" "),n("mt-tab-container",{model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[n("mt-tab-container-item",{attrs:{id:"1"}},t._l(10,function(t){return n("mt-cell",{attrs:{title:"内容 "+t}})})),t._v(" "),n("mt-tab-container-item",{attrs:{id:"2"}},t._l(4,function(t){return n("mt-cell",{attrs:{title:"测试 "+t}})})),t._v(" "),n("mt-tab-container-item",{attrs:{id:"3"}},t._l(6,function(t){return n("mt-cell",{attrs:{title:"选项 "+t}})}))],1)],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},w0m6:function(t,e,n){"use strict";var a=n("pFYg"),s=n.n(a),i=n("XWX1"),r=n.n(i),o=new r.a.Parser({explicitArray:!1,ignoreAttrs:!0}),c={getData:function(t,e,n,a){var s={};""!=n&&"string"==typeof n||(n="data"),t.axios.get(e,{params:s}).then(function(e){var s=e.data;o.parseString(s,function(e,a){t[n]=a.BaseResult}),"function"==typeof a&&a()}).catch(function(t){console.log(t)})},postData:function(t,e,n){void 0!==n&&"object"==(void 0===n?"undefined":s()(n))||(n={}),t.axios.post(e,n).then(function(t){console.log(t)}).catch(function(t){console.log("fail",t)})}};e.a=c},xJD8:function(t,e,n){"use strict";e.a={name:"app"}},xSPO:function(t,e){},"zu+F":function(t,e,n){"use strict";var a=n("Au9i"),s=(n.n(a),void 0);e.a={created:function(){s=this},data:function(){return{data:{name:""},axiosParams:{number:this.$route.params.number}}},mounted:function(){var t="/hexiehouse/"+this.axiosParams.number;this.receiveData.getData(s,t,"response",function(){s.data=s.response.result})},methods:{addHouse:function(){var t="/addhexiehouse/"+this.axiosParams.number+"/"+this.data.mng_cell_id;s.receiveData.getData(s,t,"res",function(){0==s.res.errorCode?s.res.message?a.MessageBox.alert(""+s.res.message,"www.e-she.com").then(function(t){s.$router.push("/myhouse")}):a.MessageBox.alert("添加房屋成功","www.e-she.com").then(function(t){s.$router.push("/myhouse")}):a.MessageBox.alert(""+s.res.message,"www.e-she.com").then(function(t){s.$router.push("/addHouse")})})}}}}},["NHnr"]);
//# sourceMappingURL=app.69dee8e2a861dffcba5f.js.map