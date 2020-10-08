import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';

import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  valor: number;
  descricao: string;
  data: Date;
  categoria: string;
  tipo: string;
  budgetButtonStyle: string;
  spendingButtonStyle = 'c-light-red';

  constructor(
    private entryService: EntryService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  setBudgetForm = () => {
    const categoria = document.getElementById('category-field');

    this.tipo = 'PROFIT';

    categoria.hidden = true;
    this.budgetButtonStyle = 'c-light-green';
    this.spendingButtonStyle = '';
  }

  setSpendingForm = () => {
    const categoria = document.getElementById('category-field');

    this.tipo = 'EXPENSE';

    categoria.hidden = false;
    this.budgetButtonStyle = '';
    this.spendingButtonStyle = 'c-light-red';
  }

  submit = async () => {
    console.log(
      'valor: ' + this.valor,
      'categoria: ' + this.categoria,
      'data: ' + this.data,
      'descricao: ' + this.descricao,
      'tipo: ' + this.tipo
    );

    if (!this.valor || !this.categoria || !this.data || !this.descricao) {
      this.toast.infoErroAlert();
      return;
    }

    this.entryService
      .create({
        name: this.descricao,
        value: this.valor,
        referenceAt: this.data,
        type: this.tipo,
      })
      .subscribe((result) => {
        if (result && result.sucess) {
          this.toast.successAlert();
        }
      });
  };
}
