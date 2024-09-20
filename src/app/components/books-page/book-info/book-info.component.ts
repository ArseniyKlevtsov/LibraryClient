import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { BookService } from '../../../shared/services/book.service';
import { NgIf } from '@angular/common';
import { BookInfoResponseDto } from '../../../shared/interfaces/book/responses/book-info-response-dto.interface';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [NgIf, RouterLink ],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.css'
})
export class BookInfoComponent {
  book: BookInfoResponseDto = {
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
      this.bookService.getBookInfo(id).subscribe(
        book => {
        this.book = book;
      });
    });
  }

  get genreList(): string {
    return this.book.genres?.map((genre: any) => genre.name).join(', ') || 'No genres';
}
}
