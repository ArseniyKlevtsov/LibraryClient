export interface BookRequestDto {
  isbn?: string;                  
  name?: string;                  
  description?: string;          
  authorId?: string;          
  image?: string ;             
  availableCount?: number;        
  totalCount?: number;            
  genreIds?: string[];            
}