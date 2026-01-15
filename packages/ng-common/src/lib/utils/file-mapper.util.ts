/**
 * Utilidades para manejo de archivos y respuestas HTTP
 */
export class FileMapperUtil {
  /**
   * Extrae el nombre de archivo desde el header Content-Disposition
   */
  static extractFileName(response: any): string {
    const contentDisposition = response.headers?.get('content-disposition');

    if (!contentDisposition) {
      return this.generateDefaultFileName();
    }

    // Método más robusto para extraer filename
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);

    if (matches && matches[1]) {
      let fileName = matches[1].replace(/['"]/g, '');
      // Limpiar caracteres especiales
      fileName = fileName.replaceAll('+', ' ').trim();
      return fileName || this.generateDefaultFileName();
    }

    // Fallback: método simple
    const simpleParse = contentDisposition.split('filename=')[1];
    if (simpleParse) {
      return simpleParse.replace(/['"]/g, '').trim() || this.generateDefaultFileName();
    }

    return this.generateDefaultFileName();
  }

  /**
   * Crea un objeto File desde una respuesta HTTP
   */
  static fromResponse(response: any): File {
    const fileName = this.extractFileName(response);
    const contentType = response.headers?.get('content-type') || 'application/octet-stream';

    return new File([response.body], fileName, { type: contentType });
  }

  /**
   * Descarga un archivo usando la API nativa del navegador
   */
  static downloadFile(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpiar el objeto URL
    URL.revokeObjectURL(url);
  }

  /**
   * Abre un archivo en una nueva ventana (para PDFs)
   */
  static openFile(blob: Blob, fileName: string): void {
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, fileName);

    // Limpiar URL después de un tiempo
    setTimeout(() => URL.revokeObjectURL(fileURL), 1000);
  }

  /**
   * Detecta si es un navegador legacy que requiere descarga forzada
   */
  static isLegacyBrowser(): boolean {
    const userAgent = navigator.userAgent;
    return !!(userAgent.match(/Edge/g) || userAgent.match(/.NET/g) || userAgent.match(/MSIE/g));
  }

  private static generateDefaultFileName(): string {
    const timestamp = Date.now();
    return `document_${timestamp}.pdf`;
  }
}
