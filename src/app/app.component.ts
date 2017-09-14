import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogged: Boolean;

  constructor(private authService: AuthService, private router: Router){
    this.authService.afa.authState.subscribe(
      auth => {
        if (auth == null) {
           this.isLogged = false;
           this.router.navigate(['login']);
         } else {
           this.isLogged = true;
         }
      });
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['login']);
    }
}
