import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated() {
    return this.http.get('http://localhost:3000/verify', { withCredentials: true });
  }

  public login({ email, password }: { email: string, password: string }): void {
    this.http.post('http://localhost:3000/login', { email, password }, { withCredentials: true, observe: 'response' }).subscribe(
      (res: any) => {
        const cookies = res.headers.get('Set-Cookie');
        console.log('cookies', cookies);
      },
      (err: any) => console.warn(err),
    );
  }

  public logout(): void {
    this.http.post('http://localhost:3000/logout', {}, { withCredentials: true, observe: 'response' }).subscribe(
      (res: any) => console.log(res),
      (err: any) => console.warn(err),
    );
  }
}
