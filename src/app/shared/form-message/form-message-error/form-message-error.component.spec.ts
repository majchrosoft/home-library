import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMessageErrorComponent } from './form-message-error.component';

describe('FormMessageErrorComponent', () => {
  let component: FormMessageErrorComponent;
  let fixture: ComponentFixture<FormMessageErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormMessageErrorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMessageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
