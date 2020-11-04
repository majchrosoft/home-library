import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/items', title: 'Catalog', icon: 'dashboard', class: '' },
  { path: '/items/add', title: 'Add To Catalog', icon: 'person', class: '' },
  { path: '/bookcases', title: 'Bookcases', icon: 'content_paste', class: '' },
  { path: '/bookcases/add', title: 'Add bookcase', icon: 'library_books', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
