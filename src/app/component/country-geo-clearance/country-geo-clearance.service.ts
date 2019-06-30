import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CountryList } from '../types/country.type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CountryGeoClearanceService {
  commonSourceurl = 'https://localhost:44376/api/CommonSource';
  constructor(
    private http: HttpClient) { }

    getCommonSourceList(sourceType: number) {
      return this.http.get<any[]>('https://localhost:44376/api/CommonSource/Source?sourceType='+ sourceType)
			.pipe(catchError(this.handleError)
        );
    }

    getCountryList() {
        return this.http.get<CountryList[]>('https://localhost:44376/api/country/AllItems')
			.pipe(catchError(this.handleError)
        );
    }

    public getAllCountriesWithRiskDetails (includeRiskDetails = true) {	
      return this.http.get<CountryList[]>('https://localhost:44376/api/country/AllItems?includeRiskDetails='+ includeRiskDetails)	
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



