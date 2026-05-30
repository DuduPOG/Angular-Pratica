import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crud-save-botton',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="card flex justify-center mt-4">
      <p-button type="submit" label="Salvar" />
    </div>
  `,
  styleUrl: './crud-save-botton.css',
})
export class CrudSaveBotton {}
