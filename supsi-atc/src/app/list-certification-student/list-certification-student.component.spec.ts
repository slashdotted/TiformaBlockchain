import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCertificationStudentComponent } from './list-certification-student.component';

describe('ListCertificationStudentComponent', () => {
  let component: ListCertificationStudentComponent;
  let fixture: ComponentFixture<ListCertificationStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCertificationStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCertificationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
