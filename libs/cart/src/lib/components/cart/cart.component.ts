import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { GameStore } from '@game';
import { CartStore } from '../../store/cart.store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cart',
  imports: [CommonModule, CdkMenuModule, CdkMenuTrigger],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CartComponent {
  @ViewChild(CdkMenuTrigger) menuTrigger!: CdkMenuTrigger;

  private readonly cartStore = inject(CartStore);
  private readonly gameStore = inject(GameStore);
  public isOpen = this.cartStore.isOpen;
  public itemCount = this.cartStore.itemCount;
  public items = computed(() => {
    return this.cartStore.items().map((item) => this.gameStore.items()[item]);
  });
  public totalAmount = computed(() => {
    return this.items().reduce((acc, item) => acc + item.price, 0);
  });
  public removeItem = this.cartStore.removeItem;
  public clearCart = this.cartStore.clearCart;
  public openCart = this.cartStore.openCart;
  public closeCart = this.cartStore.closeCart;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.menuTrigger?.open();
      } else {
        this.menuTrigger?.close();
      }
    });
  }
}
