import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NgFor, NgIf } from '@angular/common';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { RouterModule } from '@angular/router';
import { BooksResponseDto } from '../../shared/interfaces/book/responses/books-response-dto.interface';
import { BookService } from '../../shared/services/book.service';
import { AuthService } from '../../shared/services/auth.service';
import { GetAllBooksRequestDto } from '../../shared/interfaces/book/requests/get-all-books-request-dto.interface';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [LoaderComponent, NgIf, NgFor, PaginatorComponent, RouterModule],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent implements OnInit {
  loading = false;
  isAdmin = false;

  books: BooksResponseDto;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  bookImagesIds: string[] = [];
  bookInventoryIds: string[] = [];

  constructor(
    private bookService: BookService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadPage(this.currentPage, this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPage(page, this.pageSize);
  }

  loadPage(currentPage: number, pageSize: number): void {
    this.loadBooks(currentPage, pageSize);
  }

  loadBooks(currentPage: number, pageSize: number): void {
    this.loading = true
    this.books = {
      books: [],
      totalCount: 0,
      totalPages: 0
    };
    let request : GetAllBooksRequestDto = {
      page: currentPage,
      pageSize: pageSize,
    }
    this.bookService.getAll(request).subscribe(genres => {
      this.loading = false;
      this.books = genres;
      this.totalPages = this.totalPages;
    })
  }
}
