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
const dataTs = `export const EXAMPLE_DATA: any[] = [
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
    name: 'Iván',
    tag: [{ color: 'cyan', value: [15, 16] }],
    weight: 17.002,
    symbol: 'Iv',
    gender: 'male',
    mobile: '0981234567',
    tele: '445566778',
    city: 'Madrid',
    address: 'Gran Vía 120',
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


`;

const gridBasicExampleConfig = {
  title: 'Basic',
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
    {
      file: 'data.ts',
      content: hljs.highlightAuto(dataTs).value,
      filecontent: dataTs,
    },
  ],
};

export { gridBasicExampleConfig };
