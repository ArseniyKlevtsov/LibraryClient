export interface RentedBookProfileResponseDto {
    id: string;             
    takeTime?: Date;      
    returnTime?: Date; 
    booksCount: number;    
    bookId: string;    
    rentOrderId: string;   
    bookName: string;   
}