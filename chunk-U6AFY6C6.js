import{a as se,b as v}from"./chunk-TEMGEHUK.js";import"./chunk-IS3KC4W2.js";import{b as ie}from"./chunk-ZTXRY76I.js";import"./chunk-4JMGPBNX.js";import{a as O}from"./chunk-2H7DIYLF.js";import{A as Ce,B as be,C as xe,D as Se,L as N,j as me,l as ce,t as pe,u as ue,v as ge,w as fe,x as he,y as ye,z as we}from"./chunk-H5QXEMOA.js";import"./chunk-7JP3HI6F.js";import"./chunk-57Q2UAVZ.js";import{a as S}from"./chunk-QJ46N2FA.js";import{a as le,b as de,c as I,e as R,j as F}from"./chunk-U7VJQUDE.js";import{c as ne,d as oe,g as re}from"./chunk-XJJY6XHD.js";import{$b as t,Ab as s,Eb as g,Fb as f,Hb as M,Kb as b,Mb as T,Pa as l,Wb as P,Yc as J,Zc as ee,_b as Q,_c as te,ab as C,ac as h,bc as x,dd as ae,gb as p,ia as j,jc as Y,lc as Z,ma as y,na as w,pc as A,qb as _,qc as G,rc as K,sb as E,ub as U,vb as q,vc as k,wb as X,xb as d,yb as i,za as D,zb as e}from"./chunk-GV4MRAZ3.js";var De=[{position:1,name:"Boron",tag:[{color:"red",value:[1,2]}],weight:10.811,symbol:"B",gender:"male",mobile:"13198765432",tele:"567891234",city:"Berlin",address:"Bernauer Str.111,13355",date:"1423456765768",website:"www.acontplus.com",company:"AcontPlus",email:"boron@gmail.com",status:!1,cost:4},{position:2,name:"AcontPlus",tag:[{color:"blue",value:[3,4]}],weight:8.0026,symbol:"He",gender:"female",mobile:"13034676675",tele:"80675432",city:"Shanghai",address:"88 Songshan Road",date:"1423456765768",website:"www.acontplus.com",company:"AcontPlus",email:"acontplus@gmail.com",status:!0,cost:5},{position:3,name:"Nitrogen",tag:[{color:"yellow",value:[5,6]}],weight:14.0067,symbol:"N",gender:"male",mobile:"15811112222",tele:"345678912",city:"Sydney",address:"Circular Quay, Sydney NSW 2000",date:"1423456765768",website:"www.acontplus.com",company:"AcontPlus",email:"nitrogen@gmail.com",status:!0,cost:2},{position:4,name:"Systaprs",tag:[{color:"green",value:[7,8]}],weight:11.234,symbol:"Sy",gender:"male",mobile:"09987654321",tele:"112233445",city:"Cuenca",address:"Av. Loja 123",date:"1657896543210",website:"www.systaprs.com",company:"Systaprs Corp",email:"info@systaprs.com",status:!0,cost:7},{position:5,name:"Acontplus",tag:[{color:"purple",value:[9,10]}],weight:15.876,symbol:"Ap",gender:"male",mobile:"0981122334",tele:"221133445",city:"Loja",address:"Av. Universitaria 202",date:"1662345678901",website:"www.acontplus.com",company:"Acontplus",email:"contacto@acontplus.com",status:!0,cost:9},{position:6,name:"Emilio",tag:[{color:"orange",value:[11,12]}],weight:13.001,symbol:"Em",gender:"male",mobile:"0999999999",tele:"556677889",city:"Zamora",address:"Barrio La Paz",date:"1678901234567",website:"www.emilio.dev",company:"EYSW",email:"emilio@eysw.dev",status:!0,cost:10},{position:7,name:"Alexis",tag:[{color:"pink",value:[13,14]}],weight:9.876,symbol:"Ax",gender:"female",mobile:"0976543210",tele:"667788990",city:"Guayaquil",address:"Av. del Bombero 50",date:"1678907654321",website:"www.alexisdesign.com",company:"Alexis Studio",email:"alexis@studio.com",status:!1,cost:6},{position:8,name:"Iv\xE1n",tag:[{color:"cyan",value:[15,16]}],weight:17.002,symbol:"Iv",gender:"male",mobile:"0981234567",tele:"445566778",city:"Madrid",address:"Gran V\xEDa 120",date:"1672345678912",website:"www.ivan-tech.com",company:"IvanTech",email:"ivan@ivantech.com",status:!0,cost:8},{position:9,name:"Danis",tag:[{color:"teal",value:[17,18]}],weight:16.345,symbol:"Ds",gender:"male",mobile:"0998877665",tele:"778899001",city:"Buenos Aires",address:"Av. Corrientes 900",date:"1698765432100",website:"www.danisworks.com",company:"DanisWorks",email:"danis@works.com",status:!1,cost:5}];var B=class a{columns=[{header:"Name",field:"name"},{header:"Weight",field:"weight",type:"number",typeParameter:{digitsInfo:"1.2-2"}},{header:"Gender",field:"gender"},{header:"Mobile",field:"mobile"},{header:"City",field:"city"},{header:"Date",field:"date",type:"date",typeParameter:{format:"yyyy-MM-dd"}}];list=De;trackByName(n,r){return r.name}static \u0275fac=function(r){return new(r||a)};static \u0275cmp=C({type:a,selectors:[["app-data-grid-basic-example"]],decls:1,vars:3,consts:[[3,"data","columns","trackBy"]],template:function(r,o){r&1&&s(0,"acp-data-grid",0),r&2&&d("data",o.list)("columns",o.columns)("trackBy",o.trackByName)},dependencies:[N],encapsulation:2})};v.highlightAll();var ve=`<acp-data-grid [data]="list" [columns]="columns" [trackBy]="trackByName"></acp-data-grid>
`,_e=`
import { DataGrid, DataGridColumn } from '@acontplus/ng-components';
import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';

@Component({
  selector: 'app-data-grid-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DataGrid],
})
export class App {
  columns: DataGridColumn[] = [
    { header: 'Name', field: 'name' },
    {
      header: 'Weight',
      field: 'weight',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.2-2',
      },
    },
    { header: 'Gender', field: 'gender' },
    { header: 'Mobile', field: 'mobile' },
    { header: 'City', field: 'city' },
    {
      header: 'Date',
      field: 'date',
      type: 'date',
      typeParameter: {
        format: 'yyyy-MM-dd',
      },
    },
  ];

  list = EXAMPLE_DATA;

  trackByName(index: number, item: any) {
    return item.name;
  }
}

`,Ee="/* Estilos espec\xEDficos para el ejemplo de Data Grid b\xE1sico */",Te=`export const EXAMPLE_DATA: any[] = [
  {
    position: 1,
    name: 'Boron',
    tag: [{ color: 'red', value: [1, 2] }],
    weight: 10.811,
    symbol: 'B',
    gender: 'male',
    mobile: '13198765432',
    tele: '567891234',
    city: 'Berlin',
    address: 'Bernauer Str.111,13355',
    date: '1423456765768',
    website: 'www.acontplus.com',
    company: 'AcontPlus',
    email: 'boron@gmail.com',
    status: false,
    cost: 4,
  },
  {
    position: 2,
    name: 'AcontPlus',
    tag: [{ color: 'blue', value: [3, 4] }],
    weight: 8.0026,
    symbol: 'He',
    gender: 'female',
    mobile: '13034676675',
    tele: '80675432',
    city: 'Shanghai',
    address: '88 Songshan Road',
    date: '1423456765768',
    website: 'www.acontplus.com',
    company: 'AcontPlus',
    email: 'acontplus@gmail.com',
    status: true,
    cost: 5,
  },
  {
    position: 3,
    name: 'Nitrogen',
    tag: [{ color: 'yellow', value: [5, 6] }],
    weight: 14.0067,
    symbol: 'N',
    gender: 'male',
    mobile: '15811112222',
    tele: '345678912',
    city: 'Sydney',
    address: 'Circular Quay, Sydney NSW 2000',
    date: '1423456765768',
    website: 'www.acontplus.com',
    company: 'AcontPlus',
    email: 'nitrogen@gmail.com',
    status: true,
    cost: 2,
  },
  {
    position: 4,
    name: 'Systaprs',
    tag: [{ color: 'green', value: [7, 8] }],
    weight: 11.234,
    symbol: 'Sy',
    gender: 'male',
    mobile: '09987654321',
    tele: '112233445',
    city: 'Cuenca',
    address: 'Av. Loja 123',
    date: '1657896543210',
    website: 'www.systaprs.com',
    company: 'Systaprs Corp',
    email: 'info@systaprs.com',
    status: true,
    cost: 7,
  },
  {
    position: 5,
    name: 'Acontplus',
    tag: [{ color: 'purple', value: [9, 10] }],
    weight: 15.876,
    symbol: 'Ap',
    gender: 'male',
    mobile: '0981122334',
    tele: '221133445',
    city: 'Loja',
    address: 'Av. Universitaria 202',
    date: '1662345678901',
    website: 'www.acontplus.com',
    company: 'Acontplus',
    email: 'contacto@acontplus.com',
    status: true,
    cost: 9,
  },
  {
    position: 6,
    name: 'Emilio',
    tag: [{ color: 'orange', value: [11, 12] }],
    weight: 13.001,
    symbol: 'Em',
    gender: 'male',
    mobile: '0999999999',
    tele: '556677889',
    city: 'Zamora',
    address: 'Barrio La Paz',
    date: '1678901234567',
    website: 'www.emilio.dev',
    company: 'EYSW',
    email: 'emilio@eysw.dev',
    status: true,
    cost: 10,
  },
  {
    position: 7,
    name: 'Alexis',
    tag: [{ color: 'pink', value: [13, 14] }],
    weight: 9.876,
    symbol: 'Ax',
    gender: 'female',
    mobile: '0976543210',
    tele: '667788990',
    city: 'Guayaquil',
    address: 'Av. del Bombero 50',
    date: '1678907654321',
    website: 'www.alexisdesign.com',
    company: 'Alexis Studio',
    email: 'alexis@studio.com',
    status: false,
    cost: 6,
  },
  {
    position: 8,
    name: 'Iv\xE1n',
    tag: [{ color: 'cyan', value: [15, 16] }],
    weight: 17.002,
    symbol: 'Iv',
    gender: 'male',
    mobile: '0981234567',
    tele: '445566778',
    city: 'Madrid',
    address: 'Gran V\xEDa 120',
    date: '1672345678912',
    website: 'www.ivan-tech.com',
    company: 'IvanTech',
    email: 'ivan@ivantech.com',
    status: true,
    cost: 8,
  },
  {
    position: 9,
    name: 'Danis',
    tag: [{ color: 'teal', value: [17, 18] }],
    weight: 16.345,
    symbol: 'Ds',
    gender: 'male',
    mobile: '0998877665',
    tele: '778899001',
    city: 'Buenos Aires',
    address: 'Av. Corrientes 900',
    date: '1698765432100',
    website: 'www.danisworks.com',
    company: 'DanisWorks',
    email: 'danis@works.com',
    status: false,
    cost: 5,
  },
];


`,Ae={title:"Basic",component:B,files:[{file:"app.html",content:v.highlightAuto(ve).value,filecontent:ve},{file:"app.ts",content:v.highlightAuto(_e).value,filecontent:_e},{file:"app.styles",content:v.highlightAuto(Ee).value,filecontent:Ee},{file:"data.ts",content:v.highlightAuto(Te).value,filecontent:Te}]};var Pe=()=>[5,10,25],Ge=(a,n)=>({status:a,actions:n});function ke(a,n){if(a&1){let r=M();i(0,"button",21),b("click",function(){y(r);let c=T();return w(c.clearSelection())}),t(1,"Clear"),e()}}function Ie(a,n){if(a&1&&(i(0,"div",22)(1,"h4"),t(2),e(),i(3,"p")(4,"strong"),t(5,"Description:"),e(),t(6),e(),i(7,"p")(8,"strong"),t(9,"Category:"),e(),t(10),e(),i(11,"p")(12,"strong"),t(13,"Created:"),e(),t(14),A(15,"date"),e()()),a&2){let r=n.$implicit;l(2),x("Details for ",r.name),l(4),x(" ",r.description),l(4),x(" ",r.category),l(4),x(" ",K(15,4,r.createdAt,"medium"))}}function Re(a,n){if(a&1&&(i(0,"mat-chip"),t(1),A(2,"titlecase"),e()),a&2){let r=n.rowData;Q("status-"+r.status),l(),x(" ",G(2,3,r.status)," ")}}function Fe(a,n){if(a&1){let r=M();i(0,"button",23),b("click",function(c){let m=y(r).rowData;return T().onEdit(m),w(c.stopPropagation())}),i(1,"mat-icon"),t(2,"edit"),e()(),i(3,"button",24),b("click",function(c){let m=y(r).rowData;return T().onDelete(m),w(c.stopPropagation())}),i(4,"mat-icon"),t(5,"delete"),e()()}}function Oe(a,n){if(a&1&&(i(0,"p",18),t(1),e()),a&2){let r=T();l(),x("Last cell clicked: ",r.lastCellClick())}}var V=class a{selectedRows=D([]);isLoading=D(!1);serverData=D([]);lastCellClick=D("");highlightedIndex=D(-1);focusedIndex=D(-1);totalItems=50;basicData=this.generateData(5);demoData=this.generateData(10);paginatedData=this.generateData(25);styledData=this.generateData(8);basicColumns=[{field:"id",header:"ID",type:"number",width:"80px"},{field:"name",header:"Name"},{field:"price",header:"Price",type:"currency"},{field:"quantity",header:"Qty",type:"number",width:"80px"}];selectionColumns=[{field:"id",header:"ID",type:"number",width:"80px"},{field:"name",header:"Name"},{field:"status",header:"Status"}];sortableColumns=[{field:"id",header:"ID",type:"number",sortable:!0},{field:"name",header:"Name",sortable:!0},{field:"price",header:"Price",type:"currency",sortable:!0},{field:"createdAt",header:"Created",type:"date",sortable:!0}];styledColumns=[{field:"id",header:"ID",type:"number"},{field:"name",header:"Name"},{field:"status",header:"Status"},{field:"category",header:"Category"}];templateColumns=[{field:"id",header:"ID",type:"number"},{field:"name",header:"Name"},{field:"status",header:"Status"},{field:"actions",header:"Actions",width:"120px"}];rowClassFormatter={"row-completed":n=>n.status==="completed","row-pending":n=>n.status==="pending","row-failed":n=>n.status==="failed"};rowSelectionFormatter={disabled:n=>n.disableSelection===!0,hideCheckbox:n=>n.status==="failed"};constructor(){this.loadServerData(0,5)}generateData(n){let r=["pending","processing","completed","failed"],o=["Electronics","Clothing","Food","Books","Sports"];return Array.from({length:n},(c,m)=>({id:m+1,name:`Product ${m+1}`,description:`Description for product ${m+1}`,price:Math.round(Math.random()*1e3*100)/100,quantity:Math.floor(Math.random()*100),category:o[m%o.length],status:r[m%r.length],createdAt:new Date(Date.now()-Math.random()*1e10),disableSelection:m===1}))}loadServerData(n,r){this.isLoading.set(!0),setTimeout(()=>{let o=n*r;this.serverData.set(Array.from({length:r},(c,m)=>({id:o+m+1,name:`Server Item ${o+m+1}`,description:`Server description ${o+m+1}`,price:Math.round(Math.random()*500*100)/100,quantity:Math.floor(Math.random()*50),category:"Server Category",status:"completed",createdAt:new Date}))),this.isLoading.set(!1)},500)}onRowSelected(n){this.selectedRows.set(n)}clearSelection(){this.selectedRows.set([])}onSortChange(n){console.info("Sort changed:",n)}onPageChange(n){console.info("Page changed:",n)}onServerPageChange(n){this.loadServerData(n.pageIndex,n.pageSize)}onEdit(n){console.info("Edit:",n)}onDelete(n){console.info("Delete:",n)}onCellClick(n){this.lastCellClick.set(`${n.column.field}: ${n.row[n.column.field]}`)}onFocusedRowChange(n){this.focusedIndex.set(n.index),this.highlightedIndex.set(n.index)}basicCode=`// Basic Data Grid
columns: DataGridColumn[] = [
  { field: 'id', header: 'ID', type: 'number', width: '80px' },
  { field: 'name', header: 'Name' },
  { field: 'price', header: 'Price', type: 'currency' },
  { field: 'quantity', header: 'Qty', type: 'number' },
];

<acp-data-grid [data]="data" [columns]="columns" />`;selectionCode=`// Row Selection
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowSelectable]="true"
  [multiSelectable]="true"
  [rowSelectionFormatter]="rowSelectionFormatter"
  (rowSelectedChange)="onRowSelected($event)"
/>

rowSelectionFormatter = {
  disabled: (row) => row.disableSelection,
  hideCheckbox: (row) => row.status === 'failed',
};`;sortingCode=`// Sortable Columns
columns: DataGridColumn[] = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'price', header: 'Price', sortable: true },
];

<acp-data-grid
  [data]="data"
  [columns]="columns"
  [sortOnFront]="true"
  sortActive="name"
  sortDirection="asc"
  (sortChange)="onSortChange($event)"
/>`;paginationCode=`// Client-side Pagination
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [showPaginator]="true"
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 25]"
  (page)="onPageChange($event)"
/>`;serverPaginationCode=`// Server-side Pagination
<acp-data-grid
  [data]="serverData()"
  [columns]="columns"
  [showPaginator]="true"
  [pageOnFront]="false"
  [length]="totalItems"
  [pageSize]="5"
  [loading]="isLoading()"
  (page)="onServerPageChange($event)"
/>

onServerPageChange(event: PageEvent) {
  this.loadServerData(event.pageIndex, event.pageSize);
}`;rowStylingCode=`// Row Styling with Class Formatter
rowClassFormatter = {
  'row-completed': (row) => row.status === 'completed',
  'row-pending': (row) => row.status === 'pending',
  'row-failed': (row) => row.status === 'failed',
};

<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowClassFormatter]="rowClassFormatter"
  [rowStriped]="true"
/>`;expandableCode=`// Expandable Rows
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [expandable]="true"
  [expansionTemplate]="expansionTpl"
  [closeOthersOnExpand]="true"
/>

<ng-template #expansionTpl let-row>
  <div class="expansion-content">
    <h4>{{ row.name }}</h4>
    <p>{{ row.description }}</p>
  </div>
</ng-template>`;cellTemplateCode=`// Custom Cell Templates
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [cellTemplate]="{ status: statusTpl, actions: actionsTpl }"
/>

<ng-template #statusTpl let-rowData="rowData">
  <mat-chip [class]="'status-' + rowData.status">
    {{ rowData.status | titlecase }}
  </mat-chip>
</ng-template>

<ng-template #actionsTpl let-rowData="rowData">
  <button mat-icon-button (click)="onEdit(rowData)">
    <mat-icon>edit</mat-icon>
  </button>
</ng-template>`;toolbarCode=`<acp-data-grid
  [data]="data"
  [columns]="columns"
  [showToolbar]="true"
  [showColumnMenuButton]="true"
  toolbarTitle="Products"
/>`;cellSelectionCode=`// Cell Selection
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [cellSelectable]="true"
  (cellClick)="onCellClick($event)"
/>

onCellClick(event: { row: T; column: DataGridColumn }) {
  console.log('Cell clicked:', event.column.field, event.row);
}`;keyboardNavCode=`<acp-data-grid
  [data]="data"
  [columns]="columns"
  [keyboardNavigation]="true"
  [highlightedRowIndex]="highlightedIndex()"
  (focusedRowChange)="onFocusedRowChange($event)"
/>`;static \u0275fac=function(r){return new(r||a)};static \u0275cmp=C({type:a,selectors:[["app-data-grid-examples"]],decls:84,vars:75,consts:[["expansionTpl",""],["statusTpl",""],["actionsTpl",""],[1,"docs-component-viewer-content"],[1,"example-card"],[3,"data","columns"],[3,"code","language"],[1,"selection-info"],["mat-button",""],[3,"rowSelectedChange","data","columns","rowSelectable","multiSelectable","rowSelectionFormatter"],["sortActive","name","sortDirection","asc",3,"sortChange","data","columns","sortOnFront"],[3,"page","data","columns","showPaginator","pageSize","pageSizeOptions"],[3,"page","data","columns","showPaginator","pageOnFront","length","pageSize","loading"],[3,"data","columns","rowClassFormatter","rowStriped"],[3,"data","columns","expandable","expansionTemplate","closeOthersOnExpand"],[3,"data","columns","cellTemplate"],["toolbarTitle","Products",3,"data","columns","showToolbar","showColumnMenuButton"],[3,"cellClick","data","columns","cellSelectable"],[1,"cell-info"],[1,"instruction"],[3,"focusedRowChange","data","columns","keyboardNavigation","highlightedRowIndex"],["mat-button","",3,"click"],[1,"expansion-content"],["mat-icon-button","",3,"click"],["mat-icon-button","","color","warn",3,"click"]],template:function(r,o){if(r&1){let c=M();i(0,"div",3)(1,"app-doc-heading"),t(2,"Data Grid Examples"),e(),i(3,"h2"),t(4,"Basic Usage"),e(),i(5,"mat-card",4)(6,"mat-card-content"),s(7,"acp-data-grid",5),e()(),s(8,"app-code-example",6),i(9,"h2"),t(10,"Row Selection"),e(),i(11,"mat-card",4)(12,"mat-card-content")(13,"div",7)(14,"span"),t(15),e(),_(16,ke,2,0,"button",8),e(),i(17,"acp-data-grid",9),b("rowSelectedChange",function(u){return y(c),w(o.onRowSelected(u))}),e()()(),s(18,"app-code-example",6),i(19,"h2"),t(20,"Sorting"),e(),i(21,"mat-card",4)(22,"mat-card-content")(23,"acp-data-grid",10),b("sortChange",function(u){return y(c),w(o.onSortChange(u))}),e()()(),s(24,"app-code-example",6),i(25,"h2"),t(26,"Pagination"),e(),i(27,"mat-card",4)(28,"mat-card-content")(29,"acp-data-grid",11),b("page",function(u){return y(c),w(o.onPageChange(u))}),e()()(),s(30,"app-code-example",6),i(31,"h2"),t(32,"Server-side Pagination"),e(),i(33,"mat-card",4)(34,"mat-card-content")(35,"acp-data-grid",12),b("page",function(u){return y(c),w(o.onServerPageChange(u))}),e()()(),s(36,"app-code-example",6),i(37,"h2"),t(38,"Row Styling"),e(),i(39,"mat-card",4)(40,"mat-card-content"),s(41,"acp-data-grid",13),e()(),s(42,"app-code-example",6),i(43,"h2"),t(44,"Expandable Rows"),e(),i(45,"mat-card",4)(46,"mat-card-content"),s(47,"acp-data-grid",14),p(48,Ie,16,7,"ng-template",null,0,k),e()(),s(50,"app-code-example",6),i(51,"h2"),t(52,"Custom Cell Templates"),e(),i(53,"mat-card",4)(54,"mat-card-content"),s(55,"acp-data-grid",15),p(56,Re,3,5,"ng-template",null,1,k)(58,Fe,6,0,"ng-template",null,2,k),e()(),s(60,"app-code-example",6),i(61,"h2"),t(62,"Toolbar with Column Menu"),e(),i(63,"mat-card",4)(64,"mat-card-content"),s(65,"acp-data-grid",16),e()(),s(66,"app-code-example",6),i(67,"h2"),t(68,"Cell Selection"),e(),i(69,"mat-card",4)(70,"mat-card-content")(71,"acp-data-grid",17),b("cellClick",function(u){return y(c),w(o.onCellClick(u))}),e(),_(72,Oe,2,1,"p",18),e()(),s(73,"app-code-example",6),i(74,"h2"),t(75,"Keyboard Navigation"),e(),i(76,"mat-card",4)(77,"mat-card-content")(78,"p",19),t(79,"Use arrow keys to navigate, Enter to select"),e(),i(80,"acp-data-grid",20),b("focusedRowChange",function(u){return y(c),w(o.onFocusedRowChange(u))}),e(),i(81,"p",18),t(82),e()()(),s(83,"app-code-example",6),e()}if(r&2){let c=P(49),m=P(57),u=P(59);l(7),d("data",o.basicData)("columns",o.basicColumns),l(),d("code",o.basicCode)("language","typescript"),l(7),x("Selected: ",o.selectedRows().length," items"),l(),E(o.selectedRows().length>0?16:-1),l(),d("data",o.demoData)("columns",o.selectionColumns)("rowSelectable",!0)("multiSelectable",!0)("rowSelectionFormatter",o.rowSelectionFormatter),l(),d("code",o.selectionCode)("language","typescript"),l(5),d("data",o.demoData)("columns",o.sortableColumns)("sortOnFront",!0),l(),d("code",o.sortingCode)("language","typescript"),l(5),d("data",o.paginatedData)("columns",o.basicColumns)("showPaginator",!0)("pageSize",5)("pageSizeOptions",Y(71,Pe)),l(),d("code",o.paginationCode)("language","typescript"),l(5),d("data",o.serverData())("columns",o.basicColumns)("showPaginator",!0)("pageOnFront",!1)("length",o.totalItems)("pageSize",5)("loading",o.isLoading()),l(),d("code",o.serverPaginationCode)("language","typescript"),l(5),d("data",o.styledData)("columns",o.styledColumns)("rowClassFormatter",o.rowClassFormatter)("rowStriped",!0),l(),d("code",o.rowStylingCode)("language","typescript"),l(5),d("data",o.demoData.slice(0,5))("columns",o.basicColumns)("expandable",!0)("expansionTemplate",c)("closeOthersOnExpand",!0),l(3),d("code",o.expandableCode)("language","typescript"),l(5),d("data",o.demoData.slice(0,5))("columns",o.templateColumns)("cellTemplate",Z(72,Ge,m,u)),l(5),d("code",o.cellTemplateCode)("language","typescript"),l(5),d("data",o.demoData.slice(0,5))("columns",o.basicColumns)("showToolbar",!0)("showColumnMenuButton",!0),l(),d("code",o.toolbarCode)("language","html"),l(5),d("data",o.demoData.slice(0,5))("columns",o.basicColumns)("cellSelectable",!0),l(),E(o.lastCellClick()?72:-1),l(),d("code",o.cellSelectionCode)("language","typescript"),l(7),d("data",o.demoData.slice(0,5))("columns",o.basicColumns)("keyboardNavigation",!0)("highlightedRowIndex",o.highlightedIndex()),l(2),x("Focused row: ",o.focusedIndex()),l(),d("code",o.keyboardNavCode)("language","html")}},dependencies:[ae,F,I,R,re,oe,ne,ce,me,de,le,N,S,O,ee,te],styles:[".docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1400px}h2[_ngcontent-%COMP%]{margin-top:32px;margin-bottom:16px}.example-card[_ngcontent-%COMP%]{margin-bottom:16px}.selection-info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;padding:.5rem;background:var(--mat-sys-surface-container);border-radius:4px}.expansion-content[_ngcontent-%COMP%]{padding:1rem;background:var(--mat-sys-surface-container-low);border-radius:4px;margin:.5rem 0}.cell-info[_ngcontent-%COMP%], .instruction[_ngcontent-%COMP%]{margin-top:8px;color:var(--mat-sys-on-surface-variant)}.status-pending[_ngcontent-%COMP%]{background-color:var(--mat-sys-warning-container)!important;color:var(--mat-sys-on-warning-container)!important}.status-processing[_ngcontent-%COMP%]{background-color:var(--mat-sys-primary-container)!important;color:var(--mat-sys-on-primary-container)!important}.status-completed[_ngcontent-%COMP%]{background-color:var(--mat-sys-tertiary-container)!important;color:var(--mat-sys-on-tertiary-container)!important}.status-failed[_ngcontent-%COMP%]{background-color:var(--mat-sys-error-container)!important;color:var(--mat-sys-on-error-container)!important}  .row-completed{background-color:var(--mat-sys-tertiary-container)}  .row-pending{background-color:var(--mat-sys-warning-container)}  .row-failed{background-color:var(--mat-sys-error-container)}"]})};function Ne(a,n){a&1&&(i(0,"th",10),t(1,"Name"),e())}function Be(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.name)}}function ze(a,n){a&1&&(i(0,"th",10),t(1,"Type"),e())}function He(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.type)}}function Ve(a,n){a&1&&(i(0,"th",10),t(1,"Description"),e())}function $e(a,n){if(a&1&&(i(0,"td",11),t(1),e()),a&2){let r=n.$implicit;l(),h(r.description)}}function Le(a,n){a&1&&(i(0,"th",10),t(1,"Default"),e())}function We(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.default||"-")}}function je(a,n){a&1&&s(0,"tr",12)}function Ue(a,n){a&1&&s(0,"tr",13)}function qe(a,n){a&1&&(i(0,"th",10),t(1,"Name"),e())}function Xe(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.name)}}function Qe(a,n){a&1&&(i(0,"th",10),t(1,"Type"),e())}function Ye(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.type)}}function Ze(a,n){a&1&&(i(0,"th",10),t(1,"Description"),e())}function Ke(a,n){if(a&1&&(i(0,"td",11),t(1),e()),a&2){let r=n.$implicit;l(),h(r.description)}}function Je(a,n){a&1&&(i(0,"th",10),t(1,"Default"),e())}function et(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.default||"-")}}function tt(a,n){a&1&&s(0,"tr",12)}function at(a,n){a&1&&s(0,"tr",13)}function it(a,n){a&1&&(i(0,"th",10),t(1,"Property"),e())}function nt(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.name)}}function ot(a,n){a&1&&(i(0,"th",10),t(1,"Type"),e())}function rt(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.type)}}function lt(a,n){a&1&&(i(0,"th",10),t(1,"Description"),e())}function dt(a,n){if(a&1&&(i(0,"td",11),t(1),e()),a&2){let r=n.$implicit;l(),h(r.description)}}function st(a,n){a&1&&(i(0,"th",10),t(1,"Default"),e())}function mt(a,n){if(a&1&&(i(0,"td",11)(1,"code"),t(2),e()()),a&2){let r=n.$implicit;l(2),h(r.default||"-")}}function ct(a,n){a&1&&s(0,"tr",12)}function pt(a,n){a&1&&s(0,"tr",13)}var $=class a{displayedColumns=["name","type","description","default"];inputs=[{name:"data",type:"T[]",description:"Array of data to display in the grid",default:"[]"},{name:"columns",type:"DataGridColumn<T>[]",description:"Column definitions",default:"[]"},{name:"length",type:"number",description:"Total number of items (for server-side pagination)",default:"0"},{name:"loading",type:"boolean",description:"Shows loading state",default:"false"},{name:"emptyValuePlaceholder",type:"string",description:"Placeholder for empty cell values",default:"'-'"},{name:"trackBy",type:"TrackByFunction<any>",description:"TrackBy function for ngFor optimization",default:"-"},{name:"showToolbar",type:"boolean",description:"Shows the toolbar",default:"false"},{name:"showColumnMenuButton",type:"boolean",description:"Shows column visibility menu",default:"true"},{name:"toolbarTitle",type:"string",description:"Title displayed in toolbar",default:"''"},{name:"showPaginator",type:"boolean",description:"Shows the paginator",default:"true"},{name:"pageOnFront",type:"boolean",description:"Enable client-side pagination",default:"true"},{name:"pageIndex",type:"number",description:"Current page index (0-based)",default:"0"},{name:"pageSize",type:"number",description:"Number of items per page",default:"10"},{name:"pageSizeOptions",type:"number[]",description:"Page size options",default:"[5, 10, 20, 50]"},{name:"showFirstLastButtons",type:"boolean",description:"Shows first/last page buttons",default:"true"},{name:"hidePageSize",type:"boolean",description:"Hides page size selector",default:"false"},{name:"pageDisabled",type:"boolean",description:"Disables pagination",default:"false"},{name:"sortOnFront",type:"boolean",description:"Enable client-side sorting",default:"true"},{name:"sortActive",type:"string",description:"Initially sorted column field",default:"''"},{name:"sortDirection",type:"SortDirection",description:"Initial sort direction",default:"''"},{name:"sortDisabled",type:"boolean",description:"Disables sorting",default:"false"},{name:"sortDisableClear",type:"boolean",description:"Prevents clearing sort",default:"false"},{name:"sortStart",type:"'asc' | 'desc'",description:"Default sort direction on first click",default:"'asc'"},{name:"rowSelectable",type:"boolean",description:"Enables row selection",default:"false"},{name:"multiSelectable",type:"boolean",description:"Allows multi-row selection",default:"true"},{name:"multiSelectionWithClick",type:"boolean",description:"Toggle selection on row click",default:"false"},{name:"hideRowSelectionCheckbox",type:"boolean",description:"Hides selection checkboxes",default:"false"},{name:"disableRowClickSelection",type:"boolean",description:"Disables row click selection",default:"false"},{name:"rowSelected",type:"T[]",description:"Pre-selected rows",default:"[]"},{name:"rowSelectionFormatter",type:"DataGridRowSelectionFormatter",description:"Formatter for row selection",default:"{}"},{name:"rowHover",type:"boolean",description:"Enables row hover effect",default:"true"},{name:"rowStriped",type:"boolean",description:"Alternating row colors",default:"false"},{name:"rowClassFormatter",type:"DataGridRowClassFormatter",description:"Dynamic row CSS classes",default:"-"},{name:"highlightedRowIndex",type:"number",description:"Index of highlighted row",default:"-1"},{name:"cellSelectable",type:"boolean",description:"Enables cell selection",default:"false"},{name:"expandable",type:"boolean",description:"Enables row expansion",default:"false"},{name:"expansionTemplate",type:"TemplateRef<any>",description:"Template for expanded content",default:"null"},{name:"closeOthersOnExpand",type:"boolean",description:"Close other rows when expanding",default:"false"},{name:"infiniteScroll",type:"boolean",description:"Enables infinite scroll",default:"false"},{name:"infiniteScrollThreshold",type:"number",description:"Scroll threshold (0-1)",default:"0.8"},{name:"infiniteScrollDisabled",type:"boolean",description:"Disables infinite scroll",default:"false"},{name:"keyboardNavigation",type:"boolean",description:"Enables arrow key navigation",default:"false"},{name:"cellTemplate",type:"Record<string, TemplateRef<any>>",description:"Custom cell templates by field",default:"{}"},{name:"headerTemplate",type:"TemplateRef<any>",description:"Custom header template",default:"-"},{name:"noResultTemplate",type:"TemplateRef<any>",description:"Template for empty state",default:"-"},{name:"paginationTemplate",type:"TemplateRef<any>",description:"Custom pagination template",default:"-"},{name:"summaryTemplate",type:"TemplateRef<any>",description:"Summary row template",default:"-"},{name:"size",type:"'small' | 'medium' | 'normal'",description:"Table density",default:"'normal'"},{name:"showSummary",type:"boolean",description:"Shows summary row",default:"false"},{name:"noResultText",type:"string",description:"Empty state message",default:"'No records found'"}];outputs=[{name:"page",type:"EventEmitter<PageEvent>",description:"Emits when page changes"},{name:"sortChange",type:"EventEmitter<Sort>",description:"Emits when sort changes"},{name:"rowClick",type:"EventEmitter<T>",description:"Emits when row is clicked"},{name:"rowSelectedChange",type:"EventEmitter<T[]>",description:"Emits when row selection changes"},{name:"selectionChange",type:"EventEmitter<T[]>",description:"Emits on selection model change"},{name:"cellClick",type:"EventEmitter<{row: T, column: DataGridColumn}>",description:"Emits when cell is clicked"},{name:"cellSelectedChange",type:"EventEmitter<any[]>",description:"Emits when cell selection changes"},{name:"expansionChange",type:"EventEmitter<any>",description:"Emits when expansion state changes"},{name:"rowContextMenu",type:"EventEmitter<any>",description:"Emits on right-click context menu"},{name:"infiniteScrollLoad",type:"EventEmitter<void>",description:"Emits when infinite scroll threshold reached"},{name:"focusedRowChange",type:"EventEmitter<{row: T, index: number}>",description:"Emits when focused row changes (keyboard nav)"}];columnProperties=[{name:"field",type:"string",description:"Property name to display from data object"},{name:"header",type:"string",description:"Column header text"},{name:"type",type:"string",description:"Data type: 'number', 'currency', 'date', 'boolean', etc."},{name:"typeParameter",type:"object",description:"Type-specific formatting options"},{name:"width",type:"string",description:"Column width (e.g., '100px', '20%')"},{name:"minWidth",type:"number",description:"Minimum column width in pixels"},{name:"maxWidth",type:"number",description:"Maximum column width in pixels"},{name:"sortable",type:"boolean",description:"Enable sorting for this column",default:"false"},{name:"pinned",type:"'left' | 'right'",description:"Pin column to side"},{name:"hide",type:"boolean",description:"Hide the column",default:"false"},{name:"class",type:"string",description:"CSS class for the column"},{name:"formatter",type:"(row: T, column: DataGridColumn) => string",description:"Custom cell value formatter"}];static \u0275fac=function(r){return new(r||a)};static \u0275cmp=C({type:a,selectors:[["app-data-grid-api"]],decls:54,vars:9,consts:[[1,"docs-component-viewer-content"],["mat-table","",1,"api-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","type"],["matColumnDef","description"],["matColumnDef","default"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(r,o){r&1&&(i(0,"div",0)(1,"app-doc-heading"),t(2,"Data Grid API"),e(),i(3,"h2"),t(4,"Inputs"),e(),i(5,"table",1),g(6,2),p(7,Ne,2,0,"th",3)(8,Be,3,1,"td",4),f(),g(9,5),p(10,ze,2,0,"th",3)(11,He,3,1,"td",4),f(),g(12,6),p(13,Ve,2,0,"th",3)(14,$e,2,1,"td",4),f(),g(15,7),p(16,Le,2,0,"th",3)(17,We,3,1,"td",4),f(),p(18,je,1,0,"tr",8)(19,Ue,1,0,"tr",9),e(),i(20,"h2"),t(21,"Outputs"),e(),i(22,"table",1),g(23,2),p(24,qe,2,0,"th",3)(25,Xe,3,1,"td",4),f(),g(26,5),p(27,Qe,2,0,"th",3)(28,Ye,3,1,"td",4),f(),g(29,6),p(30,Ze,2,0,"th",3)(31,Ke,2,1,"td",4),f(),g(32,7),p(33,Je,2,0,"th",3)(34,et,3,1,"td",4),f(),p(35,tt,1,0,"tr",8)(36,at,1,0,"tr",9),e(),i(37,"h2"),t(38,"DataGridColumn Interface"),e(),i(39,"table",1),g(40,2),p(41,it,2,0,"th",3)(42,nt,3,1,"td",4),f(),g(43,5),p(44,ot,2,0,"th",3)(45,rt,3,1,"td",4),f(),g(46,6),p(47,lt,2,0,"th",3)(48,dt,2,1,"td",4),f(),g(49,7),p(50,st,2,0,"th",3)(51,mt,3,1,"td",4),f(),p(52,ct,1,0,"tr",8)(53,pt,1,0,"tr",9),e()()),r&2&&(l(5),d("dataSource",o.inputs),l(13),d("matHeaderRowDef",o.displayedColumns),l(),d("matRowDefColumns",o.displayedColumns),l(3),d("dataSource",o.outputs),l(13),d("matHeaderRowDef",o.displayedColumns),l(),d("matRowDefColumns",o.displayedColumns),l(3),d("dataSource",o.columnProperties),l(13),d("matHeaderRowDef",o.displayedColumns),l(),d("matRowDefColumns",o.displayedColumns))},dependencies:[Se,pe,ge,we,fe,ue,Ce,he,ye,be,xe,S],styles:[".docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1400px}h2[_ngcontent-%COMP%]{margin-top:32px;margin-bottom:16px}.api-table[_ngcontent-%COMP%]{width:100%;margin-bottom:24px}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px 16px}.api-table[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:var(--mat-sys-surface-container);padding:2px 6px;border-radius:4px;font-size:13px}"]})};var L=class a{rowClassFormatterCode=`// Define CSS classes for rows based on data
rowClassFormatter: DataGridRowClassFormatter = {
  'row-success': (row) => row.status === 'completed',
  'row-warning': (row) => row.status === 'pending',
  'row-danger': (row) => row.status === 'failed',
};

// In your template
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowClassFormatter]="rowClassFormatter"
/>

// In your styles
::ng-deep .row-success { background-color: #e8f5e9; }
::ng-deep .row-warning { background-color: #fff3e0; }
::ng-deep .row-danger { background-color: #ffebee; }`;rowSelectionFormatterCode=`// Control which rows can be selected
rowSelectionFormatter: DataGridRowSelectionFormatter = {
  // Disable selection for certain rows
  disabled: (row) => row.status === 'locked',
  // Hide checkbox for certain rows
  hideCheckbox: (row) => row.type === 'header',
};

<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowSelectable]="true"
  [rowSelectionFormatter]="rowSelectionFormatter"
/>`;cellStylingCode=`// Add CSS class to a column
columns: DataGridColumn[] = [
  { field: 'name', header: 'Name' },
  { field: 'status', header: 'Status', class: 'status-cell' },
  { field: 'amount', header: 'Amount', class: 'amount-cell text-right' },
];

// Or use cellTemplate for full control
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [cellTemplate]="{ status: statusTpl }"
/>

<ng-template #statusTpl let-rowData="rowData">
  <span [class]="'status-badge status-' + rowData.status">
    {{ rowData.status }}
  </span>
</ng-template>`;sizeCode=`<!-- Compact size -->
<acp-data-grid [data]="data" [columns]="columns" size="small" />

<!-- Medium size -->
<acp-data-grid [data]="data" [columns]="columns" size="medium" />

<!-- Normal size (default) -->
<acp-data-grid [data]="data" [columns]="columns" size="normal" />`;stripedCode=`<!-- Enable striped rows -->
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowStriped]="true"
/>`;highlightedCode=`<!-- Highlight a specific row -->
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [keyboardNavigation]="true"
  [highlightedRowIndex]="currentIndex"
/>`;scssCustomizationCode=`// Override data grid styles globally
acp-data-grid {
  // Header styling
  .mat-mdc-header-row {
    background: var(--mat-sys-surface-container);
    font-weight: 600;
  }

  // Row hover effect
  .mat-mdc-row:hover {
    background: var(--mat-sys-surface-container-low);
  }

  // Selected row
  .mat-mdc-row.selected {
    background: color-mix(in srgb, var(--mat-sys-primary) 12%, transparent);
  }

  // Highlighted row (keyboard navigation)
  .mat-mdc-row.highlighted {
    background: var(--mat-sys-surface-container-highest);
    outline: 2px solid var(--mat-sys-primary);
    outline-offset: -2px;
  }

  // Cell borders
  .mat-mdc-cell {
    border-bottom: 1px solid var(--mat-sys-outline-variant);
  }
}`;static \u0275fac=function(r){return new(r||a)};static \u0275cmp=C({type:a,selectors:[["app-data-grid-styling"]],decls:101,vars:14,consts:[[1,"docs-component-viewer-content"],[1,"docs-component-description"],[1,"docs-example-card"],[1,"features-list"],[1,"section-description"],[3,"code","language"]],template:function(r,o){r&1&&(i(0,"div",0)(1,"app-doc-heading"),t(2,"Data Grid Styling"),e(),i(3,"p",1),t(4," Customize the Data Grid appearance using CSS variables, row formatters, and SCSS theming. The grid supports Material Design 3 tokens for consistent theming. "),e(),i(5,"h2"),t(6,"CSS Variables"),e(),i(7,"mat-card",2)(8,"mat-card-content")(9,"p"),t(10,"Use Material Design 3 tokens for consistent theming:"),e(),i(11,"ul",3)(12,"li")(13,"code"),t(14,"--mat-sys-surface"),e(),t(15," - Table background"),e(),i(16,"li")(17,"code"),t(18,"--mat-sys-on-surface"),e(),t(19," - Text color"),e(),i(20,"li")(21,"code"),t(22,"--mat-sys-surface-container"),e(),t(23," - Header background"),e(),i(24,"li")(25,"code"),t(26,"--mat-sys-surface-container-highest"),e(),t(27," - Highlighted row"),e(),i(28,"li")(29,"code"),t(30,"--mat-sys-primary"),e(),t(31," - Selection color"),e(),i(32,"li")(33,"code"),t(34,"--mat-sys-outline-variant"),e(),t(35," - Border color"),e()()()(),i(36,"h2"),t(37,"Row Class Formatter"),e(),i(38,"p",4),t(39," Use "),i(40,"code"),t(41,"rowClassFormatter"),e(),t(42," to dynamically apply CSS classes to rows based on data. "),e(),s(43,"app-code-example",5),i(44,"h2"),t(45,"Row Selection Formatter"),e(),i(46,"p",4),t(47," Control row selection behavior with "),i(48,"code"),t(49,"rowSelectionFormatter"),e(),t(50,". "),e(),s(51,"app-code-example",5),i(52,"h2"),t(53,"Custom Cell Styling"),e(),i(54,"p",4),t(55," Apply custom styles to cells using the column "),i(56,"code"),t(57,"class"),e(),t(58," property or cell templates. "),e(),s(59,"app-code-example",5),i(60,"h2"),t(61,"Size Variants"),e(),i(62,"mat-card",2)(63,"mat-card-content")(64,"p"),t(65,"Control table density with the "),i(66,"code"),t(67,"size"),e(),t(68," input:"),e(),i(69,"ul",3)(70,"li")(71,"code"),t(72,"small"),e(),t(73," - Compact rows (32px height)"),e(),i(74,"li")(75,"code"),t(76,"medium"),e(),t(77," - Medium rows (40px height)"),e(),i(78,"li")(79,"code"),t(80,"normal"),e(),t(81," - Default rows (48px height)"),e()()()(),s(82,"app-code-example",5),i(83,"h2"),t(84,"Striped Rows"),e(),i(85,"p",4),t(86,"Enable alternating row colors for better readability."),e(),s(87,"app-code-example",5),i(88,"h2"),t(89,"Highlighted Row"),e(),i(90,"p",4),t(91," Use "),i(92,"code"),t(93,"highlightedRowIndex"),e(),t(94," to highlight a specific row, useful for keyboard navigation. "),e(),s(95,"app-code-example",5),i(96,"h2"),t(97,"Global SCSS Customization"),e(),i(98,"p",4),t(99,"Override default styles with SCSS variables."),e(),s(100,"app-code-example",5),e()),r&2&&(l(43),d("code",o.rowClassFormatterCode)("language","typescript"),l(8),d("code",o.rowSelectionFormatterCode)("language","typescript"),l(8),d("code",o.cellStylingCode)("language","typescript"),l(23),d("code",o.sizeCode)("language","html"),l(5),d("code",o.stripedCode)("language","html"),l(8),d("code",o.highlightedCode)("language","html"),l(5),d("code",o.scssCustomizationCode)("language","styles"))},dependencies:[F,I,R,S,O],styles:[".docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}h2[_ngcontent-%COMP%]{margin-top:32px;margin-bottom:16px}.docs-component-description[_ngcontent-%COMP%], .section-description[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);margin-bottom:16px;line-height:1.6}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}.features-list[_ngcontent-%COMP%]{margin:8px 0;padding-left:24px}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:8px}.features-list[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:var(--mat-sys-surface-container);padding:2px 6px;border-radius:4px}"]})};function ut(a,n){if(a&1&&s(0,"app-doc-heading",0)(1,"app-example-viewer",1),a&2){let r=n.$implicit;d("text",r.title),l(),d("exampleData",r)}}function gt(a,n){a&1&&q(0,ut,2,2,null,null,U),a&2&&X(n.examples)}var W=class a{route=j(ie);examples=[];static \u0275fac=function(r){return new(r||a)};static \u0275cmp=C({type:a,selectors:[["app-data-grid-overview"]],decls:7,vars:3,consts:[[3,"text"],[3,"exampleData"]],template:function(r,o){if(r&1&&(i(0,"p"),t(1," El "),i(2,"code"),t(3,"data-grid"),e(),t(4,` es un potente componente de tabla basado en Material. Admite selecci\xF3n de celdas, selecci\xF3n de filas, selecci\xF3n m\xFAltiple de filas, expansi\xF3n de filas, ocultamiento de columnas, movimiento de columnas y muchas otras funciones.
`),e(),_(5,gt,2,0),A(6,"async")),r&2){let c;l(5),E((c=G(6,1,o.route.data))?5:-1,c)}},dependencies:[S,se,J],encapsulation:2})},ra=[{path:"",redirectTo:"overview",pathMatch:"full"},{path:"overview",component:W,pathMatch:"full",data:{examples:[Ae]}},{path:"examples",component:V},{path:"api",component:$},{path:"styling",component:L},{path:"**",redirectTo:"overview"}];export{W as GridOverview,ra as routes};
