import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomerValidators {
  // Validador para que termine en 001
  static endsWith001(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.length >= 3) {
        if (!value.endsWith('001')) {
          return { endsWith001: true };
        }
      }
      return null;
    };
  }

  // Validador para RUC ecuatoriano (13 dígitos)
  static ecuadorianRuc(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      // Debe ser exactamente 13 dígitos
      if (!/^\d{13}$/.test(value)) {
        return { invalidRuc: true };
      }

      // Debe terminar en 001
      if (!value.endsWith('001')) {
        return { rucMustEndWith001: true };
      }

      return null;
    };
  }

  // Validador para cédula ecuatoriana (10 dígitos)
  static ecuadorianCedula(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      if (!/^\d{10}$/.test(value)) {
        return { invalidCedula: true };
      }

      // Algoritmo de validación de cédula ecuatoriana
      const provincia = parseInt(value.substring(0, 2));
      if (provincia < 1 || provincia > 24) {
        return { invalidProvince: true };
      }

      const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      let suma = 0;

      for (let i = 0; i < 9; i++) {
        let valor = parseInt(value.charAt(i)) * coeficientes[i];
        if (valor >= 10) valor -= 9;
        suma += valor;
      }

      const digitoVerificador = parseInt(value.charAt(9));
      const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);

      if (resultado !== digitoVerificador) {
        return { invalidCheckDigit: true };
      }

      return null;
    };
  }

  // Validador de email
  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { invalidEmail: true };
      }

      return null;
    };
  }

  // Validador de teléfono ecuatoriano
  static ecuadorianPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      // Debe empezar con 0 y tener 9-10 dígitos
      if (!/^0\d{8,9}$/.test(value)) {
        return { invalidPhone: true };
      }

      return null;
    };
  }
}
