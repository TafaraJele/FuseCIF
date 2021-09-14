import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFimiComponent } from './settings-fimi.component';

describe('SettingsFimiComponent', () => {
  let component: SettingsFimiComponent;
  let fixture: ComponentFixture<SettingsFimiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFimiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
