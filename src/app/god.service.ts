import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { God } from './god';
import { MessageService } from './message.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GodService {

  private godsUrl = 'api/olymp';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getGods (): Observable<God[]> {
    return this.http.get<God[]>(this.godsUrl)
      .pipe(
        tap(gods => this.log(`fetched gods`)),
        catchError(this.handleError('getGods', []))
      );
  }

  getGodNo404<Data>(id: number): Observable<God> {
    const url = `${this.godsUrl}/?id=${id}`;
    return this.http.get<God[]>(url)
      .pipe(
        map(gods => gods[0]),
        tap(g => {
          const outcome = g ? `fetched` : `did not find`;
          this.log(`${outcome} god id=${id}`);
        }),
        catchError(this.handleError<God>(`getGod id=${id}`))
      );
  }

  getGod(id: number): Observable<God> {
    const url = `${this.godsUrl}/${id}`;
    return this.http.get<God>(url).pipe(
      tap(_ => this.log(`fetched god id=${id}`)),
      catchError(this.handleError<God>(`getGod id=${id}`))
    );
  }

  searchGods(term: string): Observable<God[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<God[]>(`api/gods/?name=${term}`).pipe(
      tap(_ => this.log(`found gods matching "${term}"`)),
      catchError(this.handleError<God[]>('searchGods', []))
    );
  }

  addGod (god: God): Observable<God> {
    return this.http.post<God>(this.godsUrl, god, httpOptions).pipe(
      tap((god: God) => this.log(`added god w/ id=${god.id}`)),
      catchError(this.handleError<God>('addGod'))
    );
  }

  deleteGod (god: God | number): Observable<God> {
    const id = typeof god === 'number' ? god : god.id;
    const url = `${this.godsUrl}/${id}`;

    return this.http.delete<God>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted god id=${id}`)),
      catchError(this.handleError<God>('deleteGod'))
    );
  }

  updateGod (god: God): Observable<any> {
    return this.http.put(this.godsUrl, god, httpOptions).pipe(
      tap(_ => this.log(`updated god id=${god.id}`)),
      catchError(this.handleError<any>('updateGod'))
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
    this.messageService.add('GodService: ' + message);
  }

}