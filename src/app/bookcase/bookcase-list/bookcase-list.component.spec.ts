import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseListComponent } from './bookcase-list.component';

describe('BookcaseListComponent', () => {
  let component: BookcaseListComponent;
  let fixture: ComponentFixture<BookcaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookcaseListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
