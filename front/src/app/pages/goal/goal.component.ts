
import { Component, OnInit, Inject } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';

import { ToastService } from 'src/app/services/toast.service';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})

export class GoalComponent implements OnInit {
  valor: number;
  nome: string;
  list: any;
  data: Date;

  constructor(
    private goalService: GoalService,
    private toast: ToastService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getGoals();
  }

  submit = async () => {
    if (!this.nome || !this.valor || !this.data) {
      this.toast.infoErroAlert();
      return;
    } else if (this.list.length < 20)
    {
      this.toast.successAlert();

      this.goalService
        .create({
          description: this.nome,
          value: this.valor,
          finishDate: this.data,
        })
        .subscribe((result) => {
          if (result && result.sucess) {
            this.toast.successAlert();
            this.getGoals();
          }
      });
    } else {
      this.toast.fullAlert();
    }
  }

  delete = (id) => {
    this.goalService
      .delete(id)
      .subscribe((result) => {
        if (result && result.sucess) {
          this.toast.successAlert();
          this.getGoals();
        }
      });
  }

  getGoals = () => {
    this.goalService
      .findAll()
      .subscribe((result) => {
        if (result && result.sucess) {
          this.list = result.body;
        }
      });
  }
}
