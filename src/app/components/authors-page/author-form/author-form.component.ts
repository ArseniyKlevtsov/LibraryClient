import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorResponseDto } from '../../../shared/interfaces/author/responses/author-response-dto.interface';
import { AuthorService } from '../../../shared/services/author.service';
import { MaterialService } from '../../../shared/services/material.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthorRequestDto } from '../../../shared/interfaces/author/requests/author-request-dto.interface';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css'
})
export class AuthorFormComponent implements OnInit {
  isNew: boolean = true;

  author: AuthorResponseDto = {
    id: "",
    name: "",
    surname: "",
    birthDate: new Date(),
    country: ""
  }
  authorLoaded = false;

  form: FormGroup;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) {

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required,Validators.maxLength(20)]),
      surname: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      birthDate: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      country: new FormControl("", Validators.required),
    })
  }
  
  ngOnInit() {
    this.loadAuthor();
  }

  handleResponse = (data: any) => {
    MaterialService.toast("The record has been " + (this.isNew ? "added" : "updated"));
  };

  handleError = (error: any) => {
    MaterialService.toast("An error occurred when requesting the server");
  };
  
  loadAuthor() {
    this.form.disable()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.authorService.getById(params['id'])
          }

          return of(null);
        })
      )
      .subscribe({
        next: (author: AuthorResponseDto) => {
          if (author) {
            this.author = author;
            this.form.patchValue({
              name: author.name,
              surname: author.surname,
              birthDate: author.birthDate,
              country: author.country,
            });
            MaterialService.updateTextFields();
          }
          this.form.enable();
        },
        error: error => MaterialService.toast("Failed to upload data"),
      });
  }

  deleteAuthor() {
    const decision = window.confirm('Delete this author?')
    if (decision) {
      this.authorService.deleteById(this.author.id).subscribe({
        next: data => {
          MaterialService.toast("The record has been deleted");
          this.router.navigate(['/authors'])
        },
        error: this.handleError
      });
    }
  }

  onSubmit() {
    const authorRequestDto: AuthorRequestDto = {
      name: this.form.value['name'],
      surname: this.form.value['surname'],
      birthDate: this.form.value['birthDate'],
      country: this.form.value['country'],
    }
  
    if (this.isNew) {
      this.authorService.add(authorRequestDto).subscribe({
        next: this.handleResponse,
        error: this.handleError
      });
    } else {
      this.authorService.update(this.author.id, authorRequestDto).subscribe({
        next: this.handleResponse,
        error: this.handleError
      });
    }
  }

}
