"use strict";(self.webpackChunkfabrication_layout=self.webpackChunkfabrication_layout||[]).push([[596],{6596:function(e,t,n){n.r(t),n.d(t,{default:function(){return k}});var r=n(9439),a=n(2791),i=n(9806),s=n(1187),o=n(1632),c=n(6165),l=n.n(c),d=n(7530),p=n(2007),h=n.n(p);function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var m=function(e){var t,n;function r(){var t;return(t=e.call(this)||this).handleExpired=t.handleExpired.bind(f(t)),t.handleErrored=t.handleErrored.bind(f(t)),t.handleChange=t.handleChange.bind(f(t)),t.handleRecaptchaRef=t.handleRecaptchaRef.bind(f(t)),t}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var i=r.prototype;return i.getValue=function(){return this.props.grecaptcha&&void 0!==this._widgetId?this.props.grecaptcha.getResponse(this._widgetId):null},i.getWidgetId=function(){return this.props.grecaptcha&&void 0!==this._widgetId?this._widgetId:null},i.execute=function(){var e=this.props.grecaptcha;if(e&&void 0!==this._widgetId)return e.execute(this._widgetId);this._executeRequested=!0},i.executeAsync=function(){var e=this;return new Promise((function(t,n){e.executionResolve=t,e.executionReject=n,e.execute()}))},i.reset=function(){this.props.grecaptcha&&void 0!==this._widgetId&&this.props.grecaptcha.reset(this._widgetId)},i.handleExpired=function(){this.props.onExpired?this.props.onExpired():this.handleChange(null)},i.handleErrored=function(){this.props.onErrored&&this.props.onErrored(),this.executionReject&&(this.executionReject(),delete this.executionResolve,delete this.executionReject)},i.handleChange=function(e){this.props.onChange&&this.props.onChange(e),this.executionResolve&&(this.executionResolve(e),delete this.executionReject,delete this.executionResolve)},i.explicitRender=function(){if(this.props.grecaptcha&&this.props.grecaptcha.render&&void 0===this._widgetId){var e=document.createElement("div");this._widgetId=this.props.grecaptcha.render(e,{sitekey:this.props.sitekey,callback:this.handleChange,theme:this.props.theme,type:this.props.type,tabindex:this.props.tabindex,"expired-callback":this.handleExpired,"error-callback":this.handleErrored,size:this.props.size,stoken:this.props.stoken,hl:this.props.hl,badge:this.props.badge}),this.captcha.appendChild(e)}this._executeRequested&&this.props.grecaptcha&&void 0!==this._widgetId&&(this._executeRequested=!1,this.execute())},i.componentDidMount=function(){this.explicitRender()},i.componentDidUpdate=function(){this.explicitRender()},i.componentWillUnmount=function(){void 0!==this._widgetId&&(this.delayOfCaptchaIframeRemoving(),this.reset())},i.delayOfCaptchaIframeRemoving=function(){var e=document.createElement("div");for(document.body.appendChild(e),e.style.display="none";this.captcha.firstChild;)e.appendChild(this.captcha.firstChild);setTimeout((function(){document.body.removeChild(e)}),5e3)},i.handleRecaptchaRef=function(e){this.captcha=e},i.render=function(){var e=this.props,t=(e.sitekey,e.onChange,e.theme,e.type,e.tabindex,e.onExpired,e.onErrored,e.size,e.stoken,e.grecaptcha,e.badge,e.hl,function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["sitekey","onChange","theme","type","tabindex","onExpired","onErrored","size","stoken","grecaptcha","badge","hl"]));return a.createElement("div",u({},t,{ref:this.handleRecaptchaRef}))},r}(a.Component);m.displayName="ReCAPTCHA",m.propTypes={sitekey:h().string.isRequired,onChange:h().func,grecaptcha:h().object,theme:h().oneOf(["dark","light"]),type:h().oneOf(["image","audio"]),tabindex:h().number,onExpired:h().func,onErrored:h().func,size:h().oneOf(["compact","normal","invisible"]),stoken:h().string,hl:h().string,badge:h().oneOf(["bottomright","bottomleft","inline"])},m.defaultProps={onChange:function(){},theme:"light",type:"image",tabindex:0,size:"normal",badge:"bottomright"};var g=n(2110),v=n.n(g);function x(){return x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},x.apply(this,arguments)}var y={},_=0;var b="onloadcallback";var w,j,R=(w=function(){return"https://"+(("undefined"!==typeof window&&window.recaptchaOptions||{}).useRecaptchaNet?"recaptcha.net":"www.google.com")+"/recaptcha/api.js?onload="+b+"&render=explicit"},j=(j={callbackName:b,globalName:"grecaptcha"})||{},function(e){var t=e.displayName||e.name||"Component",n=function(t){var n,r;function i(e,n){var r;return(r=t.call(this,e,n)||this).state={},r.__scriptURL="",r}r=t,(n=i).prototype=Object.create(r.prototype),n.prototype.constructor=n,n.__proto__=r;var s=i.prototype;return s.asyncScriptLoaderGetScriptLoaderID=function(){return this.__scriptLoaderID||(this.__scriptLoaderID="async-script-loader-"+_++),this.__scriptLoaderID},s.setupScriptURL=function(){return this.__scriptURL="function"===typeof w?w():w,this.__scriptURL},s.asyncScriptLoaderHandleLoad=function(e){var t=this;this.setState(e,(function(){return t.props.asyncScriptOnLoad&&t.props.asyncScriptOnLoad(t.state)}))},s.asyncScriptLoaderTriggerOnScriptLoaded=function(){var e=y[this.__scriptURL];if(!e||!e.loaded)throw new Error("Script is not loaded.");for(var t in e.observers)e.observers[t](e);delete window[j.callbackName]},s.componentDidMount=function(){var e=this,t=this.setupScriptURL(),n=this.asyncScriptLoaderGetScriptLoaderID(),r=j,a=r.globalName,i=r.callbackName,s=r.scriptId;if(a&&"undefined"!==typeof window[a]&&(y[t]={loaded:!0,observers:{}}),y[t]){var o=y[t];return o&&(o.loaded||o.errored)?void this.asyncScriptLoaderHandleLoad(o):void(o.observers[n]=function(t){return e.asyncScriptLoaderHandleLoad(t)})}var c={};c[n]=function(t){return e.asyncScriptLoaderHandleLoad(t)},y[t]={loaded:!1,observers:c};var l=document.createElement("script");for(var d in l.src=t,l.async=!0,j.attributes)l.setAttribute(d,j.attributes[d]);s&&(l.id=s);var p=function(e){if(y[t]){var n=y[t].observers;for(var r in n)e(n[r])&&delete n[r]}};i&&"undefined"!==typeof window&&(window[i]=function(){return e.asyncScriptLoaderTriggerOnScriptLoaded()}),l.onload=function(){var e=y[t];e&&(e.loaded=!0,p((function(t){return!i&&(t(e),!0)})))},l.onerror=function(){var e=y[t];e&&(e.errored=!0,p((function(t){return t(e),!0})))},document.body.appendChild(l)},s.componentWillUnmount=function(){var e=this.__scriptURL;if(!0===j.removeOnUnmount)for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n+=1)t[n].src.indexOf(e)>-1&&t[n].parentNode&&t[n].parentNode.removeChild(t[n]);var r=y[e];r&&(delete r.observers[this.asyncScriptLoaderGetScriptLoaderID()],!0===j.removeOnUnmount&&delete y[e])},s.render=function(){var t=j.globalName,n=this.props,r=(n.asyncScriptOnLoad,n.forwardedRef),i=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(n,["asyncScriptOnLoad","forwardedRef"]);return t&&"undefined"!==typeof window&&(i[t]="undefined"!==typeof window[t]?window[t]:void 0),i.ref=r,(0,a.createElement)(e,i)},i}(a.Component),r=(0,a.forwardRef)((function(e,t){return(0,a.createElement)(n,x({},e,{forwardedRef:t}))}));return r.displayName="AsyncScriptLoader("+t+")",r.propTypes={asyncScriptOnLoad:h().func},v()(r,e)})(m),L=R,N=n(2202),C=n(184),k=function(){var e=(0,a.useState)(!1),t=(0,r.Z)(e,2),n=t[0],c=t[1],p=(0,a.useState)(""),h=(0,r.Z)(p,2),u=h[0],f=h[1],m=(0,a.useState)(""),g=(0,r.Z)(m,2),v=g[0],x=g[1],y=(0,a.useState)(""),_=(0,r.Z)(y,2),b=_[0],w=_[1],j=(0,a.useState)(!1),R=(0,r.Z)(j,2),k=R[0],S=R[1],I=(0,a.useRef)(null),O=(0,a.useRef)(null),E=(0,a.useRef)(null),G=(0,a.useRef)(null),D=(0,a.useRef)(null),T=(0,a.useRef)(null),U=(0,a.useRef)(null),H=(0,a.useRef)(null),M=(0,a.useRef)(null),A=(0,a.useRef)(null),F=(0,a.useRef)(null),q=(0,a.useRef)(null),z=(0,a.useRef)(null),P=(0,a.useContext)(N.I).modalIsOpen;(0,a.useEffect)((function(){var e=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?(D.current.classList.add("animate"),T.current.classList.add("animate")):(D.current.classList.remove("animate"),T.current.classList.remove("animate"))}))})),t=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?(M.current.classList.add("animate"),A.current.classList.add("animate"),F.current.classList.add("animate"),q.current.classList.add("animate"),z.current.classList.add("animate")):(M.current.classList.remove("animate"),A.current.classList.remove("animate"),F.current.classList.remove("animate"),q.current.classList.remove("animate"),z.current.classList.remove("animate"))}))})),n=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?(U.current.classList.add("animate"),H.current.classList.add("animate")):(U.current.classList.remove("animate"),H.current.classList.remove("animate"))}))}));return e.observe(D.current),e.observe(T.current),t.observe(M.current),t.observe(A.current),t.observe(F.current),t.observe(q.current),t.observe(z.current),n.observe(U.current),n.observe(H.current),function(){e.disconnect(),t.disconnect(),n.disconnect()}}),[]);var Y={to_name:"Nick",from_name:u,reply_to:v,message:b};return(0,C.jsxs)("div",{className:"contact_container",style:{display:P?"none":"grid"},children:[(0,C.jsxs)("div",{className:"contact_right",children:[(0,C.jsxs)("div",{className:"contact_form",children:[(0,C.jsx)("div",{className:"contact_text",children:(0,C.jsx)(l(),{onInit:function(e){e.pauseFor(2500).typeString("Let's discuss how we can create your project at a competitive pricing and a timely delivery. No strings attached.").pauseFor(2e3).changeDeleteSpeed(10).deleteChars(20).pauseFor(1e3).typeString('<span style="color: cyan;">Maybe one.').pauseFor(1e3).deleteChars(10).pauseFor(1e3).typeString('<span style="color: cyan;"> Our word.</span>').pauseFor(1e3).deleteChars(10).pauseFor(1e3).typeString('<span style="color: cyan;"> A welldone job.</span>').start()},options:{delay:30,cursor:""}})}),(0,C.jsxs)("div",{className:"right_floating_content",ref:M,style:{marginTop:30},children:[(0,C.jsx)("input",{type:"text",className:"right_floating_input",placeholder:" ",required:!0,onChange:function(e){f(e.target.value)},ref:I,name:"userNameInput"}),(0,C.jsx)("label",{className:"right_floating_label",children:"Your Name"})]}),(0,C.jsxs)("div",{className:"right_floating_content",ref:A,children:[(0,C.jsx)("input",{type:"text",className:"right_floating_input",placeholder:" ",required:!0,onChange:function(e){x(e.target.value)},ref:O,name:"userMailInput"}),(0,C.jsx)("label",{className:"right_floating_label",children:"Your E-mail"})]}),(0,C.jsxs)("div",{className:"right_floating_content",ref:F,style:{height:200},children:[(0,C.jsx)("textarea",{type:"text",className:"right_floating_input",placeholder:" ",required:!0,style:{height:200,resize:"none"},onChange:function(e){w(e.target.value)},ref:E,name:"userMessageInput"}),(0,C.jsx)("label",{className:"right_floating_label",children:"Your Message"})]}),(0,C.jsxs)("div",{className:"contact_send",children:[(0,C.jsx)("input",{ref:q,type:"file",name:"file",className:"right_file"}),(0,C.jsx)("div",{children:(0,C.jsx)(L,{sitekey:"6LfS0homAAAAAODgpiOQx31H4Hm28mlBnaKhOliR",onChange:function(e){S(!!e)}})}),(0,C.jsxs)("div",{children:[(0,C.jsxs)("button",{ref:z,className:"contact_send_button",onClick:function(){c(!0),""===u||""===v||""===b?G.current.innerHTML="Please fill in required fields.":v.includes("@")?v.endsWith(".com")?!1===k?G.current.innerHTML="Please check reCaptcha.":(d.ZP.send("service_axii655","template_qw0poyh",Y,"qbI7Jc6ts8bm-zmLe"),I.current.value="",O.current.value="",E.current.value="",G.current.innerHTML="Message sent!"):G.current.innerHTML='Your e-mail must end with ".com".':G.current.innerHTML='Your e-mail must include "@".'},children:["Send ",(0,C.jsx)(i.G,{icon:o.XCy,className:"icon_send"})]}),(0,C.jsx)("span",{ref:G,className:"message_confirmation",style:{display:n?"inline":"none"}})]})]})]}),(0,C.jsxs)("div",{className:"contact_address",children:[(0,C.jsx)("div",{className:"address_text",children:(0,C.jsx)(l(),{onInit:function(e){e.pauseFor(500).typeString('Easy to find us. Just follow the <span style="color: cyan;">Eiffel.').start()},options:{delay:30,cursor:""}})}),(0,C.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104881.09486118425!2d2.277020427765447!3d48.85883760918865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1553497921355",title:"Google Maps Embed",className:"contact_address_map"})]}),(0,C.jsxs)("div",{className:"rightText_container",children:[(0,C.jsxs)("div",{ref:U,className:"right_mail",children:[(0,C.jsx)(i.G,{icon:o.FU$,style:{color:"white",width:20,marginRight:5}}),(0,C.jsx)("span",{children:"nicolae.arhire10@gmail.com"})]}),(0,C.jsxs)("div",{ref:H,className:"right_icons",children:[(0,C.jsx)(i.G,{icon:o.j1w,style:{color:"white",width:20,marginRight:5}}),(0,C.jsx)("span",{className:"right_phone",children:"0712345678"}),(0,C.jsx)("a",{href:"https://www.freecodecamp.org",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.xYR,className:"icon_google"})}),(0,C.jsx)("a",{href:"https://twitter.com/freeCodeCamp",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.mdU,className:"icon_twitter"})}),(0,C.jsx)("a",{href:"https://www.youtube.com/c/Freecodecamp",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.opf,className:"icon_youtube"})}),(0,C.jsx)("a",{href:"https://www.linkedin.com/school/free-code-camp",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.D9H,className:"icon_linkedIn",style:{marginRight:0}})}),(0,C.jsx)("a",{href:"https://www.freecodecamp.org",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)("span",{className:"google"})})]})]})]})," ",(0,C.jsx)("div",{className:"contact_left",children:(0,C.jsxs)("div",{className:"leftText_container",children:[(0,C.jsx)("span",{ref:D,className:"left_text",children:"Let's get in touch and create something great together."}),(0,C.jsxs)("span",{ref:T,className:"left_icons",children:[(0,C.jsx)(i.G,{icon:o.j1w,style:{color:"white",width:20,marginRight:5}}),(0,C.jsx)("span",{style:{fontSize:20,color:"white",marginRight:15,textDecoration:"underline"},children:"0712345678"}),(0,C.jsx)("a",{href:"https://www.freecodecamp.org",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.xYR,className:"icon_google"})}),(0,C.jsx)("a",{href:"https://twitter.com/freeCodeCamp",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.mdU,className:"icon_twitter"})}),(0,C.jsx)("a",{href:"https://www.youtube.com/c/Freecodecamp",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.opf,className:"icon_youtube"})}),(0,C.jsx)("a",{href:"https://www.linkedin.com/school/free-code-camp",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)(i.G,{icon:s.D9H,className:"icon_linkedIn"})}),(0,C.jsx)("a",{href:"https://www.freecodecamp.org",target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)("span",{className:"google"})}),(0,C.jsx)("span",{style:{fontSize:20,color:"white",marginRight:0,textDecoration:"underline"},children:"nicolae.arhire10@gmail.com"})]})]})})]})}}}]);
//# sourceMappingURL=596.1b040947.chunk.js.map