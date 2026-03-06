# @acontplus/ng-common

Librería común para aplicaciones Angular con funcionalidades de WhatsApp Cloud API, reportes e impresión. Incluye utilidades estáticas para formateo de teléfonos, manejo de archivos y generación de parámetros de reportes con configuración centralizada.

## Instalación

```bash
npm install @acontplus/ng-common
```

## Configuración

### Tokens de Inyección

La librería utiliza tres tokens principales para la inyección de dependencias:

- `WHATSAPP_MESSAGING_PORT` - Para funcionalidades de WhatsApp
- `REPORT_PORT` - Para generación de reportes
- `PRINTER_PORT` - Para funcionalidades de impresión

### Configurar en tu app.config.ts

```typescript
import {
  WHATSAPP_MESSAGING_PORT,
  REPORT_PORT,
  PRINTER_PORT,
  MetaWhatsAppAdapter,
  ReportAdapter,
  PrinterAdapter,
} from '@acontplus/ng-common';

export const appConfig: ApplicationConfig = {
  providers: [
    // WhatsApp Cloud API
    { provide: WHATSAPP_MESSAGING_PORT, useClass: MetaWhatsAppAdapter },

    // Reportes
    { provide: REPORT_PORT, useClass: ReportAdapter },

    // Impresión
    { provide: PRINTER_PORT, useClass: PrinterAdapter },
  ],
};
```

## Uso

### WhatsApp Cloud API

```typescript
import { WhatsAppMessagingFacade } from '@acontplus/ng-common';

@Component({...})
export class MyComponent {
  constructor(private whatsapp: WhatsAppMessagingFacade) {}

  // 1. Enviar texto simple (requiere ventana 24h)
  sendText() {
    this.whatsapp.sendSimpleText('0987654321', 'Hola mundo!').subscribe();
  }

  // 2. Enviar con template (funciona siempre - RECOMENDADO)
  sendWithTemplate() {
    this.whatsapp.sendTemplateText(
      '0987654321',
      'hello_world',
      ['Juan', 'Pérez'], // parámetros {{1}}, {{2}}
      'es_EC'
    ).subscribe();
  }

  // 3. Enviar documento con template (funciona siempre - RECOMENDADO)
  sendDocumentWithFile(file: File) {
    this.whatsapp.sendDocumentWithTemplate({
      phone: '0987654321',
      file: file,
      templateName: 'notificacion_documento',
      languageCode: 'es_EC',
      bodyParams: ['Juan Pérez', 'Factura #001'],
      filename: 'factura-001.pdf'
    }).subscribe();
  }

  // Caso de uso completo: Entrega de documentos
  deliverInvoice(file: File) {
    this.whatsapp.deliverDocument({
      phone: '0987654321',
      file: file,
      customerName: 'Juan Pérez',
      establishmentName: 'Mi Empresa S.A.',
      documentSeries: 'FAC-001-001-000001234',
      documentType: 'FACTURA'
    }).subscribe();
  }
}
```

### Utilidades de Formateo de Teléfonos

```typescript
import { PhoneFormatterUtil } from '@acontplus/ng-common';

// Validar teléfono ecuatoriano
const validation = PhoneFormatterUtil.validateEcuadorianPhone('0987654321');
if (validation.isValid) {
  console.log('Teléfono válido');
} else {
  console.log(validation.errorMessage);
}

// Formatear para WhatsApp API
const apiPhone = PhoneFormatterUtil.formatForWhatsAppApi('0987654321');
// Resultado: "593987654321@c.us"

// Formatear para mostrar al usuario
const displayPhone = PhoneFormatterUtil.formatForDisplay('0987654321');
// Resultado: "+593 98 765 4321"
```

### Reportes con Builder Estático

```typescript
import {
  ReportFacade,
  ReportParamsBuilder,
  SALE_CODE_REPORT,
  INVENTORY_CODE_REPORT,
  ELECTRONIC_DOCUMENT_CODE,
  REPORT_FORMAT
} from '@acontplus/ng-common';

@Component({...})
export class ReportsComponent {
  constructor(private reportFacade: ReportFacade) {}

  // Ejemplo 1: Generar y abrir PDF automáticamente
  generateInvoiceReport(id: number, codEstab: string) {
    const reportOptions = ReportParamsBuilder.build(
      {
        codDoc: ELECTRONIC_DOCUMENT_CODE.FV,
        id,
        codEstab
      },
      REPORT_FORMAT.PDF
    );

    // Se abre automáticamente en nueva ventana (o descarga en navegadores legacy)
    this.reportFacade.openPDF(reportOptions.data, reportOptions.useV1Api)
      .subscribe({
        next: () => console.log('Reporte generado'),
        error: (err) => console.error('Error:', err)
      });
  }

  // Ejemplo 2: Generar Excel y descargar automáticamente
  generateSalesReport() {
    const reportOptions = ReportParamsBuilder.build(
      {
        codDoc: SALE_CODE_REPORT.FG,
        fechaInicio: '2024-01-01',
        fechaFin: '2024-12-31',
        codEstab: '001',
        idUsuario: 5,
        userRoleId: 2
      },
      REPORT_FORMAT.EXCEL
    );

    this.reportFacade.downloadExcel(reportOptions.data, reportOptions.useV1Api)
      .subscribe();
  }

  // Ejemplo 3: Control total sobre el blob
  generateCustomReport() {
    const reportOptions = ReportParamsBuilder.build(
      {
        codDoc: INVENTORY_CODE_REPORT.ARTICULO_PVP,
        tipo: 2,
        stockStatusCode: 1,
        idTarifa: 3
      },
      REPORT_FORMAT.PDF
    );

    this.reportFacade.generate(reportOptions)
      .subscribe({
        next: (response) => {
          // Tienes control total del blob
          const blob = response.body;
          if (blob) {
            // Hacer lo que quieras: enviar por WhatsApp, guardar, etc.
            this.sendViaWhatsApp(blob);
          }
        }
      });
  }

  // Ejemplo 4: Usar métodos genéricos
  quickPDFReport() {
    const reportOptions = ReportParamsBuilder.build(
      { codDoc: SALE_CODE_REPORT.SRR },
      REPORT_FORMAT.PDF
    );

    // Abre automáticamente
    this.reportFacade.open(reportOptions).subscribe();
  }

  quickExcelDownload() {
    const reportOptions = ReportParamsBuilder.build(
      { codDoc: INVENTORY_CODE_REPORT.RCD },
      REPORT_FORMAT.EXCEL
    );

    // Descarga automáticamente
    this.reportFacade.download(reportOptions).subscribe();
  }

  // Verificar tipos soportados
  checkSupportedTypes() {
    const types = ReportParamsBuilder.getSupportedDocumentTypes();
    console.log('Tipos soportados:', types);
  }
}
```

### Constantes de Reportes Disponibles

```typescript
import {
  SALE_CODE_REPORT,
  PURCHASE_CODE_REPORT,
  ACCOUNTING_CODE_REPORT,
  CUSTOMER_CODE_REPORT,
  INVENTORY_CODE_REPORT,
  ELECTRONIC_DOCUMENT_CODE,
  REPORT_FORMAT,
} from '@acontplus/ng-common';

// Reportes de Ventas
SALE_CODE_REPORT.SRR; // Reporte Rentabilidad
SALE_CODE_REPORT.SRRC; // Reporte Rentabilidad Custom
SALE_CODE_REPORT.FG; // Factura General

// Reportes de Compras
PURCHASE_CODE_REPORT.RCNH; // Reporte Compras Nota Hidden
PURCHASE_CODE_REPORT.RLC; // Reporte Liquidación Compra

// Reportes de Contabilidad
ACCOUNTING_CODE_REPORT.RCEGR; // Estado General Resultado
ACCOUNTING_CODE_REPORT.ACEDFP; // Estado Flujo de Pago
ACCOUNTING_CODE_REPORT.ACELC; // Estado Libro Caja

// Reportes de Clientes
CUSTOMER_CODE_REPORT.RCL; // Reporte Cliente Listado

// Reportes de Inventario
INVENTORY_CODE_REPORT.RK; // Kardex
INVENTORY_CODE_REPORT.CDAA; // Consolidado Artículos Agrupado
INVENTORY_CODE_REPORT.CDA; // Consolidado Artículos
INVENTORY_CODE_REPORT.STOCK_VALORACION; // Stock Valoración
INVENTORY_CODE_REPORT.ARTICULO_PVP; // Artículo Tabla
INVENTORY_CODE_REPORT.RAF; // Artículos Fraccionados
INVENTORY_CODE_REPORT.RCAA; // Caducidad Artículos
INVENTORY_CODE_REPORT.RASR; // Artículo Stock Valoración
INVENTORY_CODE_REPORT.RCD; // Consolidación Detalle
INVENTORY_CODE_REPORT.RTB; // Transferencia Bodega

// Documentos Electrónicos
ELECTRONIC_DOCUMENT_CODE.FV; // Factura
ELECTRONIC_DOCUMENT_CODE.NE; // Nota de Entrega
ELECTRONIC_DOCUMENT_CODE.NC; // Nota de Crédito
ELECTRONIC_DOCUMENT_CODE.ND; // Nota de Débito
ELECTRONIC_DOCUMENT_CODE.GR; // Guía de Remisión
ELECTRONIC_DOCUMENT_CODE.NORMAL; // Orden de Pedido

// Formatos
REPORT_FORMAT.PDF;
REPORT_FORMAT.EXCEL;
REPORT_FORMAT.WORD;
```

### Builders de Mensajes WhatsApp

```typescript
import { WhatsAppMessageBuilder } from '@acontplus/ng-common';

// Mensaje de entrega de documento
const messages = WhatsAppMessageBuilder.buildDocumentDeliveryMessages({
  comprador: 'Juan Pérez',
  establecimiento: 'Mi Empresa S.A.',
  serie: 'FAC-001-001-000001234',
  tipo: 'FACTURA',
});
console.log(messages.main); // Mensaje principal
console.log(messages.promo); // Mensaje promocional

// Mensaje de bienvenida
const welcome = WhatsAppMessageBuilder.buildWelcomeMessage('Juan Pérez', 'Mi Empresa S.A.');

// Mensaje de confirmación de pedido
const confirmation = WhatsAppMessageBuilder.buildOrderConfirmationMessage(
  'ORD-12345',
  'Juan Pérez',
);

// Mensaje de recordatorio de pago
const reminder = WhatsAppMessageBuilder.buildPaymentReminderMessage(
  'Juan Pérez',
  150.5,
  '2024-12-31',
);
```

### Utilidades de Archivos

```typescript
import { FileMapperUtil } from '@acontplus/ng-common';

// Extraer nombre de archivo desde respuesta HTTP
const fileName = FileMapperUtil.extractFileName(httpResponse);

// Crear File desde respuesta HTTP
const file = FileMapperUtil.fromResponse(httpResponse);

// Descargar archivo
FileMapperUtil.downloadFile(blob, 'documento.pdf');

// Abrir archivo en nueva ventana (PDFs)
FileMapperUtil.openFile(blob, 'documento.pdf');

// Detectar navegador legacy
if (FileMapperUtil.isLegacyBrowser()) {
  FileMapperUtil.downloadFile(blob, fileName); // Forzar descarga
}
```

### Componente UI para WhatsApp

```typescript
import { WhatsAppSender, ELECTRONIC_DOCUMENT_CODE } from '@acontplus/ng-common';

@Component({
  template: `<acp-whatsapp-sender [config]="whatsappConfig"></acp-whatsapp-sender>`,
  imports: [WhatsAppSender],
})
export class MyComponent {
  whatsappConfig = {
    documentData: {
      codDoc: ELECTRONIC_DOCUMENT_CODE.FV,
      id: 123,
      codEstab: '001',
    },
    phoneNumbers: ['0987654321'],
    defaultMessage: 'Su documento está listo',
    establishmentName: 'Mi Empresa S.A.',
    customerName: 'Juan Pérez',
  };
}
```

## Configuración de Reportes

### Tipos de Documento Soportados

El `ReportParamsBuilder` incluye configuración para todos estos tipos:

| Categoría                   | Códigos Disponibles                                                      |
| --------------------------- | ------------------------------------------------------------------------ |
| **Documentos Electrónicos** | FV, NE, NC, ND, GR, NORMAL                                               |
| **Ventas**                  | SRR, SRRC, FG                                                            |
| **Compras**                 | RCNH, RLC                                                                |
| **Contabilidad**            | RCEGR, ACEDFP, ACELC                                                     |
| **Clientes**                | RCL                                                                      |
| **Inventario**              | RK, CDAA, CDA, STOCK_VALORACION, ARTICULO_PVP, RAF, RCAA, RASR, RCD, RTB |

### Agregar Nuevos Tipos de Reporte

**Opción 1: Agregar a la configuración (Recomendado)**

```typescript
// 1. Agregar constante en report-codes.ts
export const enum PURCHASE_CODE_REPORT {
  RCNH = 'RCNH',
  RLC = 'RLC',
  RNP = 'RNP', // ← NUEVO
}

// 2. Agregar configuración en report-params.builder.ts
[PURCHASE_CODE_REPORT.RNP]: {
  codigo: PURCHASE_CODE_REPORT.RNP,
  hasService: true,
  useV1Api: false,
  idField: 'id',
  hasParams: false,
}
```

**Opción 2: Registro dinámico**

```typescript
// En runtime
ReportParamsBuilder.registerReportType('CUSTOM_REPORT', {
  codigo: 'CUSTOM_REPORT',
  hasService: true,
  useV1Api: false,
  idField: 'id',
  hasParams: true,
});
```

## API de WhatsApp Cloud

### Endpoints utilizados

- `POST /api/common/whatsapp-cloud/text` - Texto directo
- `POST /api/common/whatsapp-cloud/text-template` - Texto con template
- `POST /api/common/whatsapp-cloud/document` - Documento por URL
- `POST /api/common/whatsapp-cloud/document-template` - Documento con template
- `GET /api/common/whatsapp-cloud/status` - Estado del proveedor

### Formato de FormData

```typescript
// La librería maneja automáticamente el formato correcto:
formData.append('To', phoneNumber);
formData.append('File', file);
formData.append('TemplateName', templateName);
formData.append('LanguageCode', languageCode);
formData.append('Filename', filename);
formData.append('BodyParams[0]', param1);
formData.append('BodyParams[1]', param2);
```

## Arquitectura

### Separación de Responsabilidades

- **WhatsApp**: Mensajería y notificaciones
- **Report**: Generación de reportes
- **Printer**: Impresión de documentos
- **Utils**: Utilidades estáticas reutilizables
- **Builders**: Construcción de parámetros y mensajes

### Estructura del Proyecto

```
ng-common/
├── constants/          # Constantes y códigos de reporte
├── contracts/          # Interfaces y puertos
├── models/            # DTOs y modelos de datos
├── adapters/          # Implementaciones de puertos
├── facades/           # Servicios de alto nivel
├── tokens/            # Tokens de inyección
├── builders/          # Builders estáticos
├── utils/             # Utilidades estáticas
└── ui/               # Componentes UI
```

## Características

- ✅ **Builders estáticos** - Sin inyección de dependencias, uso directo
- ✅ **Constantes centralizadas** - Todos los códigos de reporte en un solo lugar
- ✅ **Configuración escalable** - Agregar nuevos reportes sin modificar código
- ✅ **Utilidades optimizadas** - Mejor performance con métodos estáticos
- ✅ **Formateo automático** - Teléfonos ecuatorianos 09xxxxxxxx → +593
- ✅ **Type-safe** - TypeScript completo con enums y tipos
- ✅ **Clean Architecture** - Separación clara de responsabilidades
- ✅ **Sin dependencias problemáticas** - No FileSaver, no SweetAlert2
- ✅ **API alineada** - Formato exacto de tu backend
- ✅ **DRY** - Sin duplicación de código
- ✅ **Tree-shaking** - Mejor optimización del bundle
- ✅ **Fácil de mantener** - Código limpio y bien organizado
- ✅ **Extensible** - Múltiples formas de agregar funcionalidad

## Soporte

Para reportar problemas o solicitar nuevas funcionalidades, visita:
https://github.com/acontplus/acontplus-libs/issues
