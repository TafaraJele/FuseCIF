import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAmlockComponent } from './settings-amlock.component';

describe('SettingsAmlockComponent', () => {
  let component: SettingsAmlockComponent;
  let fixture: ComponentFixture<SettingsAmlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAmlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAmlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
