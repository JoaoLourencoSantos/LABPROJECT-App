import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EntryService } from 'src/app/services/entry.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: any = [];
  indicators: any = {};

  monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Augusto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  d = new Date();

  monthName = '';

  selectedMonth;

  constructor(
    private entryService: EntryService,
    public dialog: MatDialog,
    private toast: ToastService
  ) {}

  openDialog() {
    this.dialog.open(ModalCalcDialog, {
      data: this.indicators,
    });
  }

  mudarMes() {
    this.selectedMonth = this.monthNames.indexOf(this.monthName) + 1;
    this.populate();
  }

  ngOnInit(): void {
    this.selectedMonth = this.d.getMonth() + 1;
    this.monthName = this.monthNames[this.selectedMonth - 1];
    this.populate();
  }

  openExpenses(item: any): void {
    window.location.pathname = '/expenses';
    localStorage.setItem('item_update', JSON.stringify(item));

    this.delete(item.id);
  }

  delete(item: any): void {
    this.entryService.delete(item.id).subscribe((result) => {
      if (result && result.sucess) {
        this.toast.successAlert();
      }

      this.populate();
    });
  }

  populate(): void {
    this.entryService.findAllByMonth(this.selectedMonth).subscribe((result) => {
      if (result) {
        this.list = result.body;
      }
    });

    this.entryService
      .findIndicatorsByMonth(this.selectedMonth)
      .subscribe((result) => {
        if (result) {
          this.indicators = result.body;
        }
      });
  }
}

@Component({
  selector: 'modal-calc',
  templateUrl: 'modal-calc.html',
  styleUrls: ['./home.component.scss'],
})
export class ModalCalcDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
