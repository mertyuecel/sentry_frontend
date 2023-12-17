import {Injectable, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/library';

  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/addBook`, book);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/book/${id}`);
  }

  updateBook(id: number, updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/updateBook/${id}`, updatedBook);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.baseUrl}/deleteBook/${id}`);
  }
}
