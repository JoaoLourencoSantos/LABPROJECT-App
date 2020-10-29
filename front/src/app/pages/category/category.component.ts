
import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

import { ToastService } from './../../services/toast.service';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  list = [];
  budgetButtonStyle = '';
  spendingButtonStyle = 'c-light-red';
  tipo = 'EXPENSE';
  nome: string;

  constructor(
    private categoryService: CategoryService,
    private toast: ToastService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCategories();
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
      'nome: ' + this.nome,
      'tipo: ' + this.tipo
    );

    this.toast.successAlert();

    if (!this.nome) {
      this.toast.infoErroAlert();
      return;
    }

    this.categoryService
      .create({
        description: this.nome,
        type: this.tipo,
      })
      .subscribe((result) => {
        if (result && result.sucess) {
          this.toast.successAlert();
          this.getCategories();
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

  delete = (id) => {
    this.categoryService
      .delete(id)
      .subscribe((result) => {
        if (result && result.sucess) {
          this.toast.successAlert();
          this.getCategories();
        }
      });
  }

  update = (body) => {
    this.categoryService
      .update(body)
      .subscribe((result) => {
        if (result && result.sucess) {
          this.toast.successAlert();
          this.getCategories();
        }
      });
  }

  openDialog = (item) => {
    this.dialog.open(ModalEditDialog, {
      width: '500px',
      data: {item: item, method: this.update},
    });
  }
}

@Component({
  selector: 'modal-edit',
  templateUrl: 'modal-edit.component.html',
  styleUrls: ['./category.component.scss']
})
export class ModalEditDialog {
  constructor(
    public dialogRef: MatDialogRef<ModalEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.description = data.item.description;
    }

    description = "";

    onNoClick(): void {
      this.dialogRef.close();
    }

    method(){
      this.data.item.description = this.description;
      this.data.method(this.data.item);
      this.dialogRef.close();
    }
}
