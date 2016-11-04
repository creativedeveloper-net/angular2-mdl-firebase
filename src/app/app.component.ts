import { Component, ViewChild } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdlSnackbarService } from 'angular2-mdl';

import { Chat } from './chats/index';
import { SelectOption } from './shared/index';
import { User } from './users/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chats: FirebaseListObservable<Chat[]>;
  chatsFilter = 'public';
  chatRommsFliterOptions: SelectOption[] = [
    new SelectOption('Public', 'public'),
    new SelectOption('Created by me', 'created_by_me')
  ];
  loggedIn = false;
  newChat = new Chat;
  user: User;

  @ViewChild('addChatDialog') addChatDialog: any;

  constructor(private af: AngularFire,
    private mdlSnackbarService: MdlSnackbarService) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.user = user.auth;
        this.subscribeChats();
        console.log(this.user);
      } else {
        this.loggedIn = false;
        this.subscribeChats();
      }
    });
  }
  filterChats(value: any) {
    this.subscribeChats();
  }
  login() {
    this.af.auth.login();
  }
  logout() {
    this.af.auth.logout();
  }
  saveChat() {
    if (this.newChat.data.name.length > 0) {
      this.newChat.author = this.user.email;
      this.chats.push(this.newChat);
      this.addChatDialog.close();
    } else {
      this.mdlSnackbarService.showToast('Please enter chat name');
    }
  }
  showAddChatDialog() {
    if (!this.loggedIn) {
      this.mdlSnackbarService.showToast('Please sign in first');
    } else {
      this.addChatDialog.show();
    }
  }
  subscribeChats() {
    if (this.chatsFilter === 'public') {
      this.chats = this.af.database.list('/chats', {
        query: {
          orderByChild: 'public',
          equalTo: true
        }
      });
    } else if (this.chatsFilter === 'created_by_me') {
      this.chats = this.af.database.list('/chats', {
        query: {
          orderByChild: 'author',
          equalTo: this.user.email
        }
      });
    }
  }
}
