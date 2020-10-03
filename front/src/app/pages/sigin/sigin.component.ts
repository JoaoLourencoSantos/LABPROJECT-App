import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss'],
})
export class SiginComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private service: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  register = async () => {
    if (!this.name || !this.email || !this.password) {
      this.toast.infoErroAlert();
      return;
    }

    const result = await this.service.registerUser(
      this.name.trim(),
      this.email.trim(),
      this.password.trim()
    );

    if (!result.sucess) {
      this.toast.errorAuth(result.error);
      return;
    }

    this.router.navigate(['/', 'home']);
  };
}
