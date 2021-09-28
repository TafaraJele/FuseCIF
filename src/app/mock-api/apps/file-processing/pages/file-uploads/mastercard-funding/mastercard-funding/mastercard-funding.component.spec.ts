import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercardFundingComponent } from './mastercard-funding.component';

describe('MastercardFundingComponent', () => {
  let component: MastercardFundingComponent;
  let fixture: ComponentFixture<MastercardFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastercardFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercardFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
