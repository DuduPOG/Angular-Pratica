import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemCrudRemoveService {
  private readonly http = inject(HttpClient);

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/items/${id}/`);
  }
}
