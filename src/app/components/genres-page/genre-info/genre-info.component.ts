import { BookService } from './../../../shared/services/book.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { GenreResponseDto } from '../../../shared/interfaces/genre/responses/genre-response-dto.interface';
import { GenreService } from '../../../shared/services/genre.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { BooksResponseDto } from '../../../shared/interfaces/book/responses/books-response-dto.interface';
import { NgFor, NgIf } from '@angular/common';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { GetAllBooksRequestDto } from '../../../shared/interfaces/book/requests/get-all-books-request-dto.interface';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-genre-info',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, PaginatorComponent, LoaderComponent],
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.css'
})
export class GenreInfoComponent implements OnInit {
  genre: GenreResponseDto = {
    id: "",
    name: "",
    bookIds: []
  }
  genreBooks: BooksResponseDto = {
    totalCount: 0,
    totalPages: 0,
    books: []
  }

  isAdmin: boolean = false;
  loading = false;
  genreLoaded = false;
  hasBooks = false;

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private genreService: GenreService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bookService: BookService) {
  }

  ngOnInit() {
    this.loadGenre();
    if(this.genreLoaded) {
      this.loadPage(this.currentPage, this.pageSize);
    }
    this.isAdmin = this.authService.isAdmin();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPage(page, this.pageSize);
  }
  
  loadGenre() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.genreService.getById(id).subscribe(genre => {
        this.genre = genre;
        this.genreLoaded = true;
      });
    });
  }

  loadPage(currentPage: number, pageSize: number) {
    this.loading = true
    this.genreBooks = {
      books: [],
      totalCount: 0,
      totalPages: 0
    };

    let getAllBooksRequestDto: GetAllBooksRequestDto = {
      page: currentPage,
      pageSize: pageSize,
      genreId: this.genre.id
    }
    this.bookService.getAll(getAllBooksRequestDto).subscribe(genreBooks => {
      this.loading = false;
      this.genreBooks = genreBooks;
      this.totalPages = this.totalPages;
      if (genreBooks.books.length > 0) {
        this.hasBooks = true
      }
      else {
        this.hasBooks = false
      }
    })
  }

  deleteGenre() {
    this.genreService.deleteById(this.genre.id);
  }

}
