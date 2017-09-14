import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.students = db.list('students');
  }

  ngOnInit() {

  }

}
