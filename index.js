"use strict";var c=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var b=Object.prototype.hasOwnProperty;var N=(r,n)=>{for(var t in n)c(r,t,{get:n[t],enumerable:!0})},h=(r,n,t,s)=>{if(n&&typeof n=="object"||typeof n=="function")for(let e of g(n))!b.call(r,e)&&e!==t&&c(r,e,{get:()=>n[e],enumerable:!(s=$(n,e))||s.enumerable});return r};var B=r=>h(c({},"__esModule",{value:!0}),r);var L={};N(L,{default:()=>j});module.exports=B(L);var _=function(r){let{classNames:n=!0}=this.getOptions()??{},t=[],s=r.toString().replace(/^(\s*)import\s+['"]([^'"]+\.(?:c|pc|le|s[ac])ss)['"]\s*;/gm,(o,i,a)=>{let f=a.replace(/\W/g,"_");return t.push(f),`${i}import ${f} from '${a}';`});if(!t.length)return Buffer.from(r);let e,l;if(n&&(s=s.replace(/import\s+(\w+)\s+from\s+['"]classnames['"]\s*;/,(o,i)=>(e=i,l=`${e}__bind`,`import ${l} from 'classnames/bind';`))),!n)return Buffer.from(s.replace(/\bclassName\s*=\s*(['"])([^'"]+)\1/g,(o,i,a)=>`className={[${a.split(/\s+/).map(f=>t.map(d=>`${d}.${f}`).join(", ")).join(" ")}].filter(Boolean).join(' ')}`));let u=s.match(/(import[^;]+;)(?!.*\bimport\b)/s),m=(u?.index??0)+(u?.[1]?.length??0);if(!e){if(!s.match(/\bclassName\s*=/))return Buffer.from(r);e="__classNames",l=`${e}__bind`;let i=`
import ${l} from 'classnames/bind';`;s=s.slice(0,m)+i+s.slice(m),m+=i.length}let p=t.length===1?t[0]:`{
${t.map(o=>`    ...${o},
`).join("")}}`;return s=s.slice(0,m)+`

const ${e} = ${l}.bind(${p});`+s.slice(m),Buffer.from(s.replace(/\bclassName\s*=\s*(['"])([^'"]+)\1/g,(o,i,a)=>`className={${e}('${a.split(/\s+/).join("', '")}')}`))},j=_;0&&(module.exports={});