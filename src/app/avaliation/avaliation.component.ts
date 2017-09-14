import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-avaliation',
  templateUrl: './avaliation.component.html',
  styleUrls: ['./avaliation.component.scss']
})
export class AvaliationComponent implements OnInit {

  students: FirebaseListObservable<any[]>;

  constructor(private authService: AuthService, private router: Router, private db: AngularFireDatabase, private toastr: ToastrService) {
      this.students = db.list('/students');
  }

  ngOnInit() {
  }

  formAddAvaliation(g: NgForm) {
    const student = this.db.object('/students/' + g.value.studentKey);
    let avaliations = [];
    student.subscribe(e => {
      if (e.avaliations) {
        avaliations = e.avaliations;
      }
    });
    avaliations.push({ monitorName: g.value.monitorName, dateAvaliation: Date.now(), title: g.value.title, text: g.value.text  });
    student.update({avaliations: avaliations }).then(e => {
      g.form.reset();
      this.toastr.success('Avaliação adicionada com êxito.', 'Sucesso');
    }).catch(e => {
      this.toastr.error('Ocorreu um problema ao adicionar a avaliação, tente novamente.', 'Erro');
    });
  }

  isFormInvalid(h: NgForm) {
    return !h.form.valid;
  }

}
