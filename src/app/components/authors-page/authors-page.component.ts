import { Component, OnInit } from '@angular/core';
import { AuthorsResponseDto } from '../../shared/interfaces/author/responses/authors-response-dto.interface';
import { AuthorService } from '../../shared/services/author.service';
import { AuthService } from '../../shared/services/auth.service';
import { GetAllAuthorsRequestDto } from '../../shared/interfaces/author/requests/get-all-authors-request-dto.interface';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NgFor, NgIf } from '@angular/common';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-authors-page',
  standalone: true,
  imports: [LoaderComponent, NgIf, NgFor, PaginatorComponent, RouterModule],
  templateUrl: './authors-page.component.html',
  styleUrl: './authors-page.component.css'
})
export class AuthorsPageComponent implements OnInit {
  loading = false;
  isAdmin = false;

  authors: AuthorsResponseDto;

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private authorService: AuthorService,
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
    this.authors = {
      authors: [],
      totalCount: 0,
      totalPages: 0
    };
    let request : GetAllAuthorsRequestDto = {
      page: currentPage,
      pageSize: pageSize,
    }
    this.authorService.getAll(request).subscribe(genres => {
      this.loading = false;
      this.authors = genres;
      this.totalPages = this.totalPages;
    })
  }
}
