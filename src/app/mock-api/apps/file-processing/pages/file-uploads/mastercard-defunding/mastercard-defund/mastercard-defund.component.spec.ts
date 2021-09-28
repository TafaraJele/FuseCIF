import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercardDefundComponent } from './mastercard-defund.component';

describe('MastercardDefundComponent', () => {
  let component: MastercardDefundComponent;
  let fixture: ComponentFixture<MastercardDefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastercardDefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercardDefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
