import { Routes } from '@angular/router';
import { Header } from './pages/header/header';
import { Master } from './pages/master/master/master';
import { Login } from './pages/login/login';
import { Package } from './pages/package/package';
import { Institute } from './pages/institute/institute';
import { BranchMaster } from './pages/branch-master/branch-master';
import { CourseMaster } from './pages/course-master/course-master';
import { Enrollment } from './pages/enrollment/enrollment';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'header', component: Header },
  { path: 'login', component: Login },
  { path: 'master', component: Master },
  { path: 'package', component: Package },
  { path: 'institute', component: Institute },
  { path: 'branch', component: BranchMaster },
  { path: 'course', component: CourseMaster },
  { path: 'enrollment', component: Enrollment },
];
