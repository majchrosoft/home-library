import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseRowComponent } from './bookcase-row.component';

describe('BookcaseRowComponent', () => {
  let component: BookcaseRowComponent;
  let fixture: ComponentFixture<BookcaseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookcaseRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcaseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
