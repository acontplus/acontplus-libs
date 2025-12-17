import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
  signal,
  input,
  output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  COMPANY_CUSTOMER_FORM_CONFIG,
  COMPANY_CUSTOMER_SERVICE,
} from '../../../tokens/injection-tokens';
import { CompanyCustomerService } from '../../data-access/services/company-customer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { Button, InputChip, ToUpperCase } from '@acontplus/ng-components';
import { MatSelectModule } from '@angular/material/select';
import { CustomerValidators } from '../../../shared/utils/customer.validators';
import {
  CompanyCustomerFormConfig,
  CreditFieldsConfig,
  Customer,
  FieldConfig,
} from '../../models';
import { MAIN_APP_COMPANY_CUSTOMER_CONFIG } from '../../config';
import {  MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'acp-company-customer-form',
  exportAs: 'acpCustomerForm',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatIcon,
    Button,
    ToUpperCase,
    InputChip,
    MatButtonModule
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './company-customer-form.html',
  styleUrls: ['./company-customer-form.scss'],
})
export class CompanyCustomerFormComponent implements OnInit {
  formId = input<string | undefined>();
  @Input() customer?: any;
  @Input() mode: 'create' | 'edit' = 'create';
  showButtons = input(true);
  submitted = output<any>();
  cancelled = output<void>();
  readonly panelOpenState = signal(false);
  private fb = inject(FormBuilder);

  config =
    inject(COMPANY_CUSTOMER_FORM_CONFIG, { optional: true }) ?? MAIN_APP_COMPANY_CUSTOMER_CONFIG;

  private customerService =
    inject(COMPANY_CUSTOMER_SERVICE, { optional: true }) ?? inject(CompanyCustomerService);

  form!: FormGroup;
  isLoading = signal(false);
  errorMessage: string | null = null;

  step = signal(0);

  emails: string[] = [];

  telephones: string[] = [];

  tiemposCredito = signal<any[]>([]);
  tipoContribuyentes = signal<any[]>([]);
  tiposCliente = signal<any[]>([]);
  tiposIdentificacion = signal<any[]>([]);
  formasPagoSri = signal<any[]>([]);
  placas = signal<any[]>([]);
  ciudades = signal<any[]>([]);
  cargos = signal<any[]>([]);
  empresas = signal<any[]>([]);
  employees = signal<any[]>([]);

  maritalStatuses = signal<any[]>([]);
  housingTypes = signal<any[]>([]);

  showRefresh = signal(true);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.customer) {
      this.patchFormValue(this.customer);
    }
  }

  private getDefaultConfig(): CompanyCustomerFormConfig {
    // Configuración por defecto
    return {} as CompanyCustomerFormConfig;
  }

  // Método mejorado para acceder a campos de crédito
  getCreditFieldConfig(fieldName: keyof CreditFieldsConfig): FieldConfig | undefined {
    return this.config.creditFields?.[fieldName];
  }

  isCreditFieldVisible(fieldName: keyof CreditFieldsConfig): boolean {
    const field = this.getCreditFieldConfig(fieldName);
    return field?.visible || false;
  }

  isCreditFieldRequired(fieldName: keyof CreditFieldsConfig): boolean {
    const field = this.getCreditFieldConfig(fieldName);
    return field?.required || false;
  }

  getCreditFieldLabel(fieldName: keyof CreditFieldsConfig): string {
    const field = this.getCreditFieldConfig(fieldName);
    return field?.label || fieldName;
  }

  getCreditFieldPlaceholder(fieldName: keyof CreditFieldsConfig): string {
    const field = this.getCreditFieldConfig(fieldName);
    return field?.placeholder || '';
  }

  // Método mejorado para construir el FormGroup de crédito
  private buildCreditFormGroup(): FormGroup {
    if (!this.config.showCreditInfo || !this.config.creditFields) {
      return this.fb.group({
        maritalStatusId: [null],
        conyugeNombre: [null],
        conyugeTel: [null],
        refFamNombre: [null],
        refFamTel: [null],
        housingTypeId: [null],
        dirVivienda: [null],
        refDomicilio: [null],
        sector: [null],
        barrio: [null],
        calle: [null],
      });
    }

    // Construir dinámicamente basado en la config
    const creditGroup: any = {};
    const creditFields = this.config.creditFields;

    Object.keys(creditFields).forEach(key => {
      const fieldConfig = creditFields[key as keyof CreditFieldsConfig];
      const validators = fieldConfig.required ? [Validators.required] : [];
      creditGroup[key] = [null, validators];
    });

    return this.fb.group(creditGroup);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      // IDs
      idCliente: [0],
      idEmpresa: [0],
      idCargo: [0],
      idFormaPagoSri: [0],
      idTipoClienteProveedor: [0],
      idSubContribuyente: [0],
      idTiempoCredito: [0],
      idCiudad: [0],
      idEmpleado: [0],

      // Datos principales con validadores
      idTipoIdentificacion: [
        0,
        this.config.fields.idTipoIdentificacion.required ? [Validators.required] : [],
      ],
      numeroIdentificacion: ['', this.getValidatorsForField('numeroIdentificacion')],
      nombreFiscal: ['', this.getValidatorsForField('nombreFiscal')],
      nombreComercial: [''],
      direccion: ['', this.getValidatorsForField('direccion')],
      correo: ['', this.getValidatorsForField('correo')],
      telefono: ['', this.getValidatorsForField('telefono')],
      placa: [''],
      nota: [''],
      birthDate: [null],

      // Estados
      estado: [false],
      validationSri: [false],
      configValorBruto: [false],

      // FormGroup anidado para info de crédito
      dataInfoCred: this.buildCreditFormGroup(),
    });
  }

  private patchFormValue(customer: Customer): void {
    this.form.patchValue({
      idCliente: customer.idCliente || 0,
      idEmpresa: customer.idEmpresa || 0,
      idCargo: customer.idCargo || 0,
      idFormaPagoSri: customer.idFormaPagoSri || 0,
      idTipoClienteProveedor: customer.idTipoClienteProveedor || 0,
      idTipoIdentificacion: customer.idTipoIdentificacion || 0,
      idSubContribuyente: customer.idSubContribuyente || 0,
      idTiempoCredito: customer.idTiempoCredito || 0,
      idCiudad: customer.idCiudad || 0,
      idEmpleado: customer.idEmpleado || 0,

      numeroIdentificacion: customer.numeroIdentificacion || '',
      nombreFiscal: customer.nombreFiscal || '',
      nombreComercial: customer.nombreComercial || '',
      direccion: customer.direccion || '',
      correo: customer.correo || '',
      telefono: customer.telefono || '',
      placa: customer.placa || '',
      nota: customer.nota || '',
      birthDate: customer.birthDate || null,

      estado: customer.estado || false,
      validationSri: customer.validationSri || false,
      configValorBruto: customer.configValorBruto || false,

      dataInfoCred: customer.dataInfoCred || {},
    });
  }

  // Método mejorado para obtener validadores
  private getValidatorsForField(fieldName: keyof CompanyCustomerFormConfig['fields']): any[] {
    const validators: any[] = [];
    const fieldConfig = this.config.fields[fieldName];

    if (!fieldConfig) return validators;

    if (fieldConfig.required) {
      validators.push(Validators.required);
    }

    // Validadores específicos por campo
    switch (fieldName) {
      case 'numeroIdentificacion':
        validators.push(Validators.minLength(13));
        validators.push(Validators.maxLength(13));
        validators.push(CustomerValidators.endsWith001());
        break;

      case 'correo':
        if (fieldConfig.visible) {
          validators.push(CustomerValidators.email());
        }
        break;

      case 'telefono':
        if (fieldConfig.visible) {
          validators.push(CustomerValidators.ecuadorianPhone());
        }
        break;
    }

    // Validadores custom del config
    if (fieldConfig.validators) {
      validators.push(...fieldConfig.validators);
    }

    return validators;
  }

  // Métodos mejorados de acceso
  isFieldVisible(fieldName: keyof CompanyCustomerFormConfig['fields']): boolean {
    return this.config.fields[fieldName]?.visible || false;
  }

  isFieldRequired(fieldName: keyof CompanyCustomerFormConfig['fields']): boolean {
    return this.config.fields[fieldName]?.required || false;
  }

  getFieldLabel(fieldName: keyof CompanyCustomerFormConfig['fields']): string {
    return this.config.fields[fieldName]?.label || fieldName;
  }

  getFieldPlaceholder(fieldName: keyof CompanyCustomerFormConfig['fields']): string {
    return this.config.fields[fieldName]?.placeholder || '';
  }

  identificationTypeChange($ev: any) {
    console.log($ev);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const customerData: Customer = this.form.getRawValue();

    if (this.customerService?.validate) {
      const validationErrors = this.customerService.validate(customerData);
      if (validationErrors) {
        this.errorMessage = 'Por favor corrija los errores de validación';
        return;
      }
    }

    this.isLoading.set(true);
    this.errorMessage = null;

    const operation$ =
      this.mode === 'create'
        ? this.customerService!.create(customerData)
        : this.customerService!.update(this.customer!.id!, customerData);

    operation$.subscribe({
      next: (savedCustomer: any) => {
        this.isLoading.set(false);
        this.submitted.emit(savedCustomer);
      },
      error: (error: any) => {
        this.isLoading.set(false);
        this.errorMessage = error.message || 'Error al guardar el cliente';
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
      return `${this.getFieldLabel(fieldName as any)} es requerido`;
    }
    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors['maxlength']) {
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    }
    if (control.errors['endsWith001']) {
      return 'Debe terminar en 001';
    }
    if (control.errors['invalidRuc']) {
      return 'RUC inválido';
    }
    if (control.errors['invalidCedula']) {
      return 'Cédula inválida';
    }
    if (control.errors['invalidEmail']) {
      return 'Email inválido';
    }
    if (control.errors['invalidPhone']) {
      return 'Teléfono inválido (debe empezar con 0)';
    }

    return 'Campo inválido';
  }

  // Getters para FormGroups anidados
  get dataInfoCredForm(): FormGroup {
    return this.form.get('dataInfoCred') as FormGroup;
  }



  searchIdentificacion($event: MouseEvent){
    $event.stopPropagation();
    console.log('search');
  }

}
