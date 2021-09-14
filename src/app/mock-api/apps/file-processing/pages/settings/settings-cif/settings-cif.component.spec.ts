import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCifComponent } from './settings-cif.component';

describe('SettingsCifComponent', () => {
  let component: SettingsCifComponent;
  let fixture: ComponentFixture<SettingsCifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsCifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
