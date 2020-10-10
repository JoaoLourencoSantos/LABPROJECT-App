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
  oldEmail: string = '';
  password: string = '';

  id: number;

  constructor(
    private service: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    if (this.service.isAuthenticated()) {
      const { body } = this.service.getSessao();

      console.log(body);

      this.id = body.id;
      this.name = body.name;
      this.email = body.email;
      this.oldEmail = body.email;
    }
  }

  send = async () => {
    if (this.service.isAuthenticated()) {
      await this.update();
    } else {
      await this.register();
    }
  };

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

  update = async () => {
    if (!this.name || !this.email) {
      this.toast.infoErroAlert();
      return;
    }

    let emailNovo = null;
    if (this.email !== this.oldEmail) {
      emailNovo  = this.email.trim();
    }

    const result = await this.service.updateUser(
      this.id,
      this.name ,
      emailNovo,
      this.password.trim()
    );

    if (!result.sucess) {
      this.toast.errorAuth(result.error);
      return;
    }

    this.toast.successAlert();
  };
}
