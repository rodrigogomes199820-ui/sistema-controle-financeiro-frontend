import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
 nomeUsuario: string = '';
 constructor(
    public usuariosService: UsuariosService
  ) {}


ngOnInit(): void {
  this.loadUser()
}




loadUser():void{
  this.usuariosService.buscarUsuarioAtual().subscribe((result)=>{
    this.nomeUsuario = result.usuario.nome
  })
}




}

