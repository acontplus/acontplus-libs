import { Component, OnInit, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Observable, throwError } from 'rxjs';
import { WhatsAppMessagingFacade } from '../../facades/whatsapp.facade';
import { ReportFacade } from '../../facades/report.facade';
import { ReportParamsBuilder } from '../../builders/report-params.builder';
import { PhoneFormatterUtil } from '../../utils/phone-formatter.util';
import { FileMapperUtil } from '../../utils/file-mapper.util';

export interface DocumentData {
  idDocumentoElectronico?: number;
  documentoId?: number;
  codDoc: string;
  docType?: string;
  codEstab?: string;
  id?: number;
  serie?: string;
}

export interface WhatsAppSendConfig {
  documentData?: DocumentData;
  phoneNumbers?: string[];
  defaultMessage?: string;
  establishmentPhone?: string;
  establishmentName?: string;
  customerName?: string;
}

@Component({
  selector: 'acp-whatsapp-sender',
  templateUrl: './whatsapp-sender.html',
  styleUrls: ['./whatsapp-sender.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
})
export class WhatsAppSender implements OnInit {
  @Input() config?: WhatsAppSendConfig;

  private readonly fb = inject(FormBuilder);
  private readonly whatsappFacade = inject(WhatsAppMessagingFacade);
  private readonly reportFacade = inject(ReportFacade);
  private readonly snackBar = inject(MatSnackBar);

  whatsappForm!: FormGroup;
  isLoading = signal(false);
  messageLength = 0;
  phoneNumbers = signal<string[]>([]);
  showWhatsAppWebLink = signal(false);
  whatsAppWebUrl = signal('');

  // Datos del documento y establecimiento
  establishmentPhone = '';
  establishmentName = '';
  customerName = '';

  ngOnInit(): void {
    this.initializeForm();
    this.setupMessageLengthCounter();
    this.loadConfigData();
  }

  private loadConfigData(): void {
    if (this.config) {
      if (this.config.phoneNumbers) {
        this.phoneNumbers.set(this.config.phoneNumbers);
        if (this.config.phoneNumbers.length > 0) {
          this.whatsappForm.patchValue({ phoneNumber: this.config.phoneNumbers[0] });
        }
      }

      if (this.config.defaultMessage) {
        this.whatsappForm.patchValue({ message: this.config.defaultMessage });
      }

      this.establishmentPhone = this.config.establishmentPhone || '';
      this.establishmentName = this.config.establishmentName || '';
      this.customerName = this.config.customerName || '';
    }
  }

  private initializeForm(): void {
    this.whatsappForm = this.fb.group({
      phoneNumber: ['', [Validators.required, this.ecuadorianPhoneValidator.bind(this)]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  // Validador personalizado para números ecuatorianos
  private ecuadorianPhoneValidator(control: any) {
    if (!control.value) return null;

    const validation = PhoneFormatterUtil.validateEcuadorianPhone(control.value);

    return validation.isValid ? null : { invalidPhone: true };
  }

  private setupMessageLengthCounter(): void {
    this.whatsappForm.get('message')?.valueChanges.subscribe((value) => {
      this.messageLength = value ? value.length : 0;
    });
  }

  sendWhatsApp(): void {
    if (this.whatsappForm.valid) {
      if (!this.validatePhoneNumber()) return;

      const { phoneNumber, message } = this.whatsappForm.value;

      // Si hay configuración de documento, generar y enviar archivo
      if (this.config?.documentData) {
        this.sendWithDocument(phoneNumber, message);
      } else {
        // Envío simple de texto
        this.sendSimpleMessage(phoneNumber, message);
      }
    }
  }

  private validatePhoneNumber(): boolean {
    const phoneNumber = this.whatsappForm.get('phoneNumber')?.value;
    const validation = PhoneFormatterUtil.validateEcuadorianPhone(phoneNumber);

    if (!validation.isValid) {
      this.showError(validation.errorMessage || 'Número de teléfono inválido');
      return false;
    }

    return true;
  }

  private sendSimpleMessage(phoneNumber: string, message: string): void {
    this.isLoading.set(true);

    this.whatsappFacade.sendSimpleText(phoneNumber, message).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.showSuccess('Mensaje enviado exitosamente');
          this.clearForm();
        } else {
          this.showError(response.error?.message || 'Error al enviar mensaje');
          this.prepareWhatsAppWebLink(phoneNumber, message);
        }
      },
      error: (_error) => {
        this.isLoading.set(false);
        this.showError('Error de conexión');
        this.prepareWhatsAppWebLink(phoneNumber, message);
      },
    });
  }

  private sendWithDocument(phoneNumber: string, message: string): void {
    if (!this.config?.documentData) return;

    this.isLoading.set(true);

    // Generar el reporte primero
    this.generateReport().subscribe({
      next: (reportResponse) => {
        if (reportResponse) {
          const { file, fileName } = this.processReportFile(reportResponse);
          this.sendMediaWithMessages(phoneNumber, message, file, fileName);
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error generando reporte:', error);
        this.showError('Error al generar el documento');
      },
    });
  }

  private generateReport(): Observable<any> {
    const docData = this.config!.documentData!;

    // Construir opciones de reporte
    const reportOptions = ReportParamsBuilder.build(docData, 'pdf', true);

    const reportResult = this.reportFacade.generate(reportOptions);

    // Manejar el caso donde generate puede retornar void
    return reportResult || throwError(() => new Error('No se pudo generar el reporte'));
  }

  private processReportFile(response: any): { file: File; fileName: string } {
    const file = FileMapperUtil.fromResponse(response);
    const fileName = FileMapperUtil.extractFileName(response);

    return { file, fileName };
  }

  private sendMediaWithMessages(
    phoneNumber: string,
    message: string,
    file: File,
    fileName: string,
  ): void {
    const formattedPhone = PhoneFormatterUtil.formatForWhatsAppApi(phoneNumber);

    // Enviar solo el documento con el mensaje como caption
    this.whatsappFacade
      .sendDocumentWithTemplate({
        phone: formattedPhone,
        file: file,
        templateName: 'documento_generico',
        bodyParams: [message],
        filename: fileName,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.showSuccess('Documento enviado correctamente');
          this.clearForm();
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Error enviando documento:', error);
          this.showError('Error al enviar el documento');
          this.prepareWhatsAppWebLink(phoneNumber, message);
        },
      });
  }

  private prepareWhatsAppWebLink(phoneNumber: string, message: string): void {
    const cleanPhoneNumber = PhoneFormatterUtil.formatForWhatsAppWeb(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;

    this.whatsAppWebUrl.set(whatsappUrl);
    this.showWhatsAppWebLink.set(true);
  }

  openWhatsAppWeb(): void {
    const url = this.whatsAppWebUrl();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  hideWhatsAppWebLink(): void {
    this.showWhatsAppWebLink.set(false);
    this.whatsAppWebUrl.set('');
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  clearForm(): void {
    this.whatsappForm.reset();
    this.messageLength = 0;
    this.hideWhatsAppWebLink();
  }

  // Método para mostrar el formato del teléfono
  get formattedPhoneDisplay(): string {
    const phone = this.whatsappForm.get('phoneNumber')?.value;
    return PhoneFormatterUtil.formatForDisplay(phone || '');
  }

  // Método para obtener placeholder dinámico
  get phonePlaceholder(): string {
    return PhoneFormatterUtil.getPhonePlaceholder();
  }

  // Método para obtener el hint del campo
  get phoneHint(): string {
    const phone = this.whatsappForm.get('phoneNumber')?.value;
    return PhoneFormatterUtil.getPhoneHint(phone || '');
  }
}
