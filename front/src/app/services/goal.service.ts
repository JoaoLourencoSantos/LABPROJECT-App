import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { ResponseDTO } from '../../../../back/src/app/dto/response.dto';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient) {}

  create(body: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.API_BASEPATH}/goal/`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  findAll(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.API_BASEPATH}/goal/`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  update(body: any): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(`${this.API_BASEPATH}/goal/`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  delete(id: string): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(`${this.API_BASEPATH}/goal/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
