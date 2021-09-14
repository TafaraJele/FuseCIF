import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFlexcubeComponent } from './settings-flexcube.component';

describe('SettingsFlexcubeComponent', () => {
  let component: SettingsFlexcubeComponent;
  let fixture: ComponentFixture<SettingsFlexcubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFlexcubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFlexcubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
