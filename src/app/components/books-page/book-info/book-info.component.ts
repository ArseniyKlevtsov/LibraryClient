import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { BookResponseDto } from './../../../shared/interfaces/book/responses/book-response-dto.interface';
import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { BookService } from '../../../shared/services/book.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [NgIf, RouterLink ],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.css'
})
export class BookInfoComponent {
  book: BookResponseDto = {
      id: "",
      isbn: "",
      name: "",
      description: "",
      author: null,
      image: "",
      availableCount: 0,
      totalCount: 0,
      genres: []
  };

  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private bookService: BookService) {
  }

  ngOnInit() {
    this.loadBook();
    this.isAdmin = this.authService.isAdmin();
  }

  loadBook() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.bookService.getById(id).subscribe(
        book => {
        this.book = book;
      });
    });
  }
}
