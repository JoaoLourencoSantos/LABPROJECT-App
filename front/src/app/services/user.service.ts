import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient, private router: Router) {}

  auth = async (username, password) => {
    let result: any = { sucess: true, error: null };
    await this.sendPost(username, password)
      .toPromise()
      .then((response) => {
        console.log(response);

        if (!response.sucess) {
          result.sucess = false;
          result.error = response.message;
        } else {
          this.setSessao({ token: response.access_token, body: response.body });
        }
      })
      .catch((err) => {
        result.sucess = false;
        result.error = 'Erro no servidor';
      });

    return result;
  };

  sendPost(username, password): Observable<any> {
    return this.http.post<any>(
      `${this.API_BASEPATH}/auth/login/`,
      {
        username,
        password,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  setSessao(identificador: any): void {
    localStorage.setItem('lab_user_logged', JSON.stringify(identificador));
  }

  removeSession(): void {
    localStorage.removeItem('lab_user_logged');
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('lab_user_logged')) return true;

    return false;
  }

  getSessao(): any {
    return JSON.parse(localStorage.getItem('lab_user_logged'));
  }
}
