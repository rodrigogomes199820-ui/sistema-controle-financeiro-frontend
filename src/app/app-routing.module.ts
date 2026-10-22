import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/landing/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
{
path: '',
component: HomeComponent
},
{
path: 'layout',
component: NavbarComponent,
canActivate: [AuthGuard]
},
{
path: 'login',
component: LoginComponent
},
{
path: 'cadastro',
component: CadastroComponent
},
{
path: '**',
redirectTo: ''
}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}



