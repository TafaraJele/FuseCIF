import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFundListComponent } from './file-fund-list.component';

describe('FileFundListComponent', () => {
  let component: FileFundListComponent;
  let fixture: ComponentFixture<FileFundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFundListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
