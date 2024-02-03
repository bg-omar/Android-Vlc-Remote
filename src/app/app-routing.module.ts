import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/tabs/vlc',
    pathMatch: 'full'
  },
  {
    path: 'vlc',
    loadChildren: () => import('./pages/vlc/vlc.module').then(m => m.VlcModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'todos',
    loadChildren: () => import('./pages/todos/todos.module')
      .then(m => m.TodosModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('./pages/todo/todo.module')
      .then(m => m.TodoModule)
  },
  {
    path: 'todo/:id',
    loadChildren: () => import('./pages/todoedit/todoedit.module')
      .then(m => m.TodoeditModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./pages/confirm/confirm.module').then(m => m.ConfirmPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

