import {Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public name;
  public listTitles: any[];
  public location: Location;

  constructor(location: Location, private element: ElementRef, private router: Router, private tokenStoarge: TokenStorageService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    // const user = sessionStorage.getItem(USER_KEY).replace( '"', '');
    this.name = this.tokenStoarge.getUser().username;
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

}
