import { Injectable, signal } from '@angular/core';
import { ItemCrud } from '../models/item-crud.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private items = signal<ItemCrud[]>([]);
  private editingIndex = signal<number | null>(null);
  private selectedItem = signal<ItemCrud | null>(null);

  items$ = this.items.asReadonly();
  editingIndex$ = this.editingIndex.asReadonly();
  selectedItem$ = this.selectedItem.asReadonly();

  addItem(item: ItemCrud): void {
    const currentItems = this.items();
    const editIndex = this.editingIndex();
    if (editIndex !== null) {
      currentItems[editIndex] = item;
      this.editingIndex.set(null);
    } else {
      currentItems.push(item);
    }
    this.items.set([...currentItems]);
  }

  deleteItem(index: number): void {
    const currentItems = this.items();
    currentItems.splice(index, 1);
    this.items.set([...currentItems]);

    if (this.editingIndex() === index) {
      this.editingIndex.set(null);
    }
  }

  setEditingItem(index: number | null): void {
    this.editingIndex.set(index);
  }

  getEditingIndex(): number | null {
    return this.editingIndex();
  }

  selectItem(item: ItemCrud | null): void {
    this.selectedItem.set(item);
  }

  getSelectedItem(): ItemCrud | null {
    return this.selectedItem();
  }

  getItemByIndex(index: number): ItemCrud | undefined {
    return this.items()[index];
  }

  resetAll(): void {
    this.editingIndex.set(null);
    this.selectedItem.set(null);
  }
}
