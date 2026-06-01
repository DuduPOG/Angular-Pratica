import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ItemCrud } from '../models/item-crud.model';

@Component({
  selector: 'app-crud-detail',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog
      [visible]="isVisible()"
      (visibleChange)="isVisible.set($event)"
      [header]="item()?.nome"
      [modal]="true"
      [style]="{ width: '50vw' }"
      [breakpoints]="{ '960px': '75vw', '640px': '90vw' }"
      (onHide)="onClose.emit()"
    >
      @if (item(); as itemData) {
        <div class="space-y-4">
          <div class="flex justify-center">
            <img
              [src]="itemData.foto || itemData.imagemPadrao"
              [alt]="itemData.nome"
              class="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div class="border-t pt-4">
            <h3 class="text-lg font-semibold text-gray-800">Informações</h3>

            <div class="mt-4 space-y-2">
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Nome:</span>
                <span class="text-gray-600">{{ itemData.nome }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Descrição:</span>
                <span class="text-gray-600">{{ itemData.descricao }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Nota:</span>
                <span class="text-gray-600 font-bold">{{ itemData.nota }}/10</span>
              </div>

              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Foi trabalhoso?</span>
                <span
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                  [class]="itemData.trabalho ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                  {{ itemData.trabalho ? 'Sim' : 'Não' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    </p-dialog>
  `
})
export class CrudDetailComponent {
  item = input.required<ItemCrud | null>();
  isVisible = signal(false);
  onClose = output<void>();

  constructor() {
    // Sincronizar visibilidade com o item selecionado
    effect(() => {
      this.isVisible.set(!!this.item());
    });
  }
}
