import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractButtonComponent } from './abstract-button.component';

describe('AbstractButtonComponent', () => {
  let component: AbstractButtonComponent;
  let fixture: ComponentFixture<AbstractButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
