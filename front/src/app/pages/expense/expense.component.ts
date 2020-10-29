import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
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

  list = [];

  constructor(
    private entryService: EntryService,
    private toast: ToastService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('item_update')) {
      const item = JSON.parse(localStorage.getItem('item_update')).item;
      this.descricao = item.descricao;
      this.valor = item.valor;
      this.data = item.data;
      this.tipo = item.tipo;

      localStorage.setItem('item_update', '');

      this.getCategories();
    }
  }

  setBudgetForm = () => {

    this.tipo = 'PROFIT';
    this.budgetButtonStyle = 'c-light-green';
    this.spendingButtonStyle = '';

    this.getCategories();
  }

  setSpendingForm = () => {

    this.tipo = 'EXPENSE';
    this.budgetButtonStyle = '';
    this.spendingButtonStyle = 'c-light-red';

    this.getCategories();
  }

  submit = async () => {
    console.log(
      'valor: ' + this.valor,
      'categoria: ' + this.categoria,
      'data: ' + this.data,
      'descricao: ' + this.descricao,
      'tipo: ' + this.tipo
    );

    if (!this.valor || !this.data || !this.descricao) {
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
  }

  getCategories = () => {
    this.categoryService
      .findAllByType(this.tipo)
      .subscribe((result) => {
        if (result && result.sucess) {
          this.list = result.body;
        }
      });
  }
}
