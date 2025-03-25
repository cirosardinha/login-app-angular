import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo, UserRegister } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(data: UserRegister) {
    return this.http.post(`${this.apiUrl}/user/register`, data);
  }

  getUsers(): Observable<UserInfo[]> {
    const token = sessionStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<UserInfo[]>(`${this.apiUrl}/users/list`, {
      headers,
    });
  }
}
