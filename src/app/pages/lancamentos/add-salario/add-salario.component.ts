import { NotificationService } from './../../../shared/services/notification.service';
import { Component } from '@angular/core';
import { SalarioService } from '../service/salario.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-salario',
  templateUrl: './add-salario.component.html',
  styleUrls: ['./add-salario.component.scss']
})
export class AddSalarioComponent {
  abaSelecionada: 'salario' | 'editar' = 'salario';
  constructor(
    private fb: FormBuilder,
    private salarioService: SalarioService,
    private notificationService:NotificationService
  ) {}

  formulario = this.fb.group({
    valor: ['', Validators.required],
    diaRecebimento: [
      null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(31),
        Validators.pattern(/^\d+$/)
      ]
    ],
    mesInicio: ['',Validators.required]
  });

  saveSalario(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.getRawValue();
    const valor = this.converterValorBrasileiro(dados.valor);

    if (
      valor === null || dados.diaRecebimento === null
      || !dados.mesInicio
    ) {
      this.notificationService.erro('Informe o valor no formato 2.200,00.');
      return;
    }

    this.salarioService.cadastrarSalario({
      valor,
      diaRecebimento: dados.diaRecebimento,
      mesInicio: dados.mesInicio
    }).subscribe({
      next: (Resposta) => {
        this.notificationService.sucesso(Resposta.message);
        this.formulario.reset();
      },
      error: (erro) => {
  this.notificationService.erro(
    erro.error?.message || 'Erro ao cadastrar salário.'
  );
}
    });
  }

  private converterValorBrasileiro(valor: string | null): number | null {
    if (!valor) {
      return null;
    }

    let normalizado = valor.trim().replace(/^R\$\s*/i, '').replace(/\s/g, '');

    if (normalizado.includes(',')) {
      const partes = normalizado.split(',');
      if (partes.length !== 2 || !/^\d+$/.test(partes[1])) {
        return null;
      }

      normalizado = `${partes[0].replace(/\./g, '')}.${partes[1]}`;
    } else if (/^\d{1,3}(\.\d{3})+$/.test(normalizado)) {
      normalizado = normalizado.replace(/\./g, '');
    }

    const numero = Number(normalizado);
    return Number.isFinite(numero) ? numero : null;
  }
}
