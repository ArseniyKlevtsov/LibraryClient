import { BookResponseDto } from './../../../shared/interfaces/book/responses/book-response-dto.interface';
import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, of, switchMap, tap, timeout } from 'rxjs';
import { BookService } from '../../../shared/services/book.service';
import { MaterialService } from '../../../shared/services/material.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookRequestDto } from '../../../shared/interfaces/book/requests/book-request-dto.interface';
import { isbnRegex } from '../../../shared/consts/isbn-regex.const';
import { GenreService } from '../../../shared/services/genre.service';
import { AuthorService } from '../../../shared/services/author.service';
import { AuthorResponseDto } from '../../../shared/interfaces/author/responses/author-response-dto.interface';
import { GenreResponseDto } from '../../../shared/interfaces/genre/responses/genre-response-dto.interface';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  isNew: boolean = true;

  book: BookResponseDto = {
    id: "",
    isbn: "",
    name: "",
    description: "",
    authorId: "",
    genreIds: [],
    rentedBookIds: []
  }
  genres: GenreResponseDto[];
  authors: AuthorResponseDto[];

  bookLoaded = false;
  form: FormGroup;

  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) {

    this.form = new FormGroup({
      isbn: new FormControl("", [Validators.required, Validators.pattern(isbnRegex)]),
      name: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      description: new FormControl("", [Validators.required, Validators.maxLength(1000)]),
      authorId: new FormControl(null, Validators.required),
      genreIds: new FormControl([], Validators.required),
    })
    
  }
  
  ngOnInit() {
    this.loadBook();
    this.loadSelectData();
    MaterialService.initFormSelect();
  }
  
  loadSelectData() {
    forkJoin([
      this.authorService.getAll({ page: 1, pageSize: 100 }),
      this.genreService.getAll({ page: 1, pageSize: 100 })
    ]).pipe(
      tap(([authors, genres]) => {
        this.authors = authors.authors;
        this.genres = genres.genres;
        
      })
    )
    .subscribe();
  }

  refresh() {
    MaterialService.initFormSelect();
    console.log(this.form.value['authorId'])
    console.log(this.form.value['genreIds'])
  }

  handleResponse = (data: any) => {
    MaterialService.toast("The record has been " + (this.isNew ? "added" : "updated"));
  };

  handleError = (error: any) => {
    MaterialService.toast("An error occurred when requesting the server");
  };

  loadBook() {
    this.form.disable()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.bookService.getById(params['id'])
          }

          return of(null);
        })
      )
      .subscribe({
        next: (book: BookResponseDto) => {
          if (book) {
            this.book = book;
            this.form.patchValue({
              isbn: book.isbn,
              name: book.name,
              description: book.description,
              bookImageId: book.bookImageId,
              authorId: book.authorId,
              genreIds: book.genreIds,
            });
            MaterialService.updateTextFields();
          }
          this.form.enable();
        },
        error: error => MaterialService.toast("Failed to upload data"),
      });
  }

  deleteBook() {
    const decision = window.confirm('Delete this book?')
    if (decision) {
      this.bookService.deleteById(this.book.id).subscribe({
        next: data => {
          MaterialService.toast("The record has been deleted");
          this.router.navigate(['/books'])
        },
        error: this.handleError
      });
    }
  }

  onSubmit() {
    const bookRequestDto: BookRequestDto = {
      isbn: this.form.value['isbn'],
      name: this.form.value['name'],
      description: this.form.value['description'],
      authorId: this.form.value['description'],
      genreIds: this.form.value['genreIds'],
    };

    if (this.isNew) {
      this.bookService.add(bookRequestDto).subscribe({
        next: this.handleResponse,
        error: this.handleError
      });
    } else {
      this.bookService.update(this.book.id, bookRequestDto).subscribe({
        next: this.handleResponse,
        error: this.handleError
      });
    }
  }
}
