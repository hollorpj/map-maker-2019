import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrenchButtonComponent } from './wrench-button.component';

describe('WrenchButtonComponent', () => {
  let component: WrenchButtonComponent;
  let fixture: ComponentFixture<WrenchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrenchButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrenchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
