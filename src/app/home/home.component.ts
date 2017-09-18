import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private submit: Boolean;

  constructor(private authService: AuthService, private router: Router, private db: AngularFireDatabase, private toastr: ToastrService) {
   }

  ngOnInit() {
    this.authService.afa.authState.subscribe(auth => {
      if (auth == null) {
        this.router.navigate(['login']);
      }
    });
  }

  formAddStudent(f: NgForm) {
  this.submit = true;
   this.db.list('/students').push({
      name: f.value.name,
      cwiName: f.value.cwiName,
      profileImage: f.value.profileImage
    }).then(e => {
      f.form.reset();
      this.toastr.success('Aluno adicionado com êxito.', 'Sucesso');
      this.submit = false;
    }).catch(e => {
      f.form.reset();
      this.toastr.error('Ocorreu um problema ao adicionar o aluno, tente novamente.', 'Erro');
      this.submit = false;
    });
  }

  isFormInvalid(h: NgForm) {
    return !h.form.valid || this.submit;
  }

}
