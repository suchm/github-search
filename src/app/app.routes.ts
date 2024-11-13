import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IssueDetailComponent } from './results/issues/issue-detail/issue-detail.component';
import { CodeDetailComponent } from './results/code/code-detail/code-detail.component';
import { CommitsDetailComponent } from './results/commits/commits-detail/commits-detail.component';
import { ReposDetailComponent } from './results/repos/repos-detail/repos-detail.component';
import { TopicsDetailComponent } from './results/topics/topics-detail/topics-detail.component';
import { UsersDetailComponent } from './results/users/users-detail/users-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'issues/:id',
    component: IssueDetailComponent,
    title: 'Issues Detail Page'
  },
  {
    path: 'code/:id',
    component: CodeDetailComponent,
    title: 'Code Detail Page'
  },
  {
    path: 'commits/:id',
    component: CommitsDetailComponent,
    title: 'Commits Detail Page'
  },
  {
    path: 'repositories/:id',
    component: ReposDetailComponent,
    title: 'Repositories Detail Page'
  },
  {
    path: 'topics/:id',
    component: TopicsDetailComponent,
    title: 'Topics Detail Page'
  },
  {
    path: 'users/:id',
    component: UsersDetailComponent,
    title: 'Topics Detail Page'
  }
  ];
