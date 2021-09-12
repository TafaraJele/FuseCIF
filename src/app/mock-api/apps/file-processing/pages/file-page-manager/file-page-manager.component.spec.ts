import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePageManagerComponent } from './file-page-manager.component';

describe('FilePageManagerComponent', () => {
  let component: FilePageManagerComponent;
  let fixture: ComponentFixture<FilePageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilePageManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
