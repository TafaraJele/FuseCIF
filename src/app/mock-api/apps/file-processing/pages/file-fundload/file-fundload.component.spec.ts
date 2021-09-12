import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFundloadComponent } from './file-fundload.component';

describe('FileFundloadComponent', () => {
  let component: FileFundloadComponent;
  let fixture: ComponentFixture<FileFundloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFundloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFundloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
