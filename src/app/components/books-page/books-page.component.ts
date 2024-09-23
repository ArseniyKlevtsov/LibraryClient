import { CartService } from './../../shared/services/cart.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NgFor, NgIf } from '@angular/common';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { RouterModule } from '@angular/router';
import { BooksResponseDto } from '../../shared/interfaces/book/responses/books-response-dto.interface';
import { BookService } from '../../shared/services/book.service';
import { AuthService } from '../../shared/services/auth.service';
import { GetAllBooksRequestDto } from '../../shared/interfaces/book/requests/get-all-books-request-dto.interface';
import { BookPreviewResponseDto } from '../../shared/interfaces/book/responses/book-preview-response-dto.interface';
import { CartRentedBook } from '../../shared/interfaces/rented-book/cart-rented-book.interface';
import { MaterialService } from '../../shared/services/material.service';
import { GenreResponseDto } from '../../shared/interfaces/genre/responses/genre-response-dto.interface';
import { AuthorResponseDto } from '../../shared/interfaces/author/responses/author-response-dto.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [LoaderComponent, NgIf, NgFor, PaginatorComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent implements OnInit {
  loading = false;
  isAdmin = false;

  books: BooksResponseDto;

  genres: GenreResponseDto[];
  authors: AuthorResponseDto[];

  bookFilterForm: FormGroup;

  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 1;

  bookImagesIds: string[] = [];
  bookInventoryIds: string[] = [];

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef) {

    this.bookFilterForm = new FormGroup({
      name: new FormControl(null),
      authorId: new FormControl(null),
      genreId: new FormControl(null),
    })
  }


  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadPage(this.currentPage, this.pageSize);
    this.loadData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPage(page, this.pageSize);
  }

  loadPage(currentPage: number, pageSize: number): void {
    this.loadBooks(currentPage, pageSize);
  }

  loadData() {
    this.bookService.getBookEditInfo().subscribe(
      (bookEditInfo) => {
        this.authors = bookEditInfo.authors;
        this.genres = bookEditInfo.genres;
        this.cdr.detectChanges();
        MaterialService.initFormSelect();
      }
    )
  }

  loadBooks(currentPage: number, pageSize: number): void {
    this.loading = true
    this.books = {
      books: [],
      totalCount: 0,
      totalPages: 0
    };

    const filterValues = this.bookFilterForm.value;

    let request: GetAllBooksRequestDto = {
      page: currentPage,
      pageSize: pageSize,
      bookNameFilter: filterValues.name,
      authorId: filterValues.authorId,
      genreId: filterValues.genreIds
    };

    this.bookService.getAll(request).subscribe(genres => {
      this.loading = false;
      this.books = genres;
      this.totalPages = genres.totalPages;
    })
  }

  inCart(book: BookPreviewResponseDto) {
    let cartRentedBook: CartRentedBook = {
      booksCount: 1,
      book: book
    }
    this.cartService.addToCart(cartRentedBook);
  }

  onSubmit() {
    this.currentPage = 1
    this.loadPage(this.currentPage, this.pageSize);
  }

  resetFilters() {
    this.bookFilterForm.reset({
      name: null,
      authorId: null,
      genreId: null
    });
    MaterialService.initFormSelect();
  }
}
