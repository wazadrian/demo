import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CartComponent, CartStore } from '@cart';
import { CardComponent, GameStore } from '@game';
import { NavbarComponent } from '@shared';

@Component({
  selector: 'gotw-game-of-the-week',
  imports: [CommonModule, NavbarComponent, CartComponent, CardComponent],
  templateUrl: './game-of-the-week.component.html',
  styleUrl: './game-of-the-week.component.scss',
})
export class GameOfTheWeekComponent {
  private readonly cartStore = inject(CartStore);
  private readonly gameStore = inject(GameStore);
  protected readonly cartItems = this.cartStore.items;
  protected readonly games = computed(() => {
    return Object.values(this.gameStore.items());
  });

  addToCart(gameId: string) {
    this.cartStore.addItem(gameId);
  }

  handleHiddenButtonClick() {
    alert(
      'Congratulations! You found the hidden button!\n\nHere is your promo code: 123456'
    );
  }

  openCart() {
    this.cartStore.openCart();
  }
}
