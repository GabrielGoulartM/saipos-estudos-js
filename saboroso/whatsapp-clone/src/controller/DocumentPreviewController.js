import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export class DocumentPreviewController {
  constructor(file) {
    this._file = file;
  }

  getPreviewData() {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      switch (this._file.type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/gif':
          reader.onload = (e) => {
            resolve({
              src: e.target.result,
              info: this._file.name,
            });
          };

          reader.onerror = (e) => {
            reject(e);
          };

          reader.readAsDataURL(this._file);
          break;

        case 'application/pdf':
        case 'application/pdf':
        case 'application/pdf':
          resolve({
            src: 'isPDF', // Mandamos um "aviso" em vez da imagem
            info: this._file.name,
          });
          break;
          break;

          break;

        default:
          reject('Tipo de arquivo não suportado');
      }
    });
  }
}
