import{_ as w,u as b,r as v,a,o as x,c as y,d as e,w as t,l as _,E as B,j as C,b as N,e as T}from"./index.69c4e878.js";import V from"./ShengDanOldMan.bb689137.js";import{g as p}from"./miaoshagoods.8d9763ac.js";import"./request.05f40aea.js";import"./js.cookie.8c15f128.js";const k={components:{ShengDanOldMan:V},setup(){const i=b(),n=v({list:[]});function d(){p.goodsList().then(s=>{n.list=s.data.goodsVos,console.log(n.list)})}function l(s){p.getdetailByGoosId(s).then(r=>{var o=r.data.remainSeconds;r.code==201?o==-1?_.alert("\u79D2\u6740\u5DF2\u7ECF\u7ED3\u675F"):_.alert("\u79D2\u6740\u8FD8\u672A\u5F00\u59CB,\u5269\u4F59\u65F6\u95F4\u4E3A\uFF1A"+o):i.push({path:"/to_detail",query:{id:s}}).then(()=>{B.success("\u79D2\u6740\u6B63\u5728\u8FDB\u884C\uFF0C\u8BF7\u6293\u7D27\u65F6\u95F4\u62A2\u8D2D"),window.location.reload()})})}return d(),{query:n,refTo:l}}},E=["src"],L=T("\u8BE6\u60C5");function q(i,n,d,l,s,r){const o=a("el-table-column"),u=a("el-button"),m=a("el-table"),h=a("e-card"),f=a("el-col"),g=a("el-row");return x(),y("div",null,[e(g,{gutter:20},{default:t(()=>[e(f,{span:"24",xs:"10"},{default:t(()=>[e(h,{shadow:"hover",class:"magrinTop"},{default:t(()=>[e(m,{data:l.query.list,height:"700px",style:{width:"500px"},class:"magrinTop"},{default:t(()=>[C("",!0),e(o,{prop:"goodsImg",label:"\u5546\u54C1\u56FE\u7247",width:"100"},{default:t(c=>[N("img",{src:c.row.goodsImg,width:"100",height:"80"},null,8,E)]),_:1}),e(o,{prop:"goodsName",label:"\u5546\u54C1\u540D",width:"100"}),e(o,{prop:"goodsPrice",label:"\u539F\u4EF7",width:"60"}),e(o,{prop:"miaoshaPrice",label:"\u79D2\u6740\u4EF7",width:"80"}),e(o,{width:"50"},{default:t(c=>[e(u,{type:"info",onClick:G=>l.refTo(c.row.id)},{default:t(()=>[L]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),_:1})]),_:1})]),_:1})])}var S=w(k,[["render",q]]);export{S as default};