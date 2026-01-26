import{f as O}from"./chunk-4JMGPBNX.js";import{a as C}from"./chunk-2H7DIYLF.js";import{A as $,B as V,C as W,D as L,e as R,g as P,t as A,u as F,v as k,w as I,x as z,y as H,z as N}from"./chunk-H5QXEMOA.js";import"./chunk-7JP3HI6F.js";import"./chunk-57Q2UAVZ.js";import{a as x}from"./chunk-QJ46N2FA.js";import{c as v,e as b,j as g}from"./chunk-U7VJQUDE.js";import"./chunk-XJJY6XHD.js";import{$b as a,Ab as m,Bb as w,Cb as B,Eb as s,Fb as u,Kb as y,Pa as i,ab as c,ac as f,gb as d,xb as o,yb as n,zb as t}from"./chunk-GV4MRAZ3.js";var S=class e{REPORT_FORMAT=R;basicButtonCode=`<acp-button
  [text]="'Primary'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [text]="'Secondary'"
  [variant]="'secondary'"
  [matStyle]="'filled'"
/>`;materialStylesCode=`<acp-button
  [text]="'Filled'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [text]="'Elevated'"
  [variant]="'primary'"
  [matStyle]="'elevated'"
/>
<acp-button
  [text]="'Outlined'"
  [variant]="'primary'"
  [matStyle]="'outlined'"
/>`;iconButtonsCode=`<acp-button
  [text]="'Save'"
  [icon]="'save'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [icon]="'add'"
  [variant]="'primary'"
  [matStyle]="'fab'"
  [title]="'Add Item'"
/>`;reportButtonsCode=`import { REPORT_FORMAT } from '@acontplus/ng-components';

<acp-button
  [reportFormat]="REPORT_FORMAT.PDF"
  [text]="'Export PDF'"
  (handleClick)="onExport('PDF')"
/>
<acp-button
  [reportFormat]="REPORT_FORMAT.EXCEL"
  [text]="'Export Excel'"
  (handleClick)="onExport('Excel')"
/>`;disabledButtonsCode=`<acp-button
  [text]="'Enabled'"
  [variant]="'primary'"
  [disabled]="false"
/>
<acp-button
  [text]="'Disabled'"
  [variant]="'primary'"
  [disabled]="true"
/>`;onExport(r){alert(`Exporting ${r}...`)}static \u0275fac=function(l){return new(l||e)};static \u0275cmp=c({type:e,selectors:[["app-button-overview"]],decls:58,vars:81,consts:[[1,"docs-component-viewer-content"],[1,"docs-component-description"],[1,"docs-example-card"],[1,"button-row"],[3,"text","variant","matStyle"],[3,"code","language"],[3,"text","icon","variant","matStyle"],[3,"icon","variant","matStyle","title"],[3,"handleClick","reportFormat","text"],[3,"text","variant","disabled"],[3,"text","icon","variant","disabled"]],template:function(l,p){l&1&&(n(0,"div",0)(1,"app-doc-heading"),a(2,"Button"),t(),n(3,"p",1),a(4," Flexible button component with multiple Material Design variants and built-in report format support. Supports all Material button styles including filled, elevated, outlined, text, and FAB variants. "),t(),n(5,"h2"),a(6,"Basic Buttons"),t(),n(7,"mat-card",2)(8,"mat-card-content")(9,"div",3),m(10,"acp-button",4)(11,"acp-button",4)(12,"acp-button",4)(13,"acp-button",4)(14,"acp-button",4)(15,"acp-button",4),t()()(),m(16,"app-code-example",5),n(17,"h2"),a(18,"Material Button Styles"),t(),n(19,"mat-card",2)(20,"mat-card-content")(21,"div",3),m(22,"acp-button",4)(23,"acp-button",4)(24,"acp-button",4)(25,"acp-button",4)(26,"acp-button",4),t()()(),m(27,"app-code-example",5),n(28,"h2"),a(29,"Buttons with Icons"),t(),n(30,"mat-card",2)(31,"mat-card-content")(32,"div",3),m(33,"acp-button",6)(34,"acp-button",6)(35,"acp-button",6)(36,"acp-button",7)(37,"acp-button",7),t()()(),m(38,"app-code-example",5),n(39,"h2"),a(40,"Report Format Buttons"),t(),n(41,"mat-card",2)(42,"mat-card-content")(43,"div",3)(44,"acp-button",8),y("handleClick",function(){return p.onExport("PDF")}),t(),n(45,"acp-button",8),y("handleClick",function(){return p.onExport("Excel")}),t(),n(46,"acp-button",8),y("handleClick",function(){return p.onExport("Word")}),t(),n(47,"acp-button",8),y("handleClick",function(){return p.onExport("CSV")}),t()()()(),m(48,"app-code-example",5),n(49,"h2"),a(50,"Disabled State"),t(),n(51,"mat-card",2)(52,"mat-card-content")(53,"div",3),m(54,"acp-button",9)(55,"acp-button",9)(56,"acp-button",10),t()()(),m(57,"app-code-example",5),t()),l&2&&(i(10),o("text","Primary")("variant","primary")("matStyle","filled"),i(),o("text","Secondary")("variant","secondary")("matStyle","filled"),i(),o("text","Success")("variant","success")("matStyle","filled"),i(),o("text","Danger")("variant","danger")("matStyle","filled"),i(),o("text","Warning")("variant","warning")("matStyle","filled"),i(),o("text","Info")("variant","info")("matStyle","filled"),i(),o("code",p.basicButtonCode)("language","typescript"),i(6),o("text","Filled")("variant","primary")("matStyle","filled"),i(),o("text","Elevated")("variant","primary")("matStyle","elevated"),i(),o("text","Outlined")("variant","primary")("matStyle","outlined"),i(),o("text","Text")("variant","primary")("matStyle","text"),i(),o("text","Tonal")("variant","primary")("matStyle","tonal"),i(),o("code",p.materialStylesCode)("language","typescript"),i(6),o("text","Save")("icon","save")("variant","primary")("matStyle","filled"),i(),o("text","Delete")("icon","delete")("variant","danger")("matStyle","filled"),i(),o("text","Edit")("icon","edit")("variant","secondary")("matStyle","outlined"),i(),o("icon","add")("variant","primary")("matStyle","fab")("title","Add Item"),i(),o("icon","settings")("variant","secondary")("matStyle","mini-fab")("title","Settings"),i(),o("code",p.iconButtonsCode)("language","typescript"),i(6),o("reportFormat",p.REPORT_FORMAT.PDF)("text","Export PDF"),i(),o("reportFormat",p.REPORT_FORMAT.EXCEL)("text","Export Excel"),i(),o("reportFormat",p.REPORT_FORMAT.WORD)("text","Export Word"),i(),o("reportFormat",p.REPORT_FORMAT.CSV)("text","Export CSV"),i(),o("code",p.reportButtonsCode)("language","typescript"),i(6),o("text","Enabled")("variant","primary")("disabled",!1),i(),o("text","Disabled")("variant","primary")("disabled",!0),i(),o("text","Disabled")("icon","save")("variant","success")("disabled",!0),i(),o("code",p.disabledButtonsCode)("language","typescript"))},dependencies:[P,g,v,b,O,x,C],styles:[".docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:32px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}.button-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:12px;align-items:center}"]})};var _=class e{static \u0275fac=function(l){return new(l||e)};static \u0275cmp=c({type:e,selectors:[["app-button-examples"]],decls:5,vars:0,consts:[[1,"docs-component-viewer-content"]],template:function(l,p){l&1&&(w(0,"div",0)(1,"h1"),a(2,"Button Examples"),B(),w(3,"p"),a(4,"More interactive examples coming soon..."),B()())},styles:[".docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}"]})};function j(e,r){e&1&&(n(0,"th",10),a(1,"Name"),t())}function U(e,r){if(e&1&&(n(0,"td",11)(1,"code"),a(2),t()()),e&2){let l=r.$implicit;i(2),f(l.name)}}function q(e,r){e&1&&(n(0,"th",10),a(1,"Type"),t())}function G(e,r){if(e&1&&(n(0,"td",11)(1,"code"),a(2),t()()),e&2){let l=r.$implicit;i(2),f(l.type)}}function J(e,r){e&1&&(n(0,"th",10),a(1,"Description"),t())}function K(e,r){if(e&1&&(n(0,"td",11),a(1),t()),e&2){let l=r.$implicit;i(),f(l.description)}}function Q(e,r){e&1&&(n(0,"th",10),a(1,"Default"),t())}function Y(e,r){if(e&1&&(n(0,"td",11)(1,"code"),a(2),t()()),e&2){let l=r.$implicit;i(2),f(l.default||"-")}}function Z(e,r){e&1&&m(0,"tr",12)}function tt(e,r){e&1&&m(0,"tr",13)}function et(e,r){e&1&&(n(0,"th",10),a(1,"Name"),t())}function nt(e,r){if(e&1&&(n(0,"td",11)(1,"code"),a(2),t()()),e&2){let l=r.$implicit;i(2),f(l.name)}}function it(e,r){e&1&&(n(0,"th",10),a(1,"Type"),t())}function at(e,r){if(e&1&&(n(0,"td",11)(1,"code"),a(2),t()()),e&2){let l=r.$implicit;i(2),f(l.type)}}function ot(e,r){e&1&&(n(0,"th",10),a(1,"Description"),t())}function rt(e,r){if(e&1&&(n(0,"td",11),a(1),t()),e&2){let l=r.$implicit;i(),f(l.description)}}function lt(e,r){e&1&&m(0,"tr",12)}function pt(e,r){e&1&&m(0,"tr",13)}var E=class e{displayedColumns=["name","type","description","default"];outputColumns=["name","type","description"];inputs=[{name:"text",type:"string",description:"Button text label",default:"''"},{name:"variant",type:"'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",description:"Button color variant",default:"'primary'"},{name:"matStyle",type:"'filled' | 'elevated' | 'outlined' | 'text' | 'tonal' | 'icon' | 'fab' | 'mini-fab' | 'extended-fab'",description:"Material Design button style",default:"'filled'"},{name:"icon",type:"string",description:"Material icon name",default:"undefined"},{name:"disabled",type:"boolean",description:"Whether button is disabled",default:"false"},{name:"title",type:"string",description:"Tooltip text",default:"''"},{name:"reportFormat",type:"REPORT_FORMAT",description:"Report format for automatic icon and color",default:"undefined"}];outputs=[{name:"handleClick",type:"EventEmitter<MouseEvent>",description:"Emits when button is clicked"}];static \u0275fac=function(l){return new(l||e)};static \u0275cmp=c({type:e,selectors:[["app-button-api"]],decls:34,vars:6,consts:[[1,"docs-component-viewer-content"],["mat-table","",1,"api-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","type"],["matColumnDef","description"],["matColumnDef","default"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(l,p){l&1&&(n(0,"div",0)(1,"app-doc-heading"),a(2,"Button API"),t(),n(3,"h2"),a(4,"Inputs"),t(),n(5,"table",1),s(6,2),d(7,j,2,0,"th",3)(8,U,3,1,"td",4),u(),s(9,5),d(10,q,2,0,"th",3)(11,G,3,1,"td",4),u(),s(12,6),d(13,J,2,0,"th",3)(14,K,2,1,"td",4),u(),s(15,7),d(16,Q,2,0,"th",3)(17,Y,3,1,"td",4),u(),d(18,Z,1,0,"tr",8)(19,tt,1,0,"tr",9),t(),n(20,"h2"),a(21,"Outputs"),t(),n(22,"table",1),s(23,2),d(24,et,2,0,"th",3)(25,nt,3,1,"td",4),u(),s(26,5),d(27,it,2,0,"th",3)(28,at,3,1,"td",4),u(),s(29,6),d(30,ot,2,0,"th",3)(31,rt,2,1,"td",4),u(),d(32,lt,1,0,"tr",8)(33,pt,1,0,"tr",9),t()()),l&2&&(i(5),o("dataSource",p.inputs),i(13),o("matHeaderRowDef",p.displayedColumns),i(),o("matRowDefColumns",p.displayedColumns),i(3),o("dataSource",p.outputs),i(10),o("matHeaderRowDef",p.outputColumns),i(),o("matRowDefColumns",p.outputColumns))},dependencies:[L,A,k,N,I,F,$,z,H,V,W,x],styles:[".docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.api-table[_ngcontent-%COMP%]{width:100%;margin-bottom:32px}code[_ngcontent-%COMP%]{background-color:var(--mat-sys-surface-container);padding:2px 6px;border-radius:4px;font-family:Roboto Mono,monospace;font-size:13px}th[_ngcontent-%COMP%]{font-weight:600;color:var(--mat-sys-on-surface-variant)}"]})};var h=class e{customColorCode=`// Custom button color using CSS variables
.custom-button {
  --mat-filled-button-container-color: #6200ee;
  --mat-filled-button-label-text-color: #ffffff;
}

// Or override specific variant
.acp-button.custom-variant {
  background-color: var(--mat-sys-tertiary);
  color: var(--mat-sys-on-tertiary);

  &:hover {
    background-color: var(--mat-sys-tertiary-container);
  }
}`;sizingCode=`// Custom button sizes
.button-small {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
}

.button-large {
  height: 56px;
  padding: 0 32px;
  font-size: 16px;
}

// Full-width button
.button-full-width {
  width: 100%;
  display: flex;
  justify-content: center;
}`;customVariantCode=`// Create a custom gradient button
.button-gradient {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);

  &:hover {
    background: linear-gradient(45deg, #fe8ba0 30%, #ffa070 90%);
  }
}

// Responsive button styling
@media (max-width: 600px) {
  .acp-button {
    width: 100%;
    margin: 4px 0;
  }
}`;static \u0275fac=function(l){return new(l||e)};static \u0275cmp=c({type:e,selectors:[["app-button-styling"]],decls:39,vars:6,consts:[[1,"docs-component-viewer-content"],[1,"docs-component-description"],[1,"docs-example-card"],[1,"features-list"],[3,"code","language"],[1,"section-description"]],template:function(l,p){l&1&&(n(0,"div",0)(1,"app-doc-heading"),a(2,"Button Styling"),t(),n(3,"p",1),a(4," Customize button appearance using CSS variables and SCSS mixins. All buttons support Material Design 3 theming and custom styling. "),t(),n(5,"h2"),a(6,"CSS Variables"),t(),n(7,"mat-card",2)(8,"mat-card-content")(9,"p"),a(10,"Use Material Design 3 tokens for consistent theming:"),t(),n(11,"ul",3)(12,"li")(13,"code"),a(14,"--mat-sys-primary"),t(),a(15," - Primary color"),t(),n(16,"li")(17,"code"),a(18,"--mat-sys-on-primary"),t(),a(19," - Text color on primary"),t(),n(20,"li")(21,"code"),a(22,"--mat-sys-surface"),t(),a(23," - Surface color"),t(),n(24,"li")(25,"code"),a(26,"--mat-sys-outline"),t(),a(27," - Border color"),t()()()(),n(28,"h2"),a(29,"Custom Button Colors"),t(),m(30,"app-code-example",4),n(31,"h2"),a(32,"Button Sizing"),t(),m(33,"app-code-example",4),n(34,"h2"),a(35,"Custom Variants"),t(),n(36,"p",5),a(37," Create custom button variants by extending the base button styles. "),t(),m(38,"app-code-example",4),t()),l&2&&(i(30),o("code",p.customColorCode)("language","styles"),i(3),o("code",p.sizingCode)("language","styles"),i(5),o("code",p.customVariantCode)("language","styles"))},dependencies:[g,v,b,x,C],styles:[".docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%], .section-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:24px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}.features-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:16px 0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:8px 0;font-size:14px}code[_ngcontent-%COMP%]{background-color:var(--mat-sys-surface-container);padding:2px 6px;border-radius:4px;font-family:Roboto Mono,monospace;font-size:13px}"]})};var Dt=[{path:"",redirectTo:"overview",pathMatch:"full"},{path:"overview",component:S,pathMatch:"full"},{path:"examples",component:_},{path:"api",component:E},{path:"styling",component:h},{path:"**",redirectTo:"overview"}];export{Dt as routes};
