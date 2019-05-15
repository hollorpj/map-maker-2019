import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPaneComponent } from './selector-pane.component';

describe('SelectorPaneComponent', () => {
  let component: SelectorPaneComponent;
  let fixture: ComponentFixture<SelectorPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
