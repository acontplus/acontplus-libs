// Configuración COMPLETA para App Principal
import { CompanyCustomerFormConfig } from '../../shared/form-config.model';

export const MAIN_APP_COMPANY_CUSTOMER_CONFIG: CompanyCustomerFormConfig = {
  fields: {
    idCard: {
      name: 'idCard',
      required: true,
      visible: true,
      label: 'Cédula/RUC',
      placeholder: 'Ingrese cédula o RUC',
    },
    name: {
      name: 'name',
      required: true,
      visible: true,
      label: 'Nombres',
      placeholder: 'Ingrese nombres completos',
    },
    lastName: {
      name: 'lastName',
      required: true,
      visible: true,
      label: 'Apellidos',
      placeholder: 'Ingrese apellidos completos',
    },
    email: {
      name: 'email',
      required: true,
      visible: true,
      label: 'Correo Electrónico',
      placeholder: 'ejemplo@correo.com',
    },
    phone: {
      name: 'phone',
      required: true,
      visible: true,
      label: 'Teléfono',
      placeholder: '0999999999',
    },
    address: {
      name: 'address',
      required: true,
      visible: true,
      label: 'Dirección',
      placeholder: 'Calle principal y secundaria',
    },
    city: {
      name: 'city',
      required: true,
      visible: true,
      label: 'Ciudad',
      placeholder: 'Seleccione ciudad',
    },
    dateOfBirth: {
      name: 'dateOfBirth',
      required: false,
      visible: true,
      label: 'Fecha de Nacimiento',
      placeholder: 'DD/MM/AAAA',
    },
    notes: {
      name: 'notes',
      required: false,
      visible: true,
      label: 'Notas',
      placeholder: 'Observaciones adicionales',
    },
  },
  submitButtonText: 'Guardar Cliente',
  cancelButtonText: 'Cancelar',
};

// Configuración MÍNIMA para POS
export const POS_COMPANY_CUSTOMER_CONFIG: CompanyCustomerFormConfig = {
  fields: {
    idCard: {
      name: 'idCard',
      required: true,
      visible: true,
      label: 'Cédula',
      placeholder: 'Cédula del cliente',
    },
    name: {
      name: 'name',
      required: true,
      visible: true,
      label: 'Nombre',
      placeholder: 'Nombre del cliente',
    },
    lastName: {
      name: 'lastName',
      required: false,
      visible: false, // Oculto en POS
    },
    email: {
      name: 'email',
      required: false,
      visible: false, // Oculto en POS
    },
    phone: {
      name: 'phone',
      required: false,
      visible: false, // Oculto en POS
    },
    address: {
      name: 'address',
      required: false,
      visible: false, // Oculto en POS
    },
    city: {
      name: 'city',
      required: false,
      visible: false, // Oculto en POS
    },
    dateOfBirth: {
      name: 'dateOfBirth',
      required: false,
      visible: false, // Oculto en POS
    },
    notes: {
      name: 'notes',
      required: false,
      visible: false, // Oculto en POS
    },
  },
  submitButtonText: 'Agregar',
  cancelButtonText: 'Cancelar',
};
