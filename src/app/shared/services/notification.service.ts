
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  sucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: ['notification-success'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  erro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 4000,
      panelClass: ['notification-error'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
