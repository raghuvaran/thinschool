import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAboutUsComponent } from './sec-about-us.component';

describe('SecAboutUsComponent', () => {
  let component: SecAboutUsComponent;
  let fixture: ComponentFixture<SecAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
