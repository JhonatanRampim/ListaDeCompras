import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.FolderPageModule)
  },
  {
    path: 'criarlista',
    loadChildren: () => import('./views/criarlista/criarlista.module').then( m => m.CriarlistaPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./views/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./views/signup/signup.module').then( m => m.SignupPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
