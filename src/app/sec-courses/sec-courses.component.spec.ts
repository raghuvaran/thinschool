import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecCoursesComponent } from './sec-courses.component';

describe('SecCoursesComponent', () => {
  let component: SecCoursesComponent;
  let fixture: ComponentFixture<SecCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
