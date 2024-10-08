import { BookResponseDto } from './../../../shared/interfaces/book/responses/book-response-dto.interface';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { BookService } from '../../../shared/services/book.service';
import { MaterialService } from '../../../shared/services/material.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookRequestDto } from '../../../shared/interfaces/book/requests/book-request-dto.interface';
import { isbnRegex } from '../../../shared/consts/isbn-regex.const';
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
    availableCount: 0,
    totalCount: 0
  }
  genres: GenreResponseDto[];
  authors: AuthorResponseDto[];

  bookLoaded = false;
  form: FormGroup;

  @ViewChild('imageRef') imageRef: ElementRef;
  image: File;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) {

    this.form = new FormGroup({
      isbn: new FormControl("ISBN-13: 978-0-000-00000-0", [Validators.required, Validators.pattern(isbnRegex)]),
      name: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      description: new FormControl("", [Validators.required, Validators.maxLength(1000)]),
      authorId: new FormControl(null, Validators.required),
      genreIds: new FormControl([], Validators.required),
      availableCount: new FormControl("0", [Validators.required, Validators.min(1), Validators.max(2147483647), Validators.pattern("^[0-9]*$")]),
      totalCount: new FormControl("1", [Validators.required, Validators.min(1), Validators.max(2147483647), Validators.pattern("^[0-9]*$")]),
    })

    this.form.get('availableCount')?.valueChanges.subscribe((availableCount) => {
      const totalCount = this.form.get('totalCount')?.value;

      if (Number(availableCount) > Number(totalCount)) {
        this.form.get('totalCount')?.setValue(availableCount);
      }
    });

    this.form.get('totalCount')?.valueChanges.subscribe((totalCount) => {
      const availableCount = this.form.get('availableCount')?.value;

      if (Number(totalCount) < Number(availableCount)) {
        this.form.get('totalCount')?.setValue(availableCount);
      }
    });
  }

  ngOnInit() {
    this.loadData();
    this.loadBook();
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
              authorId: book.authorId,
              availableCount: book.availableCount,
              totalCount: book.totalCount,
              genreIds: book.genreIds,
            });
          }
          this.cdr.detectChanges();
          this.updadeMaterialize();
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
    if (!this.book.image) {
      MaterialService.toast("Select Image to send form");
      return;
    }

    const bookRequestDto: BookRequestDto = {
      isbn: this.form.value['isbn'],
      name: this.form.value['name'],
      description: this.form.value['description'],
      authorId: this.form.value['authorId'],
      image: this.book.image,
      availableCount: this.form.value['availableCount'],
      totalCount: this.form.value['totalCount'],
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
    };
  }

  triggerClick() {
    this.imageRef.nativeElement.click()
  }

  onFileUpload(event: Event) {
    const file: File = event.target['files'][0];
    this.image = file;
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.book.image = base64String; 
      this.cdr.detectChanges();
      this.cdr.detectChanges();
    }

    reader.readAsDataURL(file);
    this.updadeMaterialize();
  }

  updadeMaterialize() {
    MaterialService.initMaterialBoxed();
    MaterialService.updateTextFields();
    MaterialService.initFormSelect();
  }


}
