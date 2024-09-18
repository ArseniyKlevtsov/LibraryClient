import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditInventoryComponent } from './book-edit-inventory.component';

describe('BookEditInventoryComponent', () => {
  let component: BookEditInventoryComponent;
  let fixture: ComponentFixture<BookEditInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEditInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookEditInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
