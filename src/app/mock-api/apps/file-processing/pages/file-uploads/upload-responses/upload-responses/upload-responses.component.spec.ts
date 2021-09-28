import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResponsesComponent } from './upload-responses.component';

describe('UploadResponsesComponent', () => {
  let component: UploadResponsesComponent;
  let fixture: ComponentFixture<UploadResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadResponsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
