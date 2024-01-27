import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScrollNavComponent} from './scroll-nav.component';

describe('ScrollNavComponent', (): void => {
  let component: ScrollNavComponent;
  let fixture: ComponentFixture<ScrollNavComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [ ScrollNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(ScrollNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
