import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../../models/user.model';
import { tap } from 'rxjs';

interface Response {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: UserLogin) {
    return this.http
      .post<Response>(`${environment.apiUrl}/user/login`, data)
      .pipe(
        tap((response) => {
          if (response) {
            sessionStorage.setItem('authToken', response.token);
          }
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('authToken');
  }
}
