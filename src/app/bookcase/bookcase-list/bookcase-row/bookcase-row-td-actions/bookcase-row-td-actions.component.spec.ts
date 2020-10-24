import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseRowTdActionsComponent } from './bookcase-row-td-actions.component';

describe('BookcaseRowTdActionsComponent', () => {
  let component: BookcaseRowTdActionsComponent;
  let fixture: ComponentFixture<BookcaseRowTdActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookcaseRowTdActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcaseRowTdActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
