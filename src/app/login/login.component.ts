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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.authService.afa.authState.subscribe(auth => {
      if (auth != null) {
        this.router.navigate(['']);
      }
    });
  }

  isFormInvalid(f: NgForm) {
    return !f.form.valid;
  }

  formLogin(f: NgForm) {
    this.login(f.form.controls.email.value, f.form.controls.password.value);
  }

  login(email: string, password: string) {
    this.authService.login(email, password)
    .then(res => {
      this.router.navigate(['']);
    }).catch(res => {
      this.toastr.error('Usuário ou senha incorretos, tente novamente.', 'Erro');
    });
  }

}
