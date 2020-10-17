import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { ResponseDTO } from './../../../../back/src/app/dto/response.dto';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient) {}

  create(body: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.API_BASEPATH}/entry/`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  delete(id: string): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(`${this.API_BASEPATH}/entry/:${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  findAll(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.API_BASEPATH}/entry/`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  findAllByType(type: string): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.API_BASEPATH}/entry?type=${type}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  findIndicators(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.API_BASEPATH}/entry/indicators`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
