import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loggedIn: boolean = false;

  constructor (private authService: AuthService, private formBuilder: FormBuilder) {
    this.authService.isAuthenticated().subscribe(
      (r) => {console.log(r); this.loggedIn = true},
      (e) => {console.log(e); this.loggedIn = false});
  }

  public loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  public login(): void {
    console.log('loggin in')
    this.authService.login(this.loginForm.value);
  }

  public logout(): void {
    console.log('logging out')
    this.authService.logout();
  }
}
