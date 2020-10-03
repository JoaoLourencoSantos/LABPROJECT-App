import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private service: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  login = async () => {
    if (!this.username || !this.password) {
      this.toast.infoErroAlert();
      return;
    }

    const result = await this.service.auth(
      this.username.trim(),
      this.password.trim()
    );

    if (!result.sucess) {
      this.toast.errorAuth(result.error);
      return;
    }

    this.router.navigate(['/', 'home']);
  }
}
