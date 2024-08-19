import { Injectable } from '@angular/core';

declare var M;

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() { }
  
  static toast(message: string) {
    M.toast({html: message})
  }

  static updateTextFields() {
    M.updateTextFields()
  }
}
