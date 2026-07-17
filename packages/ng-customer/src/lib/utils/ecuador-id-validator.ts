import { EcuadorIdType } from '../data';

export class EcuadorIdValidator {
  static getType(id: string): EcuadorIdType | null {
    if (!id) return null;

    id = id.trim();

    if (id.length === 10) return EcuadorIdType.CEDULA;
    if (id.length === 13) return EcuadorIdType.RUC;

    return null;
  }

  static isValid(id: string): boolean {
    const type = this.getType(id);

    if (type === EcuadorIdType.CEDULA) {
      return this.isCedula(id);
    }

    if (type === EcuadorIdType.RUC) {
      return this.isRuc(id);
    }

    return false;
  }

  static isCedula(id: string): boolean {
    if (!/^\d{10}$/.test(id)) return false;

    const provincia = Number.parseInt(id.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
      let valor = Number.parseInt(id[i]) * coeficientes[i];
      if (valor > 9) valor -= 9;
      suma += valor;
    }

    const digito = Number.parseInt(id[9]);
    const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);

    return resultado === digito;
  }

  static isRuc(id: string): boolean {
    if (!/^\d{13}$/.test(id)) return false;

    const tercerDigito = Number.parseInt(id[2]);

    if (tercerDigito < 6) {
      const cedula = id.substring(0, 10);
      return this.isCedula(cedula) && id.endsWith('001');
    }

    if (tercerDigito === 6) {
      return id.endsWith('0001');
    }

    if (tercerDigito === 9) {
      return this.isSociedadRuc(id);
    }

    return false;
  }

  private static isSociedadRuc(id: string): boolean {
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
      suma += Number.parseInt(id[i]) * coeficientes[i];
    }

    const residuo = suma % 11;
    const digito = residuo === 0 ? 0 : 11 - residuo;

    return digito === Number.parseInt(id[9]) && id.endsWith('001');
  }

  static getRucType(id: string): string | null {
    if (!this.isRuc(id)) return null;

    const tercerDigito = Number.parseInt(id[2]);

    if (tercerDigito < 6) return 'Persona Natural';
    if (tercerDigito === 6) return 'Entidad Pública';
    if (tercerDigito === 9) return 'Sociedad Privada';

    return 'Desconocido';
  }
}
