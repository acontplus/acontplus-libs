import { CustomerFormConfig } from './domain/models/form-config.model';

// Configuración COMPLETA para App Principal
export const MAIN_APP_CUSTOMER_CONFIG: CustomerFormConfig = {
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
