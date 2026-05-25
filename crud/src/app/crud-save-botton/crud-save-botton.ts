import { ItemCrud } from './../app';
import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {form, FormField, required} from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ItemCrud } from '../app';

@Component({
  selector: 'app-crud-save-botton',
  imports: [ButtonModule,
            
          ],
  template: ` <div class="card flex justify-center mt-4">
      <p-button type="submit" [disabled]="crudForm().invalid()" label="Salvar" (onClick)="handleclick($event)" />
    </div>`,
  styleUrl: './crud-save-botton.css',
})
export class CrudSaveBotton {}
