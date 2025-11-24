//import { ComponentViewer } from '../component-viewer/component-viewer';

import { ComponentViewer } from '../pages/component-viewer/component-viewer';

export const routes = [
  {
    path: '',
    component: ComponentViewer,
    children: [
      {
        path: 'data-grid',
        loadChildren: () => import('./data-grid/data-grid').then(m => m.routes),
      },
    ],
  },
];
