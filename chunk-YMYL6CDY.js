import { a as t } from './chunk-QO52LJYQ.js';
import './chunk-EL47QAQT.js';
import './chunk-ZTXRY76I.js';
import './chunk-4JMGPBNX.js';
import './chunk-57Q2UAVZ.js';
import './chunk-GV4MRAZ3.js';
var r = [
  {
    path: '',
    component: t,
    children: [
      {
        path: 'company-customers',
        loadChildren: () => import('./chunk-OSVCVUHO.js').then((o) => o.routes),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./chunk-3YTHKYHR.js').then((o) => o.routes),
      },
    ],
  },
];
export { r as routes };
