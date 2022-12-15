import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Titan } from './titan';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TitanService {

  private titansUrl = 'api/tartaros';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTitans (): Observable<Titan[]> {
    return this.http.get<Titan[]>(this.titansUrl)
      .pipe(
        tap(titans => this.log(`fetched titans`)),
        catchError(this.handleError('getTitans', []))
      );
  }

  getTitanNo404<Data>(id: number): Observable<Titan> {
    const url = `${this.titansUrl}/?id=${id}`;
    return this.http.get<Titan[]>(url)
      .pipe(
        map(titans => titans[0]),
        tap(t => {
          const outcome = t ? `fetched` : `did not find`;
          this.log(`${outcome} titan id=${id}`);
        }),
        catchError(this.handleError<Titan>(`getTitan id=${id}`))
      );
  }

  getTitan(id: number): Observable<Titan> {
    const url = `${this.titansUrl}/${id}`;
    return this.http.get<Titan>(url).pipe(
      tap(_ => this.log(`fetched titan id=${id}`)),
      catchError(this.handleError<Titan>(`getTitan id=${id}`))
    );
  }

  searchTitans(term: string): Observable<Titan[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Titan[]>(`api/titans/?name=${term}`).pipe(
      tap(_ => this.log(`found titans matching "${term}"`)),
      catchError(this.handleError<Titan[]>('searchTitans', []))
    );
  }

  addTitan (titan: Titan): Observable<Titan> {
    return this.http.post<Titan>(this.titansUrl, titan, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((titan: Titan) => this.log(`added titan w/ id=${titan.id}`)),
      catchError(this.handleError<Titan>('addTitan'))
    );
  }

  deleteTitan (titan: Titan | number): Observable<Titan> {
    const id = typeof titan === 'number' ? titan : titan.id;
    const url = `${this.titansUrl}/${id}`;

    return this.http.delete<Titan>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted titan id=${id}`)),
      catchError(this.handleError<Titan>('deleteTitan'))
    );
  }

  updateTitan (titan: Titan): Observable<any> {
    return this.http.put(this.titansUrl, titan, httpOptions).pipe(
      tap(_ => this.log(`updated titan id=${titan.id}`)),
      catchError(this.handleError<any>('updateTitan'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('TitanService: ' + message);
  }
}
