import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecHomeComponent } from './sec-home.component';

describe('SecHomeComponent', () => {
  let component: SecHomeComponent;
  let fixture: ComponentFixture<SecHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
