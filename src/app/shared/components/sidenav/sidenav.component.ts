import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList; // Responsive media query
  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Categorías", route: "categories", icon: "category"},
    {name: "Productos", route: "home", icon: "production_quantity_limits"}
  ]
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
}
