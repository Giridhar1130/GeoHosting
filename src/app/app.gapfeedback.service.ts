import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { GapFeedBack } from './component/gapfeedbackfiles/gapfeedback/types/gapfeedback.type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GapFeedbackService {
  intakesUrl = 'https://geohostingapi.azurewebsites.net/api/gapFeedback/Forms';
  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  getgapfeedback(countryName:string = null) {
    let url: string;
    if (countryName) {
      url = 'https://geohostingapi.azurewebsites.net/api/gapFeedback/Forms?countryName=' + countryName;
    }
    else {
      url = 'https://geohostingapi.azurewebsites.net/api/gapFeedback/Forms';
    }
    return this.http.get<GapFeedBack[]>(url)
      .pipe(catchError(this.handleError)
      );
  }

  postintakeForm(intakeForm) {
    console.log('postintakeForm work', intakeForm.FormId);

    return this.http.patch<GapFeedBack>(this.intakesUrl + '/update', intakeForm)
    .pipe(catchError(this.handleError)
    );
  }

  private log(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}`);
    }
    return throwError('Something bad happend; please try again later.');
  }
}
