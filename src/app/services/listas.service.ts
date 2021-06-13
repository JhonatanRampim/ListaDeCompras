import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  public apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getMyLists() {
    return this.httpClient.post(this.apiUrl + 'lista/geyMyList', { id: 1 })
      .pipe(map(lista => { lista }));
  }
}
