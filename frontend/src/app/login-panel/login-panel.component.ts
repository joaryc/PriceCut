import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Credentials } from '../auth.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {
  emailValue: string = '';
  passwordValue: string = '';

  getCredentials(): Credentials {
    return {
      email: this.emailValue,
      password: this.passwordValue
    };
  }

  onSignIn() {
    const credentials = this.getCredentials();

    this.authService.login(credentials).then(() => {
      this.router.navigateByUrl('');
    }).catch((e) => {
      alert(`Something went wrong: ${e}`)
    });
  }

  onSignUp() {
    const credentials = this.getCredentials();

    this.authService.register(credentials).then(() => {
      this.router.navigateByUrl('');
    }).catch((e) => {
      alert(`Something went wrong: ${e}`)
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void { }
}
