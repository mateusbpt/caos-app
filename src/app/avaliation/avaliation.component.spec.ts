import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliationComponent } from './avaliation.component';

describe('AvaliationComponent', () => {
  let component: AvaliationComponent;
  let fixture: ComponentFixture<AvaliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
