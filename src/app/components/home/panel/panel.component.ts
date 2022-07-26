import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  fullName: string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getFullName();
  }

  //gets the full name of the user from session
  getFullName() : void{
    this.fullName = sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname');
  }

  onLogout() : void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
