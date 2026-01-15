# @acontplus/ng-common

Librería común para aplicaciones Angular con funcionalidades de WhatsApp Cloud API, reportes e impresión. Incluye utilidades para formateo de teléfonos, manejo de archivos y generación de parámetros de reportes.

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

  // 3. Enviar documento por URL (requiere ventana 24h)
  sendDocumentByUrl() {
    this.whatsapp.sendDocument(
      '0987654321',
      'https://mi-servidor.com/documento.pdf',
      'Tu factura está lista',
      'factura-001.pdf'
    ).subscribe();
  }

  // 4. Enviar documento con template (funciona siempre - RECOMENDADO)
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

// Formatear para WhatsApp Web
const webPhone = PhoneFormatterUtil.formatForWhatsAppWeb('0987654321');
// Resultado: "593987654321"

// Formatear para mostrar al usuario
const displayPhone = PhoneFormatterUtil.formatForDisplay('0987654321');
// Resultado: "+593 98 765 4321"

// Obtener hints dinámicos
const hint = PhoneFormatterUtil.getPhoneHint('0987654321');
// Resultado: "Se enviará a: +593 98 765 4321"
```

### Reportes con Builder Configurado

```typescript
import { ReportFacade, ReportParamsBuilder } from '@acontplus/ng-common';

@Component({...})
export class ReportsComponent {
  constructor(
    private reports: ReportFacade,
    private reportBuilder: ReportParamsBuilder
  ) {}

  // Generar reporte usando el builder (RECOMENDADO)
  generateInvoiceReport(id: number, codEstab: string) {
    const docData = {
      codDoc: 'FV', // Factura
      id,
      codEstab
    };

    const reportOptions = this.reportBuilder.generateReportFor(docData, 'pdf', true);

    this.reports.generate(reportOptions).subscribe(response => {
      // Manejar respuesta
    });
  }

  // Generar reporte de Nota de Entrega
  generateDeliveryNote(id: number, codEstab: string) {
    const docData = {
      codDoc: 'NE', // Nota de Entrega
      id,
      codEstab
    };

    const reportOptions = this.reportBuilder.generateReportFor(docData, 'excel');
    this.reports.generate(reportOptions);
  }

  // Generar reporte de Orden de Pedido
  generateOrder(id: number, codEstab: string) {
    const docData = {
      codDoc: 'NORMAL', // Orden
      id,
      codEstab
    };

    const reportOptions = this.reportBuilder.generateReportFor(docData, 'word');
    this.reports.generate(reportOptions);
  }

  // Verificar tipos soportados
  checkSupportedTypes() {
    const supportedTypes = this.reportBuilder.getSupportedDocumentTypes();
    console.log('Tipos soportados:', supportedTypes);
    // ['FV', 'NE', 'NORMAL', 'NC', 'ND', 'GR']
  }
}
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
  // Forzar descarga en navegadores antiguos
}
```

### Impresión

```typescript
import { PrinterFacade } from '@acontplus/ng-common';

@Component({...})
export class PrintingComponent {
  constructor(private printer: PrinterFacade) {}

  // Imprimir factura
  printInvoice(orderId: number, documentId: number) {
    this.printer.printInvoice(orderId, documentId);
  }

  // Impresión automática
  autoPrint(data: any, docType: string) {
    this.printer.autoPrint(data, docType);
  }
}
```

### Componente UI para WhatsApp

```typescript
import { WhatsAppSender } from '@acontplus/ng-common';

@Component({
  template: ` <acp-whatsapp-sender [config]="whatsappConfig"> </acp-whatsapp-sender> `,
  imports: [WhatsAppSender],
})
export class MyComponent {
  whatsappConfig = {
    documentData: {
      codDoc: 'FV',
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

## API de WhatsApp Cloud

### Endpoints utilizados (configurados en constants):

- `POST /api/common/whatsapp-cloud/text` - Texto directo
- `POST /api/common/whatsapp-cloud/text-template` - Texto con template
- `POST /api/common/whatsapp-cloud/document` - Documento por URL
- `POST /api/common/whatsapp-cloud/document-template` - Documento con template
- `GET /api/common/whatsapp-cloud/status` - Estado del proveedor

### Formato de FormData para documentos:

```typescript
// La librería maneja automáticamente el formato correcto:
formData.append('To', phoneNumber);
formData.append('File', file);
formData.append('TemplateName', templateName);
formData.append('LanguageCode', languageCode);
formData.append('Filename', filename);
// BodyParams como array indexado
formData.append('BodyParams[0]', param1);
formData.append('BodyParams[1]', param2);
```

## Configuración de Reportes

### Tipos de Documento Soportados:

El `ReportParamsBuilder` soporta múltiples tipos de documento configurados:

| Código   | Descripción      | API Version | ID Field | Características                  |
| -------- | ---------------- | ----------- | -------- | -------------------------------- |
| `FV`     | Factura          | v1          | `id`     | Incluye establecimiento y código |
| `NE`     | Nota de Entrega  | v1          | `id`     | Parámetros extra: `tipo: 1`      |
| `NORMAL` | Orden de Pedido  | v2          | `id`     | Sin servicio adicional           |
| `NC`     | Nota de Crédito  | v1          | `id`     | Incluye establecimiento          |
| `ND`     | Nota de Débito   | v1          | `id`     | Incluye establecimiento          |
| `GR`     | Guía de Remisión | v2          | `id`     | Con servicio                     |

### Agregar Nuevos Tipos:

Para agregar un nuevo tipo de documento, simplemente agrega la configuración:

```typescript
// En ReportParamsBuilder, agregar a reportConfigs:
RET: {
  codigo: 'RET',
  hasService: true,
  useV1Api: true,
  idField: 'id',
  includeEstabInData: true,
}
```

## Arquitectura Limpia

### Separación de responsabilidades:

- **WhatsApp**: Solo mensajería
- **Report**: Solo generación de reportes
- **Printer**: Solo impresión
- **Utils**: Utilidades estáticas sin dependencias

### Estructura optimizada:

```
ng-common/
├── constants/          # URLs y configuraciones
├── contracts/          # Puertos/Interfaces separados
├── models/            # DTOs alineados con tu API
├── adapters/          # Implementaciones limpias
├── facades/           # Servicios de alto nivel
├── tokens/            # Tokens de inyección
├── builders/          # Constructores y builders configurados
├── utils/             # Utilidades estáticas (sin Injectable)
└── ui/               # Componentes UI
```

## Características

- ✅ **Utilidades estáticas optimizadas** - Mejor performance, sin inyección de dependencias
- ✅ **Builder configurado para reportes** - Escalable sin switch statements
- ✅ **Formateo automático de teléfonos ecuatorianos** - 09xxxxxxxx → +593 automáticamente
- ✅ **Sin dependencias externas problemáticas** - No FileSaver, no SweetAlert2
- ✅ **Constants en lugar de ConfigService** - Más simple y directo
- ✅ **Separación clara** - Report ≠ Printer ≠ WhatsApp ≠ Utils
- ✅ **API completamente alineada** - Con tu implementación real
- ✅ **Código limpio** - Sin duplicación, principios DRY aplicados
- ✅ **TypeScript completo** - Tipado fuerte con validaciones
- ✅ **Fácil de mantener** - Estructura clara y coherente
- ✅ **Tree-shaking optimizado** - Mejor bundle size con utilidades estáticas
