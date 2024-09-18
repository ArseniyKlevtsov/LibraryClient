import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialService } from '../../../shared/services/material.service';

@Component({
  selector: 'app-book-edit-image',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './book-edit-image.component.html',
  styleUrl: './book-edit-image.component.css'
})
export class BookEditImageComponent {
  form: FormGroup;

  @ViewChild('imageRef') imageRef : ElementRef;
  image: File;
  imagePreview: string|ArrayBuffer = "";

  triggerClick() {
    this.imageRef.nativeElement.click()
  }

  onFileUpload(event: Event) {
    const file: File = event.target['files'][0];
    this.image = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file);
    MaterialService.initMaterialBoxed();
  }
}
