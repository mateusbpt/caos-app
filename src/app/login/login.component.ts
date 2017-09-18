import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private submit: Boolean;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.authService.afa.authState.subscribe(auth => {
      if (auth != null) {
        this.router.navigate(['']);
      }
    });
  }

  isFormInvalid(f: NgForm) {
    return !f.form.valid || this.submit;
  }

  formLogin(f: NgForm) {
    this.submit = true;
    this.login(f.form.controls.email.value, f.form.controls.password.value);
    f.form.reset();
  }

  login(email: string, password: string) {
    this.authService.login(email, password)
    .then(res => {
      this.router.navigate(['']);
      this.submit = false;
    }).catch(res => {
      this.toastr.error('Usuário ou senha incorretos, tente novamente.', 'Erro');
      this.submit = false;
    });
  }

}
