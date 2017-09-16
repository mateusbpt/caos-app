import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NgClass } from '@angular/common';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: FirebaseListObservable<any[]>;

  constructor(private authService: AuthService, private db: AngularFireDatabase, private router: Router) {
    this.students = db.list('students');
  }

  ngOnInit() {
    this.authService.afa.authState.subscribe(auth => {
      if (auth == null) {
        this.router.navigate(['login']);
      }
    });
  }

  verifyRegularRating(avaliations:Array<any>){
    if (avaliations) {
      let lastAvaliation = avaliations[avaliations.length-1];
      return lastAvaliation.rating === "regular";
    } else {
    return false;
    }
  }
}
