import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  id: any = null;

  budgetButtonStyle: string;
  spendingButtonStyle = 'c-light-red';

  list = [];

  constructor(
    private entryService: EntryService,
    private toast: ToastService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.getCategories();

    this.setSpendingForm();
  }

  ngOnInit(): void {
    const toUpdate = JSON.parse(localStorage.getItem('item_update'));

    console.log(toUpdate);

    if (toUpdate) {
      const item = toUpdate;
      this.id = toUpdate.id;
      this.descricao = item.name;
      this.valor = item.value;
      this.data = item.referenceAt;
      this.categoria = item.category ? item.category.id : null;

      if (item.type === 'PROFIT') {
        this.setBudgetForm();
      }

      localStorage.removeItem('item_update');
    }
  }

  setBudgetForm = () => {
    this.tipo = 'PROFIT';
    this.budgetButtonStyle = 'c-light-green';
    this.spendingButtonStyle = '';

    this.getCategories();
  };

  setSpendingForm = () => {
    this.tipo = 'EXPENSE';
    this.budgetButtonStyle = '';
    this.spendingButtonStyle = 'c-light-red';

    this.getCategories();
  };

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

    if (this.id) {
      this.entryService
      .update({
        id: this.id,
        name: this.descricao,
        value: this.valor,
        referenceAt: this.data,
        type: this.tipo,
        category: this.categoria
      })
      .subscribe((result) => {
        if (result && result.sucess) {
          this.toast.successAlert();

          this.router.navigate(['/','home']);
        }
      });
      return;
    }

    this.entryService
      .create({
        name: this.descricao,
        value: this.valor,
        referenceAt: this.data,
        type: this.tipo,
        category: this.categoria
      })
      .subscribe((result) => {
        if (result && result.sucess) {
          this.toast.successAlert();

          this.router.navigate(['/','home']);
        }
      });
  };

  getCategories = () => {
    this.categoryService.findAllByType(this.tipo).subscribe((result) => {
      if (result && result.sucess) {
        console.log(result);
        this.list = result.body;
      }
    });
  };
}
