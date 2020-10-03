import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private service: UserService) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.service.isAuthenticated();
  }

  logout() {
    this.service.removeSession();
  }
}
