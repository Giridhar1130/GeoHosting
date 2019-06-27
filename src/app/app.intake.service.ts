import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { CountryIntake } from './component/types/countryintake.type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; // https://localhost:44376/api/countryIntake/Forms
@Injectable({
  providedIn: 'root'
})
export class IntakeService {
  intakesUrl = 'https://localhost:44376/api/countryIntake/Forms';
  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  getintake() {
    return this.http.get<any[]>('https://localhost:44376/api/countryIntake/Forms')
      .pipe(catchError(this.handleError)
      );
  }
  postintakeForm(intakeForm) {
    console.log('postintakeForm work', intakeForm.FormId);
    const countryIntake = JSON.stringify(intakeForm);
    return this.http.patch<CountryIntake>(this.intakesUrl + '/update', countryIntake)
    .pipe(catchError(this.handleError)
    );
  }
  postintakeFormtocopy(intakeForm) {
    console.log('postintakeFormtocopy work');
    const jsonfile = JSON.stringify(intakeForm);
    return this.http.patch(this.intakesUrl + '/update', jsonfile)
    .pipe(catchError(this.handleError)
    );
  }

  private log(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private handleError(error: HttpErrorResponse): any {
    console.log('erro');
    if (error.error instanceof ErrorEvent) {
      console.error('An erro occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}`);
    }
    return throwError('Something bad happend; please try again later.');
  }
}



