import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRowTdActionsComponent } from './item-row-td-actions.component';

describe('ItemRowTdActionsComponent', () => {
  let component: ItemRowTdActionsComponent;
  let fixture: ComponentFixture<ItemRowTdActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemRowTdActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRowTdActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
