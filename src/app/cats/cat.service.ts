import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cat } from './cat';

@Injectable()
export class CatService {

  constructor(private http: HttpClient) { }

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>('/api/cats');
  }

  addCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>('/api/cats', cat);
  }

  removeCat(id: number): Observable<Cat> {
    return this.http.delete<Cat>('/api/cats/' + id);
  }
}
