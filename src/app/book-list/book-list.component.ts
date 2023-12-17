import {Component, OnInit} from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {UserFeedbackService} from "../user-feedback.service";
import {UserFeedback} from "../user-feedback.model";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', author: '' };

  constructor(private bookService: BookService,
              public dialog: MatDialog,
              private userFeedbackService: UserFeedbackService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    },
      (error) => {
        console.error('HTTP request failed:', error);
        console.log(error.error)
      });
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe((book) => {
        this.books.push(book);
        this.newBook = { title: '', author: ''};
      },
      (error) => {
        this.openDialog(error.error);
      });
  }

  deleteBook(id: number | undefined) {
    this.bookService.deleteBook(id ?? 0).subscribe(
      () => {
        this.loadBooks();
      }
    );
  }

  openDialog(sentryId: string | undefined): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { sentryId: sentryId }
    });

    dialogRef.componentInstance.submit.subscribe((result: any) => {
      console.log('Submit clicked', result);
      this.sendUserFeedbackToBackend(result, sentryId);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  sendUserFeedbackToBackend(userFeedbackData: any, sentryId: string | undefined): void {
    const userFeedback: UserFeedback = {
      sentryId: sentryId,
      userName: userFeedbackData.name,
      email: userFeedbackData.email,
      comment: userFeedbackData.comment
    };

    this.userFeedbackService.sendUserFeedback(userFeedback).subscribe(
      () => {
        console.log('User feedback sent successfully');
      },
      (error) => {
        console.error('Failed to send user feedback:', error);
      }
    );
  }

}
