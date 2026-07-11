import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCrud } from '../models/item-crud.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemCrudUpdateService {
  private readonly http = inject(HttpClient);

  update(id: number, item: ItemCrud): Observable<ItemCrud> {
    return this.http.put<ItemCrud>(`${environment.apiUrl}/items/${id}/`, item);
  }
}
