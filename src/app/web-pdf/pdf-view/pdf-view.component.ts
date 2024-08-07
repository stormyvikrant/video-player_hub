import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
declare const pdfjsLib: any;

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss'],
})
export class PdfViewComponent implements OnInit {
  // pdfUrl: string = 'https://www.pdf995.com/samples/pdf.pdf';
  pdfUrl: string = '../../../assets/page1.pdf';

  // @ViewChild('pdfCanvas') pdfCanvas!: ElementRef<HTMLCanvasElement>;
  // pdfDoc!: PDFDocumentProxy;
  // currentPage = 1;

  // constructor() {}

  // ngOnInit(): void {
  //   // Set the worker path after importing pdfjs-dist

  //   pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  //   this.loadPdf();
  // }

  // // loadPdf(): void {
  // //   pdfjsLib
  // //     .getDocument(this.pdfUrl)
  // //     .promise.then((pdfDoc_) => {
  // //       this.pdfDoc = pdfDoc_;
  // //       this.renderPage(this.currentPage);
  // //     })
  // //     .catch((error) => {
  // //       console.error('Error loading PDF:', error);
  // //     });
  // // }

  // renderPage(pageNumber: number): void {
  //   if (!this.pdfDoc) return;

  //   this.pdfDoc
  //     .getPage(pageNumber)
  //     .then((page: PDFPageProxy) => {
  //       const scale = 1.5;
  //       const viewport = page.getViewport({ scale });

  //       const canvas = this.pdfCanvas.nativeElement;
  //       const context = canvas.getContext('2d');

  //       if (context) {
  //         canvas.height = viewport.height;
  //         canvas.width = viewport.width;

  //         const renderContext = {
  //           canvasContext: context,
  //           viewport: viewport,
  //         };

  //         page
  //           .render(renderContext)
  //           .promise.then(() => {
  //             console.log('Page rendered');
  //           })
  //           .catch((error) => {
  //             console.error('Error rendering page:', error);
  //           });
  //       } else {
  //         console.error('Failed to get canvas context');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error getting page:', error);
  //     });
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.pdfDoc.numPages) {
  //     this.currentPage++;
  //     this.renderPage(this.currentPage);
  //   }
  // }

  // prevPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.renderPage(this.currentPage);
  //   }
  // }

  pdfDoc: PDFDocumentProxy | null = null;
  currentPage: number = 1;
  totalPages: number = 0;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  scale: number = 1.5;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const url = params['url'];
      if (url) {
        this.loadPdf(decodeURIComponent(url));
      }
    });
  }

  loadPdf(url: string) {
    this.canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas?.getContext('2d') || null;
    pdfjsLib
      .getDocument(url)
      .promise.then((pdfDoc_: PDFDocumentProxy | null) => {
        this.pdfDoc = pdfDoc_;
        this.totalPages = pdfDoc_!.numPages;
        this.renderPage(this.currentPage);
      });
  }

  renderPage(pageNum: number) {
    if (!this.pdfDoc) return;

    this.pdfDoc.getPage(pageNum).then((page: PDFPageProxy) => {
      const viewport = page.getViewport({ scale: this.scale });
      this.canvas!.height = viewport.height;
      this.canvas!.width = viewport.width;

      const renderContext = {
        canvasContext: this.ctx!,
        viewport: viewport,
      };
      page.render(renderContext);
    });

    this.currentPage = pageNum;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  nextPage() {
    if (this.pdfDoc && this.currentPage < this.pdfDoc.numPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }
}
