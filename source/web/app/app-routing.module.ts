import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './utils';
import {CreateAccountComponent} from './components/account/create-account/create-account.component';
import {LoginComponent} from './components/account/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TasksComponent} from './components/dashboard/tasks/tasks.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-password/:token' ,
    component: CreateAccountComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tasks',
        component: TasksComponent
      }
    ]
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
