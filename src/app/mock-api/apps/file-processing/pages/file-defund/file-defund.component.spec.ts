import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDefundComponent } from './file-defund.component';

describe('FileDefundComponent', () => {
  let component: FileDefundComponent;
  let fixture: ComponentFixture<FileDefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
