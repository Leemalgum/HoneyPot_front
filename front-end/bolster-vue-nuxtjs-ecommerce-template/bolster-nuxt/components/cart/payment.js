(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["payment"],{1175:function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"imp-container"},[t("h1",[e._v("아임포트 결제")]),t("a-form",{attrs:{form:e.form,"label-col":{span:6},"wrapper-col":{span:18},colon:!1,labelAlign:"left"},on:{submit:e.handleSubmit}},[t("a-form-item",{attrs:{label:"PG사"}},[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["pg",{initialValue:"html5_inicis"}],expression:"['pg', { initialValue: 'html5_inicis' }]"}],attrs:{size:"large"},on:{change:e.handlePg}},e._l(e.pgs,(function(a){return t("a-select-option",{key:a.value,attrs:{value:a.value}},[e._v(" "+e._s(a.label)+" ")])})),1)],1),t("a-form-item",{attrs:{label:"결제수단"}},[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["payMethod",{initialValue:"card"}],expression:"['payMethod', { initialValue: 'card' }]"}],attrs:{size:"large"},on:{change:e.handleMethod}},e._l(e.methods,(function(a){return t("a-select-option",{key:a.value,attrs:{value:a.value}},[e._v(" "+e._s(a.label)+" ")])})),1)],1),t("a-form-item",{staticClass:"imp-payment-escrow",attrs:{label:"에스크로 결제여부"}},[t("a-switch",{directives:[{name:"decorator",rawName:"v-decorator",value:["escrow",{valuePropName:"checked"}],expression:"['escrow', { valuePropName: 'checked' }]"}]})],1),e.vbankDueVisible?t("a-form-item",{attrs:{label:"입금기한"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vbankDue",{rules:[{required:!0,message:"가상계좌 입금기한은 필수입력입니다"}]}],expression:"[\n        'vbankDue',\n        {\n          rules: [{ required: true, message: '가상계좌 입금기한은 필수입력입니다' }],\n        }\n      ]"}],attrs:{placeholder:"YYYYMMDDhhmm",size:"large",type:"number"}})],1):e._e(),e.bizNumVisible?t("a-form-item",{attrs:{label:"사업자번호"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["bizNum",{rules:[{required:!0,message:"사업자번호는 필수입력입니다"}]}],expression:"[\n        'bizNum',\n        {\n          rules: [{ required: true, message: '사업자번호는 필수입력입니다' }],\n        }\n      ]"}],attrs:{size:"large",type:"number"}})],1):e._e(),e.quotaVisible?t("a-form-item",{attrs:{label:"할부개월수"}},[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["quota",{initialValue:"0"}],expression:"['quota', { initialValue: '0' }]"}],attrs:{size:"large"}},e._l(e.quotas,(function(a){return t("a-select-option",{key:a,attrs:{value:a}},[e._v(" "+e._s("0"===a?"PG사 기본제공":"1"===a?"일시불":a+"개월")+" ")])})),1)],1):e._e(),t("a-form-item",{attrs:{label:"주문번호"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["merchantUid",{initialValue:e.initialMerchantUid}],expression:"[\n        'merchantUid',\n        { initialValue: initialMerchantUid },\n      ]"}],attrs:{size:"large"}})],1),t("a-form-item",{attrs:{label:"주문명"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{initialValue:"아임포트 VueJS 테스트 결제"}],expression:"['name', { initialValue: '아임포트 VueJS 테스트 결제' }]"}],attrs:{size:"large"}})],1),t("a-form-item",{attrs:{label:"결제금액"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["amount",{initialValue:"1000"}],expression:"['amount', { initialValue: '1000' }]"}],attrs:{size:"large",type:"number"}})],1),t("a-form-item",{attrs:{label:"이름"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["buyerName",{initialValue:"홍길동"}],expression:"['buyerName', { initialValue: '홍길동' }]"}],attrs:{size:"large"}})],1),t("a-form-item",{attrs:{label:"연락처"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["buyerPhone",{initialValue:"01012341234"}],expression:"['buyerPhone', { initialValue: '01012341234' }]"}],attrs:{size:"large",type:"number"}})],1),t("a-form-item",{attrs:{label:"이메일"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["buyerEmail",{initialValue:"example@example.com"}],expression:"['buyerEmail', { initialValue: 'example@example.com' }]"}],attrs:{size:"large"}})],1),t("a-form-item",{attrs:{label:"주소"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["buyerAddr",{initialValue:"서울시 강남구 신사동 661-16"}],expression:"['buyerAddr', { initialValue: '서울시 강남구 신사동 661-16' }]"}],attrs:{size:"large"}})],1),t("a-form-item",{attrs:{label:"우편번호"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["buyerPostcode",{initialValue:"06010"}],expression:"['buyerPostcode', { initialValue: '06010' }]"}],attrs:{size:"large",type:"number"}})],1),t("a-button",{attrs:{size:"large"},on:{click:e.handleGoBack}},[e._v(" 뒤로가기 ")]),t("a-button",{attrs:{type:"primary","html-type":"submit",size:"large"}},[e._v(" 결제하기 ")])],1)],1)},r=[];const i=[{value:"html5_inicis",label:"웹 표준 이니시스"},{value:"kcp",label:"NHN KCP"},{value:"kcp_billing",label:"NHN KCP 정기결제"},{value:"uplus",label:"LG 유플러스"},{value:"jtnet",label:"JTNET"},{value:"nice",label:"나이스 정보통신"},{value:"kakaopay",label:"신 - 카카오페이"},{value:"kakao",label:"구 - LG CNS 카카오페이"},{value:"danal",label:"다날 휴대폰 소액결제"},{value:"danal_tpay",label:"다날 일반결제"},{value:"kicc",label:"한국정보통신"},{value:"paypal",label:"페이팔"},{value:"mobilians",label:"모빌리언스"},{value:"payco",label:"페이코"},{value:"settle",label:"세틀뱅크 가상계좌"},{value:"naverco",label:"네이버 체크아웃"},{value:"naverpay",label:"네이버페이"},{value:"smilepay",label:"스마일페이"}],s=[{value:"card",label:"신용카드"},{value:"trans",label:"실시간 계좌이체"},{value:"vbank",label:"가상계좌"},{value:"phone",label:"휴대폰 소액결제"}],n=s.concat([{value:"samsung",label:"삼성페이"},{value:"kapy",label:"KPAY"},{value:"cultureland",label:"문화상품권"},{value:"smartculture",label:"스마트문상"},{value:"happymoney",label:"해피머니"}]),o=s.concat([{value:"cultureland",label:"문화상품권"},{value:"smartculture",label:"스마트문상"},{value:"booknlife",label:"도서문화상품권"}]),u=s.concat([{value:"samsung",label:"삼성페이"}]),c=[{value:"card",label:"신용카드"}],m=[{value:"phone",label:"휴대폰 소액결제"}],d=[{value:"vbank",label:"가상계좌"}],b=c.concat(m),p=["0","1"];function v(e){switch(e){case"kakao":return"imp10391932";case"paypal":return"imp09350031";case"mobilians":return"imp60029475";case"naverco":case"naverpay":return"imp41073887";default:return"imp19424728"}}function h(e="html5_inicis"){switch(e){case"html5_inicis":return n;case"kcp":return u;case"kcp_billing":case"kakaopay":case"kakao":case"paypal":case"payco":case"smilepay":return c;case"uplus":return o;case"danal":return m;case"mobilians":return b;case"settle":return d;default:return n}}function y(e="html5_inicis"){switch(e){case"html5_inicis":case"kcp":return p.concat(["2","3","4","5","6"]);default:return p}}var g={getUserCodeByPg:v,getMethodsByPg:h,getQuotaByPg:y},k={data(){return{formLayout:"horizontal",form:this.$form.createForm(this,{name:"payment"}),initialMerchantUid:"mid_"+(new Date).getTime(),pgs:i,methods:g.getMethodsByPg(),quotas:g.getQuotaByPg(),initialMethod:"card",vbankDueVisible:!1,bizNumVisible:!1,quotaVisible:!0}},methods:{handleSubmit(e){e.preventDefault(),this.form.validateFields(async(e,a)=>{if(!e){const{pg:e,payMethod:t,escrow:l,vbankDue:r,bizNum:i,quota:s,merchantUid:n,name:o,amount:u,buyerName:c,buyerTel:m,buyerEmail:d,buyerAddr:b,buyerPostcode:p}=a,{IMP:v}=window;v.init(g.getUserCodeByPg(e));const h={pg:e,pay_method:t,escrow:l,merchant_uid:n,name:o,amount:u,buyer_name:c,buyer_tel:m,buyer_email:d,buyer_addr:b,buyer_postcode:p,niceMobileV2:!0};"vbank"===t&&(h.vbank_due=r,"danal_tpay"===e&&(h.biz_num=i)),"card"===t&&(h.display={card_quota:s}),this.sendPaymentDataToBackend,v.request_pay(h,this.callback)}})},async sendPaymentDataToBackend(e){try{const e=await fetch("http://localhost:8080/api/payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(values)});console.log(e),e.ok?console.log("Payment data sent successfully"):console.error("Failed to send payment data")}catch(a){console.error("Error sending payment data:",a)}},handlePg(e){const a=g.getMethodsByPg(e),[{value:t}]=a;this.methods=g.getMethodsByPg(e),this.form.setFieldsValue({payMethod:t}),this.setVisible(e,t)},handleMethod(e){const a=this.form.getFieldValue("pg");this.setVisible(a,e)},setVisible(e,a){const t="vbank"===a;this.vbankDueVisible=t,this.bizNumVisible="danal_tpay"===e&&t,this.quotaVisible="card"===a},handleGoBack(){this.$router.push("/")},callback(e){const a={...e,type:"payment"};this.$router.push({path:"/result",query:a})}}},f=k,_=t("2877"),V=Object(_["a"])(f,l,r,!1,null,null,null);a["default"]=V.exports}}]);
//# sourceMappingURL=payment.0e1e98d9.js.map