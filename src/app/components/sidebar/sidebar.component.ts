import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/items', title: 'Catalog', icon: 'library_books', class: '' },
  { path: '/items/add', title: 'Add To Catalog', icon: 'library_add', class: '' },
  { path: '/bookcases', title: 'Bookcases', icon: 'folder', class: '' },
  { path: '/bookcases/add', title: 'Add bookcase', icon: 'create_new_folder', class: '' },
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
