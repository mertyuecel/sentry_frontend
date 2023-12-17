import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserFeedback } from './user-feedback.model';

@Injectable({
  providedIn: 'root'
})
export class UserFeedbackService {
  private apiUrl = 'http://localhost:8080/userFeedback/createIssue';

  constructor(private http: HttpClient) {}

  sendUserFeedback(userFeedback: UserFeedback): Observable<any> {
    return this.http.post<UserFeedback>(this.apiUrl, userFeedback);
  }
}
