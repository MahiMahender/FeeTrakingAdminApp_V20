import { Routes } from '@angular/router';
import { Header } from './pages/header/header';
import { Master } from './pages/master/master/master';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'header', component: Header },
  { path: 'login', component: Login },
  { path: 'master', component: Master },
];
