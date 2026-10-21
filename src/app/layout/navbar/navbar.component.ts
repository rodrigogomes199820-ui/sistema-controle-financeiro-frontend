import { Component,  } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent   {

  nomeUsuario = '';

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}





  sair(): void {
  
    void this.router.navigate(['/login']);
  }


}