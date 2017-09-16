import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.scss']
})
export class StudentsDetailComponent implements OnInit, OnDestroy {

  students: FirebaseListObservable<any[]>;
  student: any;
  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute, 
    private db: AngularFireDatabase) {
    this.students = db.list('/students');
    this.student = {};
  }

  ngOnInit() {
    this.subscription.add(this.authService.afa.authState.subscribe(auth => {
        if (auth == null) {
          this.router.navigate(['login']);
        }
      }));
    this.student.profileImage = '/assets/images/user.png';
    this.subscription.add(this.findByName(this.activeRoute.snapshot.params.name));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
