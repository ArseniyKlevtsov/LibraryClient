import { Routes } from '@angular/router';

import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { AuthorsPageComponent } from './components/authors-page/authors-page.component';
import { AuthorInfoComponent } from './components/authors-page/author-info/author-info.component';
import { AuthorFormComponent } from './components/authors-page/author-form/author-form.component';

import { BooksPageComponent } from './components/books-page/books-page.component';

import { GenresPageComponent } from './components/genres-page/genres-page.component';
import { GenreInfoComponent } from './components/genres-page/genre-info/genre-info.component';
import { GenreFormComponent } from './components/genres-page/genre-form/genre-form.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AccessDeniedPageComponent } from './components/access-denied-page/access-denied-page.component';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './shared/guards/admin.guard';


export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: "full" },
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: [
      { path: '', redirectTo: '/books', pathMatch: "full" },

      { path: 'authors', component: AuthorsPageComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
      { path: 'authors/info/:id', component: AuthorInfoComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
      { path: 'authors/add', component: AuthorFormComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
      { path: 'authors/edit/:id', component: AuthorFormComponent, canActivate: [adminGuard], canActivateChild: [adminGuard] },

      { path: 'books', component: BooksPageComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
      
      { path: 'genres', component: GenresPageComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
      { path: 'genres/info/:id', component: GenreInfoComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
      { path: 'genres/add', component: GenreFormComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
      { path: 'genres/edit/:id', component: GenreFormComponent, canActivate: [adminGuard], canActivateChild: [adminGuard] },

      { path: 'userProfile', component: UserProfileComponent, canActivate: [authGuard], canActivateChild: [authGuard] },

      { path: 'accesDenied', component: AccessDeniedPageComponent },
    ]
  },
];
