import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDefundListComponent } from './file-defund-list.component';

describe('FileDefundListComponent', () => {
  let component: FileDefundListComponent;
  let fixture: ComponentFixture<FileDefundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDefundListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDefundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
