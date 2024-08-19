import { GetAllGenresRequestDto } from './../../shared/interfaces/genre/requests/get-all-genres-request-dto.interface';
import { GenresResponseDto } from './../../shared/interfaces/genre/responses/genres-response-dto.interface';

import { AuthService } from './../../shared/services/auth.service';
import { GenreService } from '../../shared/services/genre.service';

import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [LoaderComponent, NgIf, NgFor, PaginatorComponent, RouterModule],
  templateUrl: './genres-page.component.html',
  styleUrl: './genres-page.component.css'
})
export class GenresPageComponent implements OnInit {
  loading = false;
  isAdmin = false;

  genres: GenresResponseDto;

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private genreService: GenreService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadPage(this.currentPage, this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPage(page, this.pageSize);
  }

  loadPage(currentPage: number, pageSize: number) {
    this.loading = true
    this.genres = {
      genres: [],
      totalCount: 0,
      totalPages: 0
    };
    let request : GetAllGenresRequestDto = {
      page: currentPage,
      pageSize: pageSize,
    }
    this.genreService.getAll(request).subscribe(genres => {
      this.loading = false;
      this.genres = genres;
      this.totalPages = this.totalPages;
    })
  }

}
