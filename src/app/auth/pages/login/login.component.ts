import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{


  constructor(private router: Router,
              private authService:AuthService) { }

  login(){

    this.authService.login().subscribe( usuario => {
      if(usuario.id){
        this.router.navigate(['/heroes'])
      }
    }) 
  }

}
