import { CdkMenuModule } from '@angular/cdk/menu';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameStore } from '@game';
import { CartStore } from '../../store/cart.store';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartStore: InstanceType<typeof CartStore>;

  const mockGames = {
    '1': { id: '1', title: 'Game 1', price: 29.99 },
    '2': { id: '2', title: 'Game 2', price: 39.99 },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, CdkMenuModule],
      providers: [
        {
          provide: GameStore,
          useValue: {
            items: signal(mockGames),
            loading: signal(false),
            error: signal(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartStore = TestBed.inject(CartStore);

    cartStore.openCart();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message when no items', () => {
    expect(component.items().length).toBe(0);
  });

  it('should display items when cart has products', () => {
    cartStore.addItem('1');
    cartStore.addItem('2');
    fixture.detectChanges();
    expect(component.items().length).toBe(2);
  });

  it('should calculate total amount correctly', () => {
    cartStore.addItem('1');
    cartStore.addItem('2');
    fixture.detectChanges();
    expect(component.totalAmount()).toBe(69.98);
  });

  it('should remove item when remove button is clicked', () => {
    cartStore.addItem('1');
    cartStore.addItem('2');
    fixture.detectChanges();
    cartStore.removeItem('1');
    fixture.detectChanges();
    expect(component.items().length).toBe(1);
    expect(component.items()[0].id).toBe('2');
  });

  it('should clear cart when clear button is clicked', () => {
    cartStore.addItem('1');
    cartStore.addItem('2');
    fixture.detectChanges();
    cartStore.clearCart();
    fixture.detectChanges();
    expect(component.items().length).toBe(0);
  });

  it('should toggle cart menu when openCart/closeCart is called', () => {
    cartStore.openCart();
    fixture.detectChanges();
    expect(cartStore.isOpen()).toBeTruthy();

    cartStore.closeCart();
    fixture.detectChanges();
    expect(cartStore.isOpen()).toBeFalsy();
  });

  it('should display correct item count', () => {
    cartStore.addItem('1');
    cartStore.addItem('2');
    fixture.detectChanges();
    expect(component.itemCount()).toBe(2);
  });
});
