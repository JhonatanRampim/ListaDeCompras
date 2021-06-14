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
    return this.httpClient.post<any>(this.apiUrl + 'lista/getMyList', { id: "1" })
      .pipe(map(lista => lista));
  }

  getMyListsItems(id?) {
    return this.httpClient.post<any>(this.apiUrl + 'lista/getMyListWithItems', { id: null, id_lista: id })
      .pipe(map(lista => lista));
  }
}
