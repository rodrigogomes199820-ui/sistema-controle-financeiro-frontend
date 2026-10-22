import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  recolhido = false;
  mobile = false;

  ngOnInit(): void {
    this.atualizarLayoutResponsivo();
  }

  @HostListener('window:resize')
  aoRedimensionar(): void {
    this.atualizarLayoutResponsivo();
  }

  alternar(): void {
    this.recolhido = !this.recolhido;
  }

  fecharAposNavegacao(): void {
    if (this.mobile) {
      this.recolhido = true;
    }
  }

  private atualizarLayoutResponsivo(): void {
    const mobile = window.matchMedia('(max-width: 680px)').matches;

    if (mobile !== this.mobile) {
      this.mobile = mobile;
      this.recolhido = mobile;
    }
  }
}
