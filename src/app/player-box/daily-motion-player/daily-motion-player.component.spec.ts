import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMotionPlayerComponent } from './daily-motion-player.component';

describe('DailyMotionPlayerComponent', () => {
  let component: DailyMotionPlayerComponent;
  let fixture: ComponentFixture<DailyMotionPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyMotionPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyMotionPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
