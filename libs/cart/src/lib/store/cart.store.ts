import { computed } from '@angular/core';
import { getStorage, withStorage } from '@larscom/ngrx-signals-storage';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

const CART_STATE_KEY = 'cart';

interface CartState {
  items: string[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  isOpen: false,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorage(CART_STATE_KEY, getStorage('localStorage')),
  withComputed((store) => ({
    itemCount: computed(() => store.items().length),
  })),
  withMethods((store) => ({
    addItem(gameId: string) {
      const currentItems = store.items();
      const existingItem = currentItems.find((item) => item === gameId);

      if (!existingItem) {
        patchState(store, {
          items: [...currentItems, gameId],
        });
      }
    },
    removeItem(gameId: string) {
      patchState(store, {
        items: store.items().filter((item) => item !== gameId),
      });
    },
    clearCart() {
      patchState(store, initialState);
    },
    openCart() {
      patchState(store, {
        isOpen: true,
      });
    },
    closeCart() {
      patchState(store, {
        isOpen: false,
      });
    },
  }))
);
