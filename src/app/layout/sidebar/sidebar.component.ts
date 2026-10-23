import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  recolhido = false;

  @Input() mobileMode = false;
  @Input() mobileExpanded = false;
  @Output() navigationSelected = new EventEmitter<void>();

  get menuRecolhido(): boolean {
    return this.mobileMode ? !this.mobileExpanded : this.recolhido;
  }

  alternar(): void {
    this.recolhido = !this.recolhido;
  }

  fecharAposNavegacao(): void {
    if (this.mobileMode) {
      this.navigationSelected.emit();
    }
  }
}
