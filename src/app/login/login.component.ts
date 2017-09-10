import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  formLogin(f: NgForm) {
    this.login(f.form.controls.email.value, f.form.controls.password.value);
  };

  login(email: string, password: string) {
    this.authService.login(email, password)
    .then(res => {
      this.router.navigate(['']);
    }).catch(res => {
      console.log(res.message);
    });
  };

}
