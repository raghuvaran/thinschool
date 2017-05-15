import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecPartnersComponent } from './sec-partners.component';

describe('SecPartnersComponent', () => {
  let component: SecPartnersComponent;
  let fixture: ComponentFixture<SecPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
