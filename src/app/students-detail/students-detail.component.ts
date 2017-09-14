import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.scss']
})
export class StudentsDetailComponent implements OnInit {

  students: FirebaseListObservable<any[]>;
  student: any;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private db: AngularFireDatabase) { 
    this.students = db.list('/students');
    this.student = {};
  }

  ngOnInit() {
    this.student.profileImage = '/assets/images/user.jpg';
    this.findByName(this.activeRoute.snapshot.params.name);
  }

  findByName(cwiName: string) {
    return this.students.subscribe(students => {
      this.student = students.find(e => e.cwiName === cwiName);
      if (!this.student) {
        this.router.navigate(['students']);
      }
    });
  }


}
