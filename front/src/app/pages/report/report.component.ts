import { Component, OnInit, Inject } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  public displayColumns: string[] = ['Nome', 'Categoria', 'Valor'];
  dataSource = new MatTableDataSource<any>();
  public list: any;
  public type: string;
  public types = [
    {value: 'Receita'},
    {value: 'Despesa'},
    {value: 'Todos'}
  ];
  public selectedType: any;
  public monthName = '';
  public d = new Date();
  public monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
  'Junho', 'Julho', 'Augusto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public selectedMonth: any;

  constructor(private entryService: EntryService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedMonth = this.d.getMonth() + 1;
    this.monthName = this.monthNames[this.selectedMonth - 1];
    this.selectedType = this.types[2];
    this.populate();
  }

  mudarMes(): any {
    this.selectedMonth = this.monthNames.indexOf(this.monthName) + 1;
    this.populate();
  }

  mudarEntrada(): any {
    if (this.selectedType === 'Todos') {
      this.type = undefined;
    } else {
      this.type = this.selectedType;
    }
    this.populate();
  }

  populate(): void {
    this.entryService.findAllByMonth(this.selectedMonth).subscribe((result) => {
      if (result) {
        const data = result.body;

        this.list = data
          .map(i => ({
            descricao: i.name,
            categoria: i.type === 'EXPENSE' ? 'Despesa' : 'Receita',
            valor: i.value,
        }));

        if (this.type) {
          this.list = this.list
          .filter(item => item.categoria === this.type);
        }
      }
    });
  }
}
