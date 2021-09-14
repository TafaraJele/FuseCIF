import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPaymentFileComponent } from './settings-payment-file.component';

describe('SettingsPaymentFileComponent', () => {
  let component: SettingsPaymentFileComponent;
  let fixture: ComponentFixture<SettingsPaymentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPaymentFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPaymentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
