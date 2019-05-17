import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskButtonComponent } from './disk-button.component';

describe('DiskButtonComponent', () => {
  let component: DiskButtonComponent;
  let fixture: ComponentFixture<DiskButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
