import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'simple-modal',
    loadChildren: () => import('./modals/simple-modal/simple-modal.module').then( m => m.SimpleModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'items',
    loadChildren: () => import('./pages/items/items.module').then( m => m.ItemsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-item',
    loadChildren: () => import('./modals/add-item/add-item.module').then( m => m.AddItemPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./pages/add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'colors',
    loadChildren: () => import('./pages/colors/colors.module').then( m => m.ColorsPageModule)
  },
  {
    path: 'add-color',
    loadChildren: () => import('./pages/add-color/add-color.module').then( m => m.AddColorPageModule)
  },
  {
    path: 'update-user/:id',
    loadChildren: () => import('./pages/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'update-item/:id',
    loadChildren: () => import('./pages/update-item/update-item.module').then( m => m.UpdateItemPageModule)
  },
  {
    path: 'single-item/:id',
    loadChildren: () => import('./pages/single-item/single-item.module').then( m => m.SingleItemPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
