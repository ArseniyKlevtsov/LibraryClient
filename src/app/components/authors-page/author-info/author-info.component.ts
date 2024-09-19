import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { AuthorService } from '../../../shared/services/author.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BookService } from '../../../shared/services/book.service';
import { AuthorResponseDto } from '../../../shared/interfaces/author/responses/author-response-dto.interface';
import { BooksResponseDto } from '../../../shared/interfaces/book/responses/books-response-dto.interface';
import { GetAllBooksRequestDto } from '../../../shared/interfaces/book/requests/get-all-books-request-dto.interface';

@Component({
  selector: 'app-author-info',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, PaginatorComponent, LoaderComponent],
  templateUrl: './author-info.component.html',
  styleUrl: './author-info.component.css'
})
export class AuthorInfoComponent implements OnInit {

  author: AuthorResponseDto = {
    id: "",
    name: "",
    surname: "",
    birthDate: new Date(),
    country: "",
    bookIds: []
  }
  authorBooks: BooksResponseDto = {
    totalCount: 0,
    totalPages: 0,
    books: []
  }

  isAdmin: boolean = false;
  loading = false;
  authorLoaded = false;
  hasBooks = false;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bookService: BookService) {
  }

  ngOnInit() {
    this.loadAuthor();
    if (this.authorLoaded) {
      this.loadPage(this.currentPage, this.pageSize);
    }
    this.isAdmin = this.authService.isAdmin();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPage(page, this.pageSize);
  }

  loadAuthor() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.authorService.getById(id).subscribe(
        author => {
        this.author = author;
        this.authorLoaded = true;
      });
    });
  }

  loadPage(currentPage: number, pageSize: number) {
    this.loading = true
    this.authorBooks = {
      books: [],
      totalCount: 0,
      totalPages: 0
    };

    let getAllBooksRequestDto: GetAllBooksRequestDto = {
      page: currentPage,
      pageSize: pageSize,
      authorId: this.author.id
    };

    this.bookService.getAll(getAllBooksRequestDto).subscribe(genreBooks => {
      this.loading = false;
      this.authorBooks = genreBooks;
      this.totalPages = this.totalPages;
      this.hasBooks = genreBooks.books.length > 0
    });
  }
}
