import { observable, action, decorate, computed } from 'mobx';
import { Equation } from './types';
import { store as formStore } from './store';
import {
  EquationEditableParts,
  EquationUpdater,
} from './steps/MakeEquations/types';

class EqStore {
  activeId: null | number = null;

  setId = (id: number | null): void => {
    this.activeId = id;
  };

  startEdit = (id: number): void => {
    this.setId(id);
  };

  remove = (id: number): void => {
    formStore.parseData(
      'equations',
      formStore.data.equations.filter((item) => item.id !== id),
    );

    this.resetFields();
  };

  addItem = (itemData: EquationEditableParts): void => {
    formStore.parseData('equations', [
      ...formStore.data.equations,
      {
        ...itemData,
        id: this.activeId || Date.now(),
        order: formStore.maxOrder + 1,
        new: true,
      },
    ]);

    this.setId(null);
  };

  resetFields = (): void => {
    this.setId(null);
  };

  updateItem: EquationUpdater = (itemData) => {
    if (!itemData.id && !this.activeId) {
      this.addItem(itemData);
      return;
    }

    const id = itemData.id ?? this.activeId;

    const equations = formStore.data.equations.slice();
    const index = equations.findIndex((item) => item.id === id);
    equations[index] = { ...equations[index], ...itemData };
    formStore.parseData('equations', equations);

    // if updating the current item, reset current
    // if updating previously selected item (available by flow) - dont reset
    if (id === equations[index].id) this.setId(null);
  };

  get activeItem(): Equation | null {
    let result = null;

    if (this.activeId)
      result = formStore.data.equations.find(
        (item) => item.id === this.activeId,
      ) as Equation;

    return result;
  }
}

decorate(EqStore, {
  activeId: observable,
  setId: action,
  startEdit: action,
  remove: action,
  addItem: action,
  updateItem: action,
  resetFields: action,
  activeItem: computed,
});

export const store = new EqStore();
