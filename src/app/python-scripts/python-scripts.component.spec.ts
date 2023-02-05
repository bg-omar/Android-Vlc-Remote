import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonScriptsComponent } from './python-scripts.component';

describe('PythonScriptsComponent', () => {
  let component: PythonScriptsComponent;
  let fixture: ComponentFixture<PythonScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythonScriptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
