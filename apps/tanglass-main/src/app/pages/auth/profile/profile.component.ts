import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fieldsToShow = [
    ['Email', 'email'],
    ["Nom d'utilisateur", 'nickname'],
    ['Nom', 'name']
  ]
  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(value => console.log(value));
  }

}
