import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  valor: number;
  descricao: string;
  data: Date;
  categoria: string;

  constructor() { }

  ngOnInit(): void {
  }

  submit = async () => {
    console.log('oi');
  }
}
