import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  login(param: {password: string; username: string}) {

  }
}
