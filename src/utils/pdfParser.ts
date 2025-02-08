import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import workerSrc from 'pdfjs-dist/legacy/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    console.log('Starting PDF text extraction...');

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    console.log(`PDF loaded: ${pdf.numPages} pages`);

    const textContent: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items
        .map(item => (isTextItem(item) ? item.str : ''))
        .join(' ');

      textContent.push(pageText);
      console.log(`Extracted text from page ${i}`);
    }

    const fullText = textContent.join('\n\n');
    console.log('PDF text extraction completed');
    return fullText;

  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('PDFからのテキスト抽出に失敗しました。');
  }
}

// 型ガード関数
function isTextItem(item: any): item is { str: string } {
  return item && typeof item.str === 'string';
}
