import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDemoComponent } from './pdf-demo.component';

describe('PdfDemoComponent', () => {
  let component: PdfDemoComponent;
  let fixture: ComponentFixture<PdfDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
