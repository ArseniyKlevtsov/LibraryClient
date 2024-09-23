export interface RentedBookResponseDto {
    id: string;             
    takeTime?: Date;      
    returnTime?: Date; 
    booksCount: number;    
    bookId: string;    
    rentOrderId: string;   
}