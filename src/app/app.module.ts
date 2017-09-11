import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './providers/auth.service';
import { MarkdownModule } from 'angular2-markdown';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentsComponent }, 
  { path: 'students/:name', component: StudentsDetailComponent },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StudentsComponent,
    StudentsDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    Ng2OrderModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 3000, closeButton: true }),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    MarkdownModule.forRoot()
  ],
  providers: [AuthService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
