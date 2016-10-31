import { Component, ViewChild } from '@angular/core';

import { AngularFire } from 'angularfire2';
import { MdlSnackbarService } from 'angular2-mdl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  user = {};

  @ViewChild('addChatRoomDialog') addChatRoomDialog: any;

  constructor(private af: AngularFire,
    private mdlSnackbarService: MdlSnackbarService) {
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
  showAddChatRoomDialog() {
    if (!this.loggedIn) {
      this.mdlSnackbarService.showToast('Please sign in first');
    } else {
      this.addChatRoomDialog.show();
    }
  }
}
