import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ItemCrud } from '../models/item-crud.model';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule],
  template: `
    <div class="mt-8">
      <p-table [value]="items()" [paginator]="true" [rows]="5" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="nome">Nome <p-sortIcon field="nome"></p-sortIcon></th>
            <th pSortableColumn="descricao">Descrição <p-sortIcon field="descricao"></p-sortIcon></th>
            <th pSortableColumn="nota">Nota <p-sortIcon field="nota"></p-sortIcon></th>
            <th pSortableColumn="trabalho">Trabalhoso <p-sortIcon field="trabalho"></p-sortIcon></th>
            <th>Ações</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item let-rowIndex="rowIndex">
          <tr>
            <td>{{ item.nome }}</td>
            <td>{{ item.descricao }}</td>
            <td>{{ item.nota }}</td>
            <td>
              <span class="px-3 py-1 rounded-full text-sm font-semibold"
                [class]="item.trabalho ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                {{ item.trabalho ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td>
              <div class="flex gap-2">
                <p-button
                  icon="pi pi-eye"
                  [rounded]="true"
                  [text]="true"
                  severity="info"
                  (onClick)="onDetail.emit(item)"
                  pTooltip="Detalhar"
                  tooltipPosition="top"
                />
                <p-button
                  icon="pi pi-pencil"
                  [rounded]="true"
                  [text]="true"
                  severity="warn"
                  (onClick)="onEdit.emit(rowIndex)"
                  pTooltip="Editar"
                  tooltipPosition="top"
                />
                <p-button
                  icon="pi pi-trash"
                  [rounded]="true"
                  [text]="true"
                  severity="danger"
                  (onClick)="onDelete.emit(rowIndex)"
                  pTooltip="Excluir"
                  tooltipPosition="top"
                />
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="5" class="text-center py-8 text-gray-500">
              Nenhum item encontrado. Adicione um novo item ao CRUD!
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class CrudTableComponent {
  items = input.required<ItemCrud[]>();
  onEdit = output<number>();
  onDelete = output<number>();
  onDetail = output<ItemCrud>();
}
