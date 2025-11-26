import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CUSTOMER_FORM_CONFIG, CUSTOMER_SERVICE } from '../../injection-tokens';
import { MAIN_APP_CUSTOMER_CONFIG } from '../../customer-form.config';
import { CustomerService } from '../../data-access/services/customer';

@Component({
  selector: 'acp-customer-form',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.scss'],
})
export class CustomerFormComponent implements OnInit {
  @Input() customer?: any;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  config = inject(CUSTOMER_FORM_CONFIG, { optional: true }) ?? MAIN_APP_CUSTOMER_CONFIG;

  private customerService = inject(CUSTOMER_SERVICE, { optional: true }) ?? inject(CustomerService);

  form!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.buildForm();
    if (this.customer) {
      this.form.patchValue(this.customer);
    }
  }

  private buildForm(): void {
    const formConfig: any = {};

    // Construye el form dinámicamente basado en la configuración
    Object.entries(this.config.fields).forEach(([key, fieldConfig]) => {
      if (fieldConfig.visible) {
        const validators = fieldConfig.required ? [Validators.required] : [];

        // Añadir validadores específicos
        if (key === 'email' && fieldConfig.visible) {
          validators.push(Validators.email);
        }
        if (key === 'idCard' && fieldConfig.required) {
          validators.push(Validators.minLength(10));
        }

        formConfig[key] = [this.customer ? this.customer[key as keyof any] : '', validators];
      }
    });

    this.form = this.fb.group(formConfig);
  }

  isFieldVisible(fieldName: string): boolean {
    return this.config.fields[fieldName as keyof typeof this.config.fields]?.visible || false;
  }

  isFieldRequired(fieldName: string): boolean {
    return this.config.fields[fieldName as keyof typeof this.config.fields]?.required || false;
  }

  getFieldLabel(fieldName: string): string {
    return this.config.fields[fieldName as keyof typeof this.config.fields]?.label || fieldName;
  }

  getFieldPlaceholder(fieldName: string): string {
    return this.config.fields[fieldName as keyof typeof this.config.fields]?.placeholder || '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const customerData: any = this.form.value;

    // Validación adicional del servicio
    if (this.customerService?.validate) {
      const validationErrors = this.customerService.validate(customerData);
      if (validationErrors) {
        this.errorMessage = 'Por favor corrija los errores de validación';
        console.error('Validation errors:', validationErrors);
        return;
      }
    }

    this.isLoading = true;
    this.errorMessage = null;

    const operation$ =
      this.mode === 'create'
        ? this.customerService!.create(customerData)
        : this.customerService!.update(this.customer!.id!, customerData);

    operation$.subscribe({
      next: (savedCustomer: any) => {
        this.isLoading = false;
        this.submitted.emit(savedCustomer);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al guardar el cliente';
        console.error('Error saving customer:', error);
      },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.getFieldLabel(fieldName)} es requerido`;
    }
    if (control.errors['email']) {
      return 'Email inválido';
    }
    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
