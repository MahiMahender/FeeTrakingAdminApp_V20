import { Routes } from '@angular/router';
import { Header } from './pages/header/header';
import { Master } from './pages/master/master/master';
import { Login } from './pages/login/login';
import { Package } from './pages/package/package';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'header', component: Header },
  { path: 'login', component: Login },
  { path: 'master', component: Master },
  { path: 'package', component: Package },
];
