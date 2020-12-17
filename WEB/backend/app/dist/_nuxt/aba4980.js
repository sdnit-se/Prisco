(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{344:function(t,e,r){"use strict";r.r(e);r(40),r(41);var o=r(79),n=r.n(o),d={props:{ipamData:{type:Array,default:function(){return[]}},hostname:{type:String,default:""},macAddressChild:{type:String,default:""},description:{type:String,default:""}}},c=r(61),l=r(85),v=r.n(l),h=r(340),m=r(290),f=r(294),_=r(335),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("div",{staticClass:"text-center"},[t._v("NEW DATA")]),t._v(" "),r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[r("v-text-field",{attrs:{value:t.hostname,outlined:"",readonly:"",dense:"",label:"Hostname",required:""}})],1),t._v(" "),r("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[r("v-text-field",{attrs:{value:t.macAddressChild,outlined:"",readonly:"",dense:"",label:"New MAC-address",required:""}})],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{value:t.description,outlined:"",readonly:"",dense:"",label:"New Description"}})],1)],1)],1),t._v(" "),r("v-spacer"),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("div",{staticClass:"text-center"},[t._v("OLD DATA")]),t._v(" "),r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[r("v-text-field",{attrs:{value:t.ipamData[0].hostname||"No Hostname",outlined:"",readonly:"",dense:"",label:"Hostname",required:""}})],1),t._v(" "),r("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[r("v-text-field",{attrs:{value:t.ipamData[0].mac||"No Mac-Address",outlined:"",readonly:"",dense:"",label:"Old MAC-address",required:""},on:{input:function(e){return t.$emit("mac-address")}}})],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{value:t.ipamData[0].description||"No Description",outlined:"",readonly:"",dense:"",label:"Old Description"}})],1)],1)],1)],1)],1)}),[],!1,null,null,null),w=component.exports;v()(component,{VCol:h.a,VRow:m.a,VSpacer:f.a,VTextField:_.a});var y={components:{OneSwitch:w},props:{cardHeader:{type:String,default:""},buttonText:{type:String,default:"ADD TEXT"},buttonColor:{type:String,default:"blue"},macAddress:{type:String,default:""},targetIpAddress:{type:String,default:""}},data:function(){return{dialog:!1,step:1,valid:!1,targetIpAddressChild:"",hostname:"",hostnameRules:[function(t){return!!t||"Hostname is required"}],macAddressChild:"",macAddressRules:[function(t){return!!t||"Mac-address is required"},function(t){return/^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i.test(t)||"Has to be formated 00:00:00:00:00:00"}],description:"",failedToVerify:!1,failed:!1,failedText:"Failed to verify host, do it manually.",loadingUpdatedIpam:!1,loadingSwitchProvisioned:!1,loadingSwitchProvisionedVerify:!1,updatedIpam:"",switchProvisioned:"",switchProvisionedVerify:"",switchProvisionedVerifyDone:"",loading:!1,ipID:"",verifyTimesValue:0,outputFromAnsible:"",ipamData:[{hostname:"",macAddress:"",description:""}]}},mounted:function(){this.macAddressChild=this.macAddress,this.targetIpAddressChild=this.targetIpAddress},methods:{cancel:function(){this.dialog=!1},errorMessage:function(t){console.log(t),this.$store.commit("snackbarError",t.response.data.message),this.failed=!0,this.failedText=t.response.data.message},successMessage:function(t){this.$store.commit("snackbarSuccess",t)},errorMessageOwnText:function(t){console.log(t),this.$store.commit("snackbarError",t),this.failed=!0,this.failedText=t.response.data.message},startToProvisionSwitch:function(){var t=this;this.loadingUpdatedIpam=!1,this.loadingSwitchProvisioned=!1,this.loadingSwitchProvisionedVerify=!1,this.updatedIpam="",this.switchProvisioned="",this.switchProvisionedVerify="",this.switchProvisionedVerifyDone="",this.outputFromAnsible="",this.loading=!0,this.loadingUpdatedIpam=!0,this.step=3;try{var e={id:this.ipamData[0].id,mac_address:this.macAddressChild,description:this.description};n.a.patch("/api/ipam/"+this.hostname,e).then((function(e){t.loadingUpdatedIpam=!1,t.updatedIpam=!0,t.loadingSwitchProvisioned=!0,t.ipID=t.ipamData[0].id;var r={target_ip_address:t.targetIpAddressChild,ip_id:t.ipamData[0].id,ip_address:t.ipamData[0].ip,hostname:t.hostname,subnet_id:t.ipamData[0].subnetId,mac_address:t.macAddressChild};n.a.post("/api/provision",r).then((function(e){if(t.loadingSwitchProvisioned=!1,t.outputFromAnsible=e.data.output,!0===e.data.success){var r=function(i){setTimeout((function(){var t=this;this.loadingSwitchProvisionedVerify=!0;try{n.a.get("/api/"+this.ipID+"/ping/").then((function(e){0===e.data.data.exit_code?(t.switchProvisionedVerifyDone=!0,t.switchProvisionedVerify=!0,t.successMessage("Switch is up and reachable!")):(t.verifyTimesValue++,t.verifyTimesValue>20?t.errorMessageOwnText("No response from switch... will not try again."):t.errorMessageOwnText("No response from switch ("+t.verifyTimesValue+"/ 20) trying again in 60 seconds...."))})).catch((function(e){t.switchProvisionedVerify=!1,t.errorMessage(e)}))}catch(t){console.log(t)}}),6e4*i)};t.loadingSwitchProvisionedVerify=!0,t.switchProvisioned=!0;var i=0;do{r(i),i++}while(i<20&&!0!==t.switchProvisionedVerify&&!1!==t.switchProvisionedVerify);t.loadingSwitchProvisionedVerify=!1,t.switchProvisionedVerify=!1}else t.switchProvisioned=!1})).catch((function(e){t.loadingSwitchProvisioned=!1,t.switchProvisioned=!1,t.errorMessage(e)}))})).catch((function(e){t.loadingUpdatedIpam=!1,t.updatedIpam=!1,t.errorMessage(e)}))}catch(t){this.loadingSwitchProvisionedVerify=!1,this.loadingSwitchProvisioned=!1,this.loadingUpdatedIpam=!1,this.$store.commit("snackbarError","Something went wrong, open up console for more information."),console.log(t)}this.loading=!1},getDataFromIpam:function(){var t=this;this.loading=!0;try{n.a.get("/api/ipam/"+this.hostname).then((function(e){t.ipamData=e.data.data,t.step=2})).catch((function(e){console.log(e),t.errorMessage(e)}))}catch(t){console.log(t)}this.loading=!1},validate:function(){this.valid&&this.getDataFromIpam()}}},C=r(297),S=r(303),V=r(345),x=r(341),A=r(342),P=r(279),k=r(122),I=r(304),D=r(305),T=r(299),M=r(306),F=r(343),O=Object(c.a)(y,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-center"},[r("v-dialog",{attrs:{persistent:"",width:"1200"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[r("v-btn",t._g(t._b({staticClass:"ma-2",attrs:{color:t.buttonColor,dark:""}},"v-btn",n,!1),o),[t._v("\n                "+t._s(t.buttonText)+"\n            ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),r("v-stepper",{model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},[r("div",{staticClass:"text-center mt-2 headline font-weight-light"},[t._v("\n                "+t._s(t.cardHeader)+"\n            ")]),t._v(" "),r("v-stepper-header",[r("v-stepper-step",{attrs:{complete:t.step>1,step:"1"}},[t._v("\n                    Data\n                ")]),t._v(" "),r("v-divider"),t._v(" "),r("v-stepper-step",{attrs:{complete:t.step>2,step:"2"}},[t._v("\n                    Update IPAM\n                ")]),t._v(" "),r("v-divider"),t._v(" "),r("v-stepper-step",{attrs:{step:"3"}},[t._v(" Provision ")])],1),t._v(" "),r("v-stepper-items",[r("v-stepper-content",{attrs:{step:"1"}},[r("v-card",{staticClass:"mb-12 pb-2 pt-2"},[r("v-form",{ref:"form",staticClass:"ma-4",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:t.hostnameRules,outlined:"",label:"Hostname",required:""},model:{value:t.hostname,callback:function(e){t.hostname=e},expression:"hostname"}})],1),t._v(" "),r("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:t.macAddressRules,outlined:"",label:"New Cisco Switch MAC-address",required:""},on:{keyup:function(e){return t.$emit("mac-address",t.macAddressChild)}},model:{value:t.macAddressChild,callback:function(e){t.macAddressChild=e},expression:"macAddressChild"}})],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{outlined:"",label:"Add Description to host (Optional)",hint:"This description will be shown in IPAM"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1)],1),t._v(" "),r("v-row",[r("v-btn",{staticClass:"ml-3 mr-4 mt-3",attrs:{disabled:!t.valid,color:"success",loading:t.loading},on:{click:t.validate}},[t._v("\n                                    Continue\n                                ")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{staticClass:"mr-4 mt-3",attrs:{text:""},on:{click:t.cancel}},[t._v("\n                                    Cancel\n                                ")])],1)],1)],1)],1),t._v(" "),r("v-stepper-content",{attrs:{step:"2"}},[r("v-card",{staticClass:"mb-12 pb-2 pt-2"},[r("v-form",{ref:"form",staticClass:"ma-4",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("div",{staticClass:"text-center"},[t.loading?r("v-progress-circular",{staticClass:"ma-4",attrs:{size:70,width:7,color:"grey",indeterminate:""}}):t._e()],1),t._v(" "),t.loading?t._e():r("div",[r("OneSwitch",{attrs:{hostname:t.hostname,"mac-address-child":t.macAddressChild,description:t.description,"ipam-data":t.ipamData}}),t._v(" "),r("div",[t._v("\n                                    Are you sure you want to update IPAM\n                                    with the data above?\n                                ")])],1),t._v(" "),r("v-row",[r("v-btn",{staticClass:"ml-3 mr-4 mt-3",attrs:{disabled:!t.valid,color:"success",loading:t.loading},on:{click:t.startToProvisionSwitch}},[t._v("\n                                    Continue\n                                ")]),t._v(" "),r("v-btn",{staticClass:"mr-4 mt-3",attrs:{color:"grey",loading:t.loading},on:{click:function(e){t.step=t.step-1}}},[t._v("\n                                    Back\n                                ")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{staticClass:"mr-4 mt-3",attrs:{text:""},on:{click:t.cancel}},[t._v("\n                                    Cancel\n                                ")])],1)],1)],1)],1),t._v(" "),r("v-stepper-content",{attrs:{step:"3"}},[r("v-card",{staticClass:"mb-12 pb-2 pt-2"},[r("v-form",{ref:"form",staticClass:"ma-4"},[r("div",{staticClass:"text-center"},[r("v-row",{staticClass:"font-weight-light",attrs:{align:"center",justify:"center"}},[t._v("\n                                    Updating IPAM\n                                    "),t.loadingUpdatedIpam?r("v-progress-circular",{staticClass:"ma-4",attrs:{size:25,width:3,color:"grey",indeterminate:""}}):t._e(),t._v(" "),!0===t.updatedIpam?r("v-icon",{attrs:{color:"green"}},[t._v("\n                                        mdi-check-bold\n                                    ")]):t._e(),t._v(" "),!1===t.updatedIpam?r("v-icon",{attrs:{color:"red"}},[t._v("\n                                        mdi-alert\n                                    ")]):t._e(),t._v(" "),""===t.updatedIpam?r("v-icon",{attrs:{color:"grey"}},[t._v("\n                                        mdi-history\n                                    ")]):t._e()],1),t._v(" "),r("v-row",{staticClass:"font-weight-light",attrs:{align:"center",justify:"center"}},[t._v("\n                                    Provisioning Switch\n                                    "),t.loadingSwitchProvisioned?r("v-progress-circular",{staticClass:"ma-4",attrs:{size:25,width:3,color:"grey",indeterminate:""}}):t._e(),t._v(" "),!0===t.switchProvisioned?r("v-icon",{attrs:{color:"green"}},[t._v("\n                                        mdi-check-bold\n                                    ")]):t._e(),t._v(" "),!1===t.switchProvisioned?r("v-icon",{attrs:{color:"red"}},[t._v("\n                                        mdi-alert\n                                    ")]):t._e(),t._v(" "),""===t.updatedIpam?r("v-icon",{attrs:{color:"grey"}},[t._v("\n                                        mdi-history\n                                    ")]):t._e()],1),t._v(" "),r("v-row",{staticClass:"font-weight-light",attrs:{align:"center",justify:"center"}},[t._v("\n                                    Verifying Switch\n                                    "),t.loadingSwitchProvisionedVerify?r("v-progress-circular",{staticClass:"ma-4",attrs:{size:25,width:3,color:"grey",indeterminate:""}}):t._e(),t._v(" "),!0===t.switchProvisionedVerify?r("v-icon",{attrs:{color:"green"}},[t._v("\n                                        mdi-check-bold\n                                    ")]):t._e(),t._v(" "),!1===t.switchProvisionedVerify?r("v-icon",{attrs:{color:"red"}},[t._v("\n                                        mdi-alert\n                                    ")]):t._e(),t._v(" "),""===t.updatedIpam?r("v-icon",{attrs:{color:"grey"}},[t._v("\n                                        mdi-history\n                                    ")]):t._e()],1),t._v(" "),t.switchProvisionedVerifyDone&&!t.failedToVerify?r("div",{staticClass:"font-weight-light"},[t._v("\n                                    Success, IPAM is now updated and switch\n                                    is provisioned.\n                                ")]):t._e(),t._v(" "),t.failed?r("div",{staticClass:"mt-10 font-weight-light"},[t._v("\n                                    "+t._s(t.failedText)+"\n                                ")]):t._e(),t._v(" "),t.outputFromAnsible.length>0?r("v-textarea",{attrs:{label:"Console",height:"300",filled:"",readonly:"","full-width":""},model:{value:t.outputFromAnsible,callback:function(e){t.outputFromAnsible=e},expression:"outputFromAnsible"}}):t._e()],1),t._v(" "),r("v-row",[r("v-btn",{staticClass:"ml-3 mr-4 mt-3",attrs:{color:"grey",loading:t.loading},on:{click:function(e){t.step=t.step-1}}},[t._v("\n                                    Back\n                                ")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{staticClass:"mr-4 mt-3",attrs:{text:""},on:{click:t.cancel}},[t._v("\n                                    Cancel\n                                ")])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null),R=O.exports;v()(O,{VBtn:C.a,VCard:S.a,VCol:h.a,VDialog:V.a,VDivider:x.a,VForm:A.a,VIcon:P.a,VProgressCircular:k.a,VRow:m.a,VSpacer:f.a,VStepper:I.a,VStepperContent:D.a,VStepperHeader:T.a,VStepperItems:T.b,VStepperStep:M.a,VTextField:_.a,VTextarea:F.a});var j={components:{ProvisionSwitchStepper:R},props:{macAddress:{type:String,default:"MAC HERE"},targetIpAddress:{type:String,default:""}},data:function(){return{dialog:!1}},methods:{cancel:function(){this.dialog=!1}}},E=r(298),$=Object(c.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-center"},[r("v-dialog",{attrs:{width:"1200"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[r("v-btn",t._g(t._b({staticClass:"ma-2",attrs:{color:"green",dark:""}},"v-btn",n,!1),o),[t._v("\n                "+t._s(t.macAddress)+"\n            ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),r("v-card",[r("div",{staticClass:"pa-4 text-center headline"},[t._v("\n                What would you like to do with "),r("b",[t._v(t._s(t.macAddress))])]),t._v(" "),r("v-card-text",[r("v-row",{attrs:{align:"center",justify:"center"}},[r("ProvisionSwitchStepper",{attrs:{"button-text":"Recover Switch","button-color":"blue","card-header":"Recover Switch","mac-address":t.macAddress,"target-ip-address":t.targetIpAddress}})],1)],1),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{staticClass:"mr-4 mt-3",attrs:{text:""},on:{click:t.cancel}},[t._v("\n                    Cancel\n                ")])],1)],1)],1)],1)}),[],!1,null,null,null),H=$.exports;v()($,{VBtn:C.a,VCard:S.a,VCardActions:E.a,VCardText:E.b,VDialog:V.a,VRow:m.a,VSpacer:f.a});var N={components:{ProvisionSwitchStepper:R,WhatToDoWithSwitch:H},data:function(){return{loading:!0,search:"",ztpSwitches:[]}},mounted:function(){var t=this;this.loading=!0;try{n.a.get("/api/leases").then((function(e){200!==e.status||e.data.includes("html")||null===e.data||(t.ztpSwitches=e.data)})).catch((function(e){t.$store.commit("snackbarError",e.response.data.message)}))}catch(t){console.log(t),this.$store.commit("snackbarError","Something went wrong, contact admin or read console output.")}this.loading=!1}},z=Object(c.a)(N,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-12 text-center"},[r("div",{staticClass:"mt-12 display-4 font-weight-light"},[t._v("PRISCO")]),t._v(" "),r("div",{staticClass:"mb-10 display-1 font-weight-light"},[t._v("\n        Zero Touch Cisco Provisioning System\n    ")]),t._v(" "),r("div",{staticClass:"headline font-weight-light"},[t._v("What would you like to do?")]),t._v(" "),r("v-row",{attrs:{align:"center",justify:"center"}},[r("ProvisionSwitchStepper",{attrs:{"button-text":"Recover Switch","button-color":"blue","card-header":"Recover Switch"}})],1),t._v(" "),r("v-card",{staticClass:"mt-12 font-weight-light",attrs:{"min-height":"300"}},[r("v-card-title",{attrs:{center:""}},[t._v(" Switches found in ZTP mode ")]),t._v(" "),r("v-card-text",[r("div",{staticClass:"text-center"},[t.loading?r("v-progress-circular",{staticClass:"ma-4",attrs:{size:70,width:7,color:"primary",indeterminate:""}}):r("div",[r("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search for property","single-line":"",filled:"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),t.ztpSwitches.length>0?r("v-row",t._l(t.ztpSwitches,(function(t,i){return r("v-col",{key:i,attrs:{cols:"12",md:"4",sm:"6"}},[r("WhatToDoWithSwitch",{attrs:{"mac-address":t.mac_address,"target-ip-address":t.ip_address}})],1)})),1):r("v-row",{attrs:{align:"center",justify:"center"}},[r("div",{staticClass:"mt-8 headline font-weight-light"},[t._v("\n                            No Switches Found In ZTP-DHCP.\n                        ")])])],1)],1)])],1)],1)}),[],!1,null,null,null);e.default=z.exports;v()(z,{VCard:S.a,VCardText:E.b,VCardTitle:E.c,VCol:h.a,VProgressCircular:k.a,VRow:m.a,VTextField:_.a})}}]);