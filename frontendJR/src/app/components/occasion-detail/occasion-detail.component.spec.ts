import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionDetailComponent } from './occasion-detail.component';

describe('TourDetailComponent', () => {
  let component: OccasionDetailComponent;
  let fixture: ComponentFixture<OccasionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccasionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
