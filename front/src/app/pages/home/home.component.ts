import { Component, OnInit, Inject } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: any = [];
  indicators: any = {};

  monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "augusto", "setembro", "outubro", "novembro", "dezembro"
  ];

  d = new Date();

  monthName = "";

  constructor(private entryService: EntryService, public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalCalcDialog, {
      data: this.indicators,
    });
  }

  ngOnInit(): void {
    this.monthName = this.monthNames[this.d.getMonth()];
    this.populate();
  }

  openExpenses(item: any): void {
    window.location.pathname = '/expenses';
    localStorage.setItem('item_update', JSON.stringify(item));

    this.delete(item.id);
  }

  delete(item: any): void {
    this.entryService
      .delete(item.id);
  }

  populate(): void {
    this.entryService.findAll().subscribe((result) => {
      if (result) {
        console.log(result);

        this.list = result.body;
      }
    });

    this.entryService.findIndicators().subscribe((result) => {
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
