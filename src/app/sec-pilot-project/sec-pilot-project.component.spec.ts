import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecPilotProjectComponent } from './sec-pilot-project.component';

describe('SecPilotProjectComponent', () => {
  let component: SecPilotProjectComponent;
  let fixture: ComponentFixture<SecPilotProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecPilotProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecPilotProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
