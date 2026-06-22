import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCrud } from '../models/item-crud.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemCrudListService {
  private readonly http = inject(HttpClient);

  findAll(): Observable<ItemCrud[]> {
    return this.http.get<ItemCrud[]>(`${environment.apiUrl}/items/`);
  }
}
