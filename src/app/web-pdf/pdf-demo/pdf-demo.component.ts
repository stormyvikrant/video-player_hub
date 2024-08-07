import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-pdf-demo',
  templateUrl: './pdf-demo.component.html',
  styleUrls: ['./pdf-demo.component.scss'],
})
export class PdfDemoComponent {
  constructor(private router: Router) {}
  goForTogethring(pdfUrl: string) {
    this.router.navigate(['/pdfview'], {
      queryParams: { url: encodeURIComponent(pdfUrl) },
    });
  }

  pdfSrc: string | ArrayBuffer | null = null; // To store the PDF URL

  generatePdfFromHtml(containerId: string) {
    console.log('check', containerId);
    const element = document.getElementById(containerId);
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        // Correct usage of addImage with 5 arguments (x, y, w, h are required)
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0); // x, y, width, height
        // Save the PDF
        // doc.save('html-to-pdf.pdf');

        // Convert PDF to Blob
        const pdfBlob = doc.output('blob');
        // Create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);
        // Set the PDF URL to display
        this.pdfSrc = pdfUrl;
        this.goForTogethring(this.pdfSrc);

        //  });
      });
    }
  }
}
