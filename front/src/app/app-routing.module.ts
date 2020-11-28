import { ReportComponent } from './pages/report/report.component';
import { GoalComponent } from './pages/goal/goal.component';
import { CategoryComponent } from './pages/category/category.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseComponent } from './pages/expense/expense.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SiginComponent } from './pages/sigin/sigin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sigin', component: SiginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'expenses', component: ExpenseComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'goal', component: GoalComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
