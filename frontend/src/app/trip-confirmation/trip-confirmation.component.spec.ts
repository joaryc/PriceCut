import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripConfirmationComponent } from './trip-confirmation.component';

describe('TripConfirmationComponent', () => {
  let component: TripConfirmationComponent;
  let fixture: ComponentFixture<TripConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
