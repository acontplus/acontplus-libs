import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();
const appHtml = `<acp-data-grid [data]="list" [columns]="columns" [trackBy]="trackByName"></acp-data-grid>
`;

const appTs = `
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

`;
const appScss = `/* Estilos específicos para el ejemplo de Data Grid básico */`;

const companyCustomerBasicExampleConfig = {
  title: 'Example',
  component: App,
  files: [
    {
      file: 'app.html',
      content: hljs.highlightAuto(appHtml).value,
      filecontent: appHtml,
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs).value,
      filecontent: appTs,
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss).value,
      filecontent: appScss,
    },
  ],
};

export { companyCustomerBasicExampleConfig };
