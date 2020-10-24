import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseFormComponent } from './bookcase-form.component';

describe('BookcaseFormComponent', () => {
  let component: BookcaseFormComponent;
  let fixture: ComponentFixture<BookcaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookcaseFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
