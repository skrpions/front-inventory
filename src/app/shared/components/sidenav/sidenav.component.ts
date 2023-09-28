import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private media = inject(MediaMatcher);
  private keyCloakSrv = inject(KeycloakService);

  username = '';
  mobileQuery!: MediaQueryList; // Responsive media query
  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Categorías", route: "categories", icon: "category"},
    {name: "Productos", route: "products", icon: "add_shopping_cart"}
  ]

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.username = this.keyCloakSrv.getUsername();
  }

  logout(): void {
    this.keyCloakSrv.logout();
  }

}
