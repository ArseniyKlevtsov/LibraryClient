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

  static initDatePicker(options?: any) {
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, options);
  }

  static initMaterialBoxed(options?: any) {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems, options);
  }
  static initFormSelect(options?: any) {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, options);
  }
}
