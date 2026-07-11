import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCrud } from '../models/item-crud.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemCrudInsertService {
  private readonly http = inject(HttpClient);

  insert(item: ItemCrud): Observable<ItemCrud> {
    return this.http.post<ItemCrud>(`${environment.apiUrl}/items/`, item);
  }
}
