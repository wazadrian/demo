import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'game-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  id = input<string>('');
  image = input<string>('placeholder.png');
  title = input<string>('');
  discount = input<number>(0);
  price = input<number>(0);
  isOwned = input<boolean>(false);
  inCart = input<string[]>([]);
  addToCart = output<void>();
  openCart = output<void>();

  isInCart = computed(() => {
    return this.inCart().some((item) => item === this.id());
  });
}
