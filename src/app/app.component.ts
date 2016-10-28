import { Component } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  user = {};

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.user = user.auth;
      } else {
        this.loggedIn = false;
        this.user = {};
      }
    });
  }

  login() {
    this.af.auth.login();
  }
  logout() {
    this.af.auth.logout();
  }
}
