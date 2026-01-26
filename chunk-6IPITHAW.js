import{a as Y,b as C}from"./chunk-TEMGEHUK.js";import"./chunk-IS3KC4W2.js";import{b as N}from"./chunk-ZTXRY76I.js";import"./chunk-4JMGPBNX.js";import{F as ae,G as le,S as me,T as pe}from"./chunk-H5QXEMOA.js";import{N as J,V as Q,Y as Z,Z as ee,_ as te,ba as oe,ca as ne,da as ie,e as V,ea as re,i as I,j as H,k as W,m as d,o as G,p as R,s as j,t as L,u as z,v as U,z as $}from"./chunk-7JP3HI6F.js";import"./chunk-57Q2UAVZ.js";import{a as X}from"./chunk-QJ46N2FA.js";import"./chunk-U7VJQUDE.js";import{d as q,g as K}from"./chunk-XJJY6XHD.js";import{$b as e,Ab as f,Bb as t,Cb as o,Hb as A,Kb as M,Pa as p,Wb as _,Yc as F,ab as E,bc as v,cc as D,ia as O,ma as S,na as y,pc as T,qb as x,qc as B,sb as h,ub as b,vb as g,wb as u,xb as s,yb as i,zb as n}from"./chunk-GV4MRAZ3.js";var ue=(m,r)=>r.value;function xe(m,r){if(m&1&&(i(0,"mat-option",7),e(1),n()),m&2){let l=r.$implicit;s("value",l),p(),v(" ",l," ")}}function he(m,r){if(m&1&&(i(0,"mat-option",7),e(1),n()),m&2){let l=r.$implicit;s("value",l.value),p(),v(" ",l.label," ")}}function be(m,r){m&1&&(i(0,"button",24),e(1,"Click to close"),n())}var P=class m{popoverForm=new W({triggerEvent:new d("hover"),position:new d(["below","after"]),enterDelay:new d(100),leaveDelay:new d(100),xOffset:new d(0),yOffset:new d(0),hideArrow:new d(!1),closeOnPanelClick:new d(!1),closeOnBackdropClick:new d(!0),hasBackdrop:new d(!1),focusTrapEnabled:new d(!1)});triggerEvents=["hover","click"];positions=[{value:["above","before"],label:"Above Before"},{value:["above","center"],label:"Above Center"},{value:["above","after"],label:"Above After"},{value:["below","before"],label:"Below Before"},{value:["below","center"],label:"Below Center"},{value:["below","after"],label:"Below After"},{value:["before","above"],label:"Before Above"},{value:["before","center"],label:"Before Center"},{value:["before","below"],label:"Before Below"},{value:["after","above"],label:"After Above"},{value:["after","center"],label:"After Center"},{value:["after","below"],label:"After Below"}];get config(){let r=this.popoverForm.value;return{triggerEvent:r.triggerEvent??"hover",position:r.position??["below","after"],enterDelay:r.enterDelay??100,leaveDelay:r.leaveDelay??100,xOffset:r.xOffset??0,yOffset:r.yOffset??0,hideArrow:r.hideArrow??!1,closeOnPanelClick:r.closeOnPanelClick??!1,closeOnBackdropClick:r.closeOnBackdropClick??!0,hasBackdrop:r.hasBackdrop??!1,focusTrapEnabled:r.focusTrapEnabled??!1}}onPopoverOpened(){}onPopoverClosed(){}comparePositions(r,l){return r?.[0]===l?.[0]&&r?.[1]===l?.[1]}static \u0275fac=function(l){return new(l||m)};static \u0275cmp=E({type:m,selectors:[["app-popover-configurable-example"]],decls:107,vars:22,consts:[["configPopover","acpPopover"],[1,"demo-popover"],[1,"demo-controls"],[1,"controls-form",3,"formGroup"],[1,"form-row"],["appearance","outline"],["formControlName","triggerEvent"],[3,"value"],["formControlName","position",3,"compareWith"],["matInput","","type","number","formControlName","enterDelay","min","0","max","5000"],["matInput","","type","number","formControlName","leaveDelay","min","0","max","5000"],["matInput","","type","number","formControlName","xOffset","min","-100","max","100"],["matInput","","type","number","formControlName","yOffset","min","-100","max","100"],[1,"form-row","checkboxes"],["formControlName","hideArrow"],["formControlName","closeOnPanelClick"],["formControlName","closeOnBackdropClick"],["formControlName","hasBackdrop"],["formControlName","focusTrapEnabled"],[1,"demo-content"],[1,"popover-demo-area"],["mat-raised-button","","color","primary",3,"popoverOpened","popoverClosed","acpPopoverTriggerFor","triggerEvent"],[3,"triggerEvent","position","enterDelay","leaveDelay","xOffset","yOffset","hideArrow","closeOnPanelClick","closeOnBackdropClick","hasBackdrop","focusTrapEnabled"],[1,"popover-content"],["mat-button","","color","accent"],[1,"demo-info"]],template:function(l,a){if(l&1){let c=A();i(0,"div",1)(1,"div",2)(2,"form",3)(3,"div",4)(4,"mat-form-field",5)(5,"mat-label"),e(6,"Trigger Event"),n(),i(7,"mat-select",6),g(8,xe,2,2,"mat-option",7,b),n()(),i(10,"mat-form-field",5)(11,"mat-label"),e(12,"Position"),n(),i(13,"mat-select",8),g(14,he,2,2,"mat-option",7,ue),n()()(),i(16,"div",4)(17,"mat-form-field",5)(18,"mat-label"),e(19,"Enter Delay (ms)"),n(),f(20,"input",9),n(),i(21,"mat-form-field",5)(22,"mat-label"),e(23,"Leave Delay (ms)"),n(),f(24,"input",10),n()(),i(25,"div",4)(26,"mat-form-field",5)(27,"mat-label"),e(28,"X Offset (px)"),n(),f(29,"input",11),n(),i(30,"mat-form-field",5)(31,"mat-label"),e(32,"Y Offset (px)"),n(),f(33,"input",12),n()(),i(34,"div",13)(35,"mat-checkbox",14),e(36,"Hide Arrow"),n(),i(37,"mat-checkbox",15),e(38,"Close on Panel Click"),n(),i(39,"mat-checkbox",16),e(40,"Close on Backdrop Click"),n()(),i(41,"div",13)(42,"mat-checkbox",17),e(43,"Has Backdrop"),n(),i(44,"mat-checkbox",18),e(45,"Focus Trap Enabled"),n()()()(),i(46,"div",19)(47,"div",20)(48,"button",21),M("popoverOpened",function(){return S(c),y(a.onPopoverOpened())})("popoverClosed",function(){return S(c),y(a.onPopoverClosed())}),e(49),n(),i(50,"acp-popover",22,0)(52,"div",23)(53,"h4"),e(54,"Popover Content"),n(),i(55,"p"),e(56,"This is a configurable popover example."),n(),i(57,"p"),e(58,"Current settings:"),n(),i(59,"ul")(60,"li"),e(61),n(),i(62,"li"),e(63),n(),i(64,"li"),e(65),n(),i(66,"li"),e(67),n()(),x(68,be,2,0,"button",24),n()()(),i(69,"div",25)(70,"h3"),e(71,"Configuration"),n(),i(72,"p"),e(73,"Use the controls above to configure the popover behavior and appearance."),n(),i(74,"ul")(75,"li")(76,"strong"),e(77,"Trigger Event:"),n(),e(78," How the popover is activated (hover or click)"),n(),i(79,"li")(80,"strong"),e(81,"Position:"),n(),e(82," Where the popover appears relative to the trigger"),n(),i(83,"li")(84,"strong"),e(85,"Delays:"),n(),e(86," Time before showing/hiding the popover"),n(),i(87,"li")(88,"strong"),e(89,"Offsets:"),n(),e(90," Fine-tune positioning with pixel adjustments"),n(),i(91,"li")(92,"strong"),e(93,"Arrow:"),n(),e(94," Toggle the popover's pointing arrow"),n(),i(95,"li")(96,"strong"),e(97,"Click Behaviors:"),n(),e(98," Control how clicking closes the popover"),n(),i(99,"li")(100,"strong"),e(101,"Backdrop:"),n(),e(102," Add an overlay behind the popover"),n(),i(103,"li")(104,"strong"),e(105,"Focus Trap:"),n(),e(106," Keep keyboard focus within the popover"),n()()()()()}if(l&2){let c=_(51);p(2),s("formGroup",a.popoverForm),p(6),u(a.triggerEvents),p(5),s("compareWith",a.comparePositions),p(),u(a.positions),p(34),s("acpPopoverTriggerFor",c)("triggerEvent",a.config.triggerEvent),p(),v(" ",a.config.triggerEvent==="hover"?"Hover me":"Click me"," "),p(),s("triggerEvent",a.config.triggerEvent)("position",a.config.position)("enterDelay",a.config.enterDelay)("leaveDelay",a.config.leaveDelay)("xOffset",a.config.xOffset)("yOffset",a.config.yOffset)("hideArrow",a.config.hideArrow)("closeOnPanelClick",a.config.closeOnPanelClick)("closeOnBackdropClick",a.config.closeOnBackdropClick)("hasBackdrop",a.config.hasBackdrop)("focusTrapEnabled",a.config.focusTrapEnabled),p(11),v("Trigger: ",a.config.triggerEvent),p(2),D("Position: ",a.config.position[0]," ",a.config.position[1]),p(2),v("Enter Delay: ",a.config.enterDelay,"ms"),p(2),v("Leave Delay: ",a.config.leaveDelay,"ms"),p(),h(a.config.closeOnPanelClick?68:-1)}},dependencies:[$,G,V,R,I,H,U,z,L,j,K,q,le,ae,Z,Q,J,te,ee,re,ie,oe,ne,me,pe],styles:[".demo-popover[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2rem;padding:1rem}.demo-controls[_ngcontent-%COMP%]{background:var(--mat-sys-surface-container);border-radius:8px;padding:1.5rem}.controls-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.form-row[_ngcontent-%COMP%]{display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap}.form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1;min-width:200px}.form-row.checkboxes[_ngcontent-%COMP%]{gap:2rem}.form-row.checkboxes[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]{flex:none}.demo-content[_ngcontent-%COMP%]{display:flex;gap:2rem;align-items:flex-start;flex-wrap:wrap}.popover-demo-area[_ngcontent-%COMP%]{flex:1;min-width:300px;display:flex;justify-content:center;align-items:center;min-height:200px;background:var(--mat-sys-surface-container-low);border-radius:8px;border:2px dashed var(--mat-sys-outline-variant)}.demo-info[_ngcontent-%COMP%]{flex:1;min-width:300px;background:var(--mat-sys-surface-container);border-radius:8px;padding:1.5rem}.demo-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;color:var(--mat-sys-on-surface)}.demo-info[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:1rem 0;padding-left:1.5rem}.demo-info[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.5rem;line-height:1.4}.popover-content[_ngcontent-%COMP%]{padding:1rem;max-width:300px}.popover-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-top:0;margin-bottom:.5rem;color:var(--mat-sys-on-surface)}.popover-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.5rem 0;line-height:1.4}.popover-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:.5rem 0;padding-left:1.5rem;font-size:.9rem}.popover-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem}.popover-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:1rem}@media(max-width:768px){.form-row[_ngcontent-%COMP%]{flex-direction:column}.form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{min-width:unset}.demo-content[_ngcontent-%COMP%]{flex-direction:column}.popover-demo-area[_ngcontent-%COMP%], .demo-info[_ngcontent-%COMP%]{min-width:unset}}"]})};var ce=`<div class="demo-popover">
  <div class="demo-controls">
    <form [formGroup]="popoverForm" class="controls-form">
      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Trigger Event</mat-label>
          <mat-select formControlName="triggerEvent">
            @for (event of triggerEvents; track event) {
            <mat-option [value]="event"> {{ event }} </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Position</mat-label>
          <mat-select formControlName="position" [compareWith]="comparePositions">
            @for (pos of positions; track pos.value) {
            <mat-option [value]="pos.value"> {{ pos.label }} </mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Enter Delay (ms)</mat-label>
          <input matInput type="number" formControlName="enterDelay" min="0" max="5000" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Leave Delay (ms)</mat-label>
          <input matInput type="number" formControlName="leaveDelay" min="0" max="5000" />
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>X Offset (px)</mat-label>
          <input matInput type="number" formControlName="xOffset" min="-100" max="100" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Y Offset (px)</mat-label>
          <input matInput type="number" formControlName="yOffset" min="-100" max="100" />
        </mat-form-field>
      </div>

      <div class="form-row checkboxes">
        <mat-checkbox formControlName="hideArrow">Hide Arrow</mat-checkbox>
        <mat-checkbox formControlName="closeOnPanelClick">Close on Panel Click</mat-checkbox>
        <mat-checkbox formControlName="closeOnBackdropClick">Close on Backdrop Click</mat-checkbox>
      </div>

      <div class="form-row checkboxes">
        <mat-checkbox formControlName="hasBackdrop">Has Backdrop</mat-checkbox>
        <mat-checkbox formControlName="focusTrapEnabled">Focus Trap Enabled</mat-checkbox>
      </div>
    </form>
  </div>

  <div class="demo-content">
    <div class="popover-demo-area">
      <button
        mat-raised-button
        color="primary"
        [acpPopoverTriggerFor]="configPopover"
        [triggerEvent]="config.triggerEvent"
        (popoverOpened)="onPopoverOpened()"
        (popoverClosed)="onPopoverClosed()"
      >
        {{ config.triggerEvent === 'hover' ? 'Hover me' : 'Click me' }}
      </button>

      <acp-popover
        #configPopover="acpPopover"
        [triggerEvent]="config.triggerEvent"
        [position]="config.position"
        [enterDelay]="config.enterDelay"
        [leaveDelay]="config.leaveDelay"
        [xOffset]="config.xOffset"
        [yOffset]="config.yOffset"
        [hideArrow]="config.hideArrow"
        [closeOnPanelClick]="config.closeOnPanelClick"
        [closeOnBackdropClick]="config.closeOnBackdropClick"
        [hasBackdrop]="config.hasBackdrop"
        [focusTrapEnabled]="config.focusTrapEnabled"
      >
        <div class="popover-content">
          <h4>Popover Content</h4>
          <p>This is a configurable popover example.</p>
          <p>Current settings:</p>
          <ul>
            <li>Trigger: {{ config.triggerEvent }}</li>
            <li>Position: {{ config.position[0] }} {{ config.position[1] }}</li>
            <li>Enter Delay: {{ config.enterDelay }}ms</li>
            <li>Leave Delay: {{ config.leaveDelay }}ms</li>
          </ul>
          @if (config.closeOnPanelClick) {
          <button mat-button color="accent">Click to close</button>
          }
        </div>
      </acp-popover>
    </div>

    <div class="demo-info">
      <h3>Configuration</h3>
      <p>Use the controls above to configure the popover behavior and appearance.</p>
      <ul>
        <li><strong>Trigger Event:</strong> How the popover is activated (hover or click)</li>
        <li><strong>Position:</strong> Where the popover appears relative to the trigger</li>
        <li><strong>Delays:</strong> Time before showing/hiding the popover</li>
        <li><strong>Offsets:</strong> Fine-tune positioning with pixel adjustments</li>
        <li><strong>Arrow:</strong> Toggle the popover's pointing arrow</li>
        <li><strong>Click Behaviors:</strong> Control how clicking closes the popover</li>
        <li><strong>Backdrop:</strong> Add an overlay behind the popover</li>
        <li><strong>Focus Trap:</strong> Keep keyboard focus within the popover</li>
      </ul>
    </div>
  </div>
</div>
`,fe=`import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AcpPopover, AcpPopoverTrigger } from '@acontplus/ng-components';
import { AcpPopoverPosition, AcpPopoverTriggerEvent } from '@acontplus/ng-components';

/**
 * Configurable popover example component.
 *
 * Demonstrates various popover configurations with interactive controls
 * allowing users to test different settings and behaviors.
 */
@Component({
  selector: 'app-popover-configurable-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    AcpPopover,
    AcpPopoverTrigger,
  ],
})
export class App {
  /** Form group for popover configuration */
  popoverForm = new FormGroup({
    triggerEvent: new FormControl<AcpPopoverTriggerEvent>('hover'),
    position: new FormControl<AcpPopoverPosition>(['below', 'after']),
    enterDelay: new FormControl(100),
    leaveDelay: new FormControl(100),
    xOffset: new FormControl(0),
    yOffset: new FormControl(0),
    hideArrow: new FormControl(false),
    closeOnPanelClick: new FormControl(false),
    closeOnBackdropClick: new FormControl(true),
    hasBackdrop: new FormControl(false),
    focusTrapEnabled: new FormControl(false),
  });

  /** Available trigger events */
  triggerEvents: AcpPopoverTriggerEvent[] = ['hover', 'click'];

  /** Available position options */
  positions: { value: AcpPopoverPosition; label: string }[] = [
    { value: ['above', 'before'], label: 'Above Before' },
    { value: ['above', 'center'], label: 'Above Center' },
    { value: ['above', 'after'], label: 'Above After' },
    { value: ['below', 'before'], label: 'Below Before' },
    { value: ['below', 'center'], label: 'Below Center' },
    { value: ['below', 'after'], label: 'Below After' },
    { value: ['before', 'above'], label: 'Before Above' },
    { value: ['before', 'center'], label: 'Before Center' },
    { value: ['before', 'below'], label: 'Before Below' },
    { value: ['after', 'above'], label: 'After Above' },
    { value: ['after', 'center'], label: 'After Center' },
    { value: ['after', 'below'], label: 'After Below' },
  ];

  /**
   * Gets the current form values for the popover configuration.
   * @returns Current form values with proper defaults
   */
  get config() {
    const formValue = this.popoverForm.value;
    return {
      triggerEvent: formValue.triggerEvent ?? 'hover',
      position: formValue.position ?? ['below', 'after'],
      enterDelay: formValue.enterDelay ?? 100,
      leaveDelay: formValue.leaveDelay ?? 100,
      xOffset: formValue.xOffset ?? 0,
      yOffset: formValue.yOffset ?? 0,
      hideArrow: formValue.hideArrow ?? false,
      closeOnPanelClick: formValue.closeOnPanelClick ?? false,
      closeOnBackdropClick: formValue.closeOnBackdropClick ?? true,
      hasBackdrop: formValue.hasBackdrop ?? false,
      focusTrapEnabled: formValue.focusTrapEnabled ?? false,
    };
  }

  /**
   * Handles popover opened event.
   */
  onPopoverOpened() {
    // Popover opened
  }

  /**
   * Handles popover closed event.
   */
  onPopoverClosed() {
    // Popover closed
  }

  /**
   * Compares position arrays for mat-select.
   * @param pos1 First position array
   * @param pos2 Second position array
   * @returns Whether positions are equal
   */
  comparePositions(pos1: AcpPopoverPosition, pos2: AcpPopoverPosition): boolean {
    return pos1?.[0] === pos2?.[0] && pos1?.[1] === pos2?.[1];
  }
}
`,ve=`.demo-popover {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.demo-controls {
  background: var(--mat-sys-surface-container);
  border-radius: 8px;
  padding: 1.5rem;
}

.controls-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;

  mat-form-field {
    flex: 1;
    min-width: 200px;
  }

  &.checkboxes {
    gap: 2rem;

    mat-checkbox {
      flex: none;
    }
  }
}

.demo-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.popover-demo-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background: var(--mat-sys-surface-container-low);
  border-radius: 8px;
  border: 2px dashed var(--mat-sys-outline-variant);
}

.demo-info {
  flex: 1;
  min-width: 300px;
  background: var(--mat-sys-surface-container);
  border-radius: 8px;
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    color: var(--mat-sys-on-surface);
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
}

.popover-content {
  padding: 1rem;
  max-width: 300px;

  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--mat-sys-on-surface);
  }

  p {
    margin: 0.5rem 0;
    line-height: 1.4;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    font-size: 0.9rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  button {
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;

    mat-form-field {
      min-width: unset;
    }
  }

  .demo-content {
    flex-direction: column;
  }

  .popover-demo-area,
  .demo-info {
    min-width: unset;
  }
}
`,Ee={title:"Configurable popover",component:P,files:[{file:"app.html",content:C.highlightAuto(ce,["html"]).value,filecontent:ce},{file:"app.ts",content:C.highlightAuto(fe,["typescript"]).value,filecontent:fe},{file:"app.scss",content:C.highlightAuto(ve,["scss"]).value,filecontent:ve}]};var w=class m{static \u0275fac=function(l){return new(l||m)};static \u0275cmp=E({type:m,selectors:[["app-popover-api"]],decls:239,vars:0,consts:[[1,"api-documentation"],[1,"api-section"],[1,"api-table"]],template:function(l,a){l&1&&(t(0,"div",0)(1,"div",1)(2,"h3"),e(3,"AcpPopover"),o(),t(4,"p"),e(5,"Main popover component that displays content in an overlay panel."),o(),t(6,"h4"),e(7,"Properties"),o(),t(8,"table",2)(9,"thead")(10,"tr")(11,"th"),e(12,"Name"),o(),t(13,"th"),e(14,"Type"),o(),t(15,"th"),e(16,"Default"),o(),t(17,"th"),e(18,"Description"),o()()(),t(19,"tbody")(20,"tr")(21,"td"),e(22,"triggerEvent"),o(),t(23,"td"),e(24,"AcpPopoverTriggerEvent"),o(),t(25,"td"),e(26,"'hover'"),o(),t(27,"td"),e(28,"Event that triggers the popover (hover or click)"),o()(),t(29,"tr")(30,"td"),e(31,"position"),o(),t(32,"td"),e(33,"AcpPopoverPosition"),o(),t(34,"td"),e(35,"['below', 'after']"),o(),t(36,"td"),e(37,"Position of the popover relative to trigger"),o()(),t(38,"tr")(39,"td"),e(40,"enterDelay"),o(),t(41,"td"),e(42,"number"),o(),t(43,"td"),e(44,"100"),o(),t(45,"td"),e(46,"Delay in milliseconds before showing popover"),o()(),t(47,"tr")(48,"td"),e(49,"leaveDelay"),o(),t(50,"td"),e(51,"number"),o(),t(52,"td"),e(53,"100"),o(),t(54,"td"),e(55,"Delay in milliseconds before hiding popover"),o()(),t(56,"tr")(57,"td"),e(58,"xOffset"),o(),t(59,"td"),e(60,"number"),o(),t(61,"td"),e(62,"0"),o(),t(63,"td"),e(64,"Horizontal offset in pixels"),o()(),t(65,"tr")(66,"td"),e(67,"yOffset"),o(),t(68,"td"),e(69,"number"),o(),t(70,"td"),e(71,"0"),o(),t(72,"td"),e(73,"Vertical offset in pixels"),o()(),t(74,"tr")(75,"td"),e(76,"hideArrow"),o(),t(77,"td"),e(78,"boolean"),o(),t(79,"td"),e(80,"false"),o(),t(81,"td"),e(82,"Whether to hide the popover arrow"),o()(),t(83,"tr")(84,"td"),e(85,"closeOnPanelClick"),o(),t(86,"td"),e(87,"boolean"),o(),t(88,"td"),e(89,"false"),o(),t(90,"td"),e(91,"Whether clicking the panel closes the popover"),o()(),t(92,"tr")(93,"td"),e(94,"closeOnBackdropClick"),o(),t(95,"td"),e(96,"boolean"),o(),t(97,"td"),e(98,"true"),o(),t(99,"td"),e(100,"Whether clicking the backdrop closes the popover"),o()(),t(101,"tr")(102,"td"),e(103,"hasBackdrop"),o(),t(104,"td"),e(105,"boolean"),o(),t(106,"td"),e(107,"undefined"),o(),t(108,"td"),e(109,"Whether the popover has a backdrop"),o()(),t(110,"tr")(111,"td"),e(112,"focusTrapEnabled"),o(),t(113,"td"),e(114,"boolean"),o(),t(115,"td"),e(116,"false"),o(),t(117,"td"),e(118,"Whether to enable focus trapping"),o()()()(),t(119,"h4"),e(120,"Events"),o(),t(121,"table",2)(122,"thead")(123,"tr")(124,"th"),e(125,"Name"),o(),t(126,"th"),e(127,"Type"),o(),t(128,"th"),e(129,"Description"),o()()(),t(130,"tbody")(131,"tr")(132,"td"),e(133,"closed"),o(),t(134,"td"),e(135,"EventEmitter<PopoverCloseReason>"),o(),t(136,"td"),e(137,"Emitted when the popover is closed"),o()()()()(),t(138,"div",1)(139,"h3"),e(140,"AcpPopoverTrigger"),o(),t(141,"p"),e(142,"Directive that triggers the popover display."),o(),t(143,"h4"),e(144,"Properties"),o(),t(145,"table",2)(146,"thead")(147,"tr")(148,"th"),e(149,"Name"),o(),t(150,"th"),e(151,"Type"),o(),t(152,"th"),e(153,"Description"),o()()(),t(154,"tbody")(155,"tr")(156,"td"),e(157,"acpPopoverTriggerFor"),o(),t(158,"td"),e(159,"AcpPopoverPanel"),o(),t(160,"td"),e(161,"Reference to the popover instance"),o()(),t(162,"tr")(163,"td"),e(164,"popoverData"),o(),t(165,"td"),e(166,"any"),o(),t(167,"td"),e(168,"Data to pass to lazily-rendered content"),o()(),t(169,"tr")(170,"td"),e(171,"targetElement"),o(),t(172,"td"),e(173,"AcpPopoverTarget"),o(),t(174,"td"),e(175,"Alternative target element for positioning"),o()(),t(176,"tr")(177,"td"),e(178,"triggerEvent"),o(),t(179,"td"),e(180,"AcpPopoverTriggerEvent"),o(),t(181,"td"),e(182,"Override trigger event for this instance"),o()()()(),t(183,"h4"),e(184,"Events"),o(),t(185,"table",2)(186,"thead")(187,"tr")(188,"th"),e(189,"Name"),o(),t(190,"th"),e(191,"Type"),o(),t(192,"th"),e(193,"Description"),o()()(),t(194,"tbody")(195,"tr")(196,"td"),e(197,"popoverOpened"),o(),t(198,"td"),e(199,"EventEmitter<void>"),o(),t(200,"td"),e(201,"Emitted when the popover is opened"),o()(),t(202,"tr")(203,"td"),e(204,"popoverClosed"),o(),t(205,"td"),e(206,"EventEmitter<void>"),o(),t(207,"td"),e(208,"Emitted when the popover is closed"),o()()()(),t(209,"h4"),e(210,"Methods"),o(),t(211,"table",2)(212,"thead")(213,"tr")(214,"th"),e(215,"Name"),o(),t(216,"th"),e(217,"Description"),o()()(),t(218,"tbody")(219,"tr")(220,"td"),e(221,"openPopover()"),o(),t(222,"td"),e(223,"Opens the popover"),o()(),t(224,"tr")(225,"td"),e(226,"closePopover()"),o(),t(227,"td"),e(228,"Closes the popover"),o()(),t(229,"tr")(230,"td"),e(231,"togglePopover()"),o(),t(232,"td"),e(233,"Toggles the popover open/closed state"),o()(),t(234,"tr")(235,"td"),e(236,"focus(origin?, options?)"),o(),t(237,"td"),e(238,"Focuses the trigger element"),o()()()()()())},encapsulation:2})};function Ce(m,r){if(m&1&&f(0,"app-doc-heading",0)(1,"app-example-viewer",1),m&2){let l=r.$implicit;s("text",l.title),p(),s("exampleData",l)}}function Pe(m,r){m&1&&g(0,Ce,2,2,null,null,b),m&2&&u(r.examples)}var k=class m{route=O(N);static \u0275fac=function(l){return new(l||m)};static \u0275cmp=E({type:m,selectors:[["app-popover-overview"]],decls:7,vars:3,consts:[[3,"text"],[3,"exampleData"]],template:function(l,a){if(l&1&&(i(0,"p"),e(1," El "),i(2,"code"),e(3,"acp-popover"),n(),e(4,` es un componente que muestra contenido en un panel superpuesto que puede activarse mediante eventos hover o click. Soporta varias opciones de posicionamiento y proporciona configuraci\xF3n flexible para diferentes casos de uso.
`),n(),x(5,Pe,2,0),T(6,"async")),l&2){let c;p(5),h((c=B(6,1,a.route.data))?5:-1,c)}},dependencies:[X,Y,F],encapsulation:2})},Ye=[{path:"",redirectTo:"overview",pathMatch:"full"},{path:"overview",component:k,pathMatch:"full",data:{examples:[Ee]}},{path:"api",component:w},{path:"**",redirectTo:"overview"}];export{k as PopoverOverview,Ye as routes};
