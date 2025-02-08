declare module 'pdfjs-dist/legacy/build/pdf' {
  import { PDFDocumentProxy, PDFPageProxy, TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

  export function getDocument(src: any): { promise: Promise<PDFDocumentProxy> };

  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
}

declare module 'pdfjs-dist/legacy/build/pdf.worker.entry' {
  const workerSrc: string;
  export default workerSrc;
}
