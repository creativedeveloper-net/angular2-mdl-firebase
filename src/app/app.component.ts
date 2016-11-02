import { Component, ViewChild } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdlSnackbarService } from 'angular2-mdl';

import { ChatRoom } from './chat-rooms/index';
import { SelectOption } from './shared/index';
import { User } from './users/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chatRooms: FirebaseListObservable<ChatRoom[]>;
  chatRoomsFilter = 'public';
  chatRommsFliterOptions: SelectOption[] = [
    new SelectOption('Public', 'public'),
    new SelectOption('Created by me', 'created_by_me')
  ];
  loggedIn = false;
  newChatRoom = new ChatRoom;
  user: User;

  @ViewChild('addChatRoomDialog') addChatRoomDialog: any;

  constructor(private af: AngularFire,
    private mdlSnackbarService: MdlSnackbarService) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.user = user.auth;
      } else {
        this.loggedIn = false;
      }
    });
    this.subscribeChatRooms();
  }
  filterChatRooms(value: any) {
    this.subscribeChatRooms();
  }
  login() {
    this.af.auth.login();
  }
  logout() {
    this.af.auth.logout();
  }
  saveChatRoom() {
    if (this.newChatRoom.name.length > 0) {
      this.newChatRoom.author = this.user.email;
      this.chatRooms.push(this.newChatRoom);
      this.addChatRoomDialog.close();
    } else {
      this.mdlSnackbarService.showToast('Please enter chat room name');
    }
  }
  showAddChatRoomDialog() {
    if (!this.loggedIn) {
      this.mdlSnackbarService.showToast('Please sign in first');
    } else {
      this.addChatRoomDialog.show();
    }
  }
  subscribeChatRooms() {
    this.chatRooms = this.af.database.list('/chatRooms');
    /*
    if (this.chatRoomsFilter === 'public') {
      this.chatRooms = this.af.database.list('/chatRooms', {
        query: {
          orderByChild: 'public',
          equalTo: true
        }
      });
    } else if (this.chatRoomsFilter === 'created_by_me') {
      this.chatRooms = this.af.database.list('/chatRooms', {
        query: {
          orderByChild: 'author',
          equalTo: this.user.email
        }
      });
    }*/
  }
}
