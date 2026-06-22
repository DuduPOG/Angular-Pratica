import { Component, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CrudFormComponent } from '../../components/crud-form/crud-form.component';
import { ItemCrudInsertService } from '../../services/item-crud-insert.service';
import { ItemCrud, DEFAULT_ITEM_CRUD } from '../../models/item-crud.model';

@Component({
  selector: 'app-inclusao',
  standalone: true,
  imports: [ButtonModule, ToastModule, CrudFormComponent],
  providers: [MessageService],
  template: `
    <p-toast />

    <main class="max-w-3xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">Adicionar Novo Item</h1>
        <p class="text-center text-gray-600 mt-2">Preencha o formulário para criar um novo item</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <app-crud-form
          #crudForm
          [initialData]="DEFAULT_ITEM_CRUD"
          (formSubmitted)="handleFormSubmit($event)"
        />

        <div class="flex gap-4 mt-8">
          <p-button
            label="Salvar"
            icon="pi pi-check"
            [loading]="saving()"
            (onClick)="submitForm()"
            class="flex-1"
          />
          <p-button
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            [outlined]="true"
            (onClick)="cancelar()"
            class="flex-1"
          />
        </div>
      </div>
    </main>
  `,
})
export class InclusaoComponent {
  private readonly router = inject(Router);
  private readonly insertService = inject(ItemCrudInsertService);
  private readonly messageService = inject(MessageService);

  readonly DEFAULT_ITEM_CRUD = DEFAULT_ITEM_CRUD;
  saving = signal(false);

  @ViewChild('crudForm') crudForm!: CrudFormComponent;

  handleFormSubmit(item: ItemCrud): void {
    this.saving.set(true);
    this.insertService.insert(item).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Item criado com sucesso!',
        });
        setTimeout(() => this.router.navigate(['/listagem']), 800);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível salvar o item.',
        });
        this.saving.set(false);
      },
    });
  }

  submitForm(): void {
    if (this.crudForm) {
      this.crudForm.submit();
    }
  }

  cancelar(): void {
    this.router.navigate(['/listagem']);
  }
}
