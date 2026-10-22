import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  recolhido = false;

  alternar(): void {
    this.recolhido = !this.recolhido;
  }
}
