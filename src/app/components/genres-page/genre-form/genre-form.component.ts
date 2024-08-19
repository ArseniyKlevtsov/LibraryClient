import { GenreRequestDto } from './../../../shared/interfaces/genre/requests/genre-request-dto.interface';
import { Component, OnInit, Input } from '@angular/core';
import { MaterialService } from '../../../shared/services/material.service';
import { GenreService } from '../../../shared/services/genre.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenreResponseDto } from '../../../shared/interfaces/genre/responses/genre-response-dto.interface';
import { NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-genre-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.css'
})
export class GenreFormComponent implements OnInit {
  isNew: boolean = true;

  genre: GenreResponseDto = {
    id: "",
    name: "",
    bookIds: []
  }
  genreLoaded = false;

  form: FormGroup;
  constructor(
    private genreService: GenreService,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }


  ngOnInit() {
    this.loadGenre();
  }

  loadGenre() {
    this.form.disable()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.genreService.getById(params['id'])
          }

          return of(null);
        })
      )
      .subscribe({
        next: (genre: GenreResponseDto) => {
          if (genre) {
            this.genre = genre;
            this.form.patchValue({
              name: genre.name
            });
            MaterialService.updateTextFields();
          }
          this.form.enable();
        },
        error: error => MaterialService.toast("Failed to upload data"),
      });
  }

  deleteGenre() {
    const decision = window.confirm('Delete this genre?')
    if (decision) {
      console.log(decision)
      console.log(this.genre.id)
      this.genreService.deleteById(this.genre.id).subscribe({
        next: data => {
          MaterialService.toast("The record has been deleted");
          this.router.navigate(['/genres'])
        },
        error: error => {
          MaterialService.toast("An error occurred when requesting the server");
        }
      });


    }
  }

  onSubmit() {
    const genreRequestDto: GenreRequestDto = {
      name: this.form.value['name']
    }
    if (this.isNew) {
      this.genreService.add(genreRequestDto).subscribe({
        next: data => {
          MaterialService.toast("The record has been added");
          this.router.navigate(['/genres'])
        },
        error: error => {
          MaterialService.toast("An error occurred when requesting the server");
        }
      })
    }
    else {
      this.genreService.update(this.genre.id, genreRequestDto).subscribe({
        next: data => {
          MaterialService.toast("The record has been updated");
        },
        error: error => {
          MaterialService.toast("An error occurred when requesting the server");
        }
      })
    }
  }
}
