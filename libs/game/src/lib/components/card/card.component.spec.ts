import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

@Component({
  template: `
    <game-card
      [id]="id"
      [image]="image"
      [title]="title"
      [discount]="discount"
      [price]="price"
      [isOwned]="isOwned"
      [inCart]="inCart"
      (addToCart)="onAddToCart()"
      (openCart)="onOpenCart()"
    ></game-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
class TestHostComponent {
  id = 'test-id';
  image = 'test-image.jpg';
  title = 'Test Game';
  discount = 20;
  price = 29.99;
  isOwned = false;
  inCart: string[] = [];
  onAddToCart = jest.fn();
  onOpenCart = jest.fn();
}

describe('CardComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let component: CardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostFixture.debugElement.query(
      By.directive(CardComponent)
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.image()).toBe('placeholder.png');
    expect(component.discount()).toBe(0);
    expect(component.price()).toBe(0);
    expect(component.isOwned()).toBe(false);
    expect(component.inCart()).toEqual([]);
  });

  it('should compute isInCart correctly', () => {
    hostComponent.inCart = ['other-id'];
    hostFixture.detectChanges();
    expect(component.isInCart()).toBe(false);

    hostComponent.inCart = ['test-id'];
    hostFixture.detectChanges();
    expect(component.isInCart()).toBe(true);
  });

  it('should emit addToCart event', () => {
    hostFixture.detectChanges();

    const buyButton = hostFixture.debugElement.query(By.css('.card__buy'));
    buyButton.triggerEventHandler('click');

    expect(hostComponent.onAddToCart).toHaveBeenCalled();
  });

  it('should emit openCart event', () => {
    hostComponent.inCart = ['test-id'];
    hostFixture.detectChanges();

    const inCartButton = hostFixture.debugElement.query(
      By.css('.card__in-cart')
    );
    inCartButton.triggerEventHandler('click');

    expect(hostComponent.onOpenCart).toHaveBeenCalled();
  });

  it('should show owned status when isOwned is true', () => {
    hostComponent.isOwned = true;
    hostFixture.detectChanges();

    const ownedElement = hostFixture.debugElement.query(By.css('.card__owned'));
    expect(ownedElement).toBeTruthy();
    expect(ownedElement.nativeElement.textContent.trim()).toBe('OWNED');
  });

  it('should show in cart button when item is in cart', () => {
    hostComponent.inCart = ['test-id'];
    hostFixture.detectChanges();

    const inCartButton = hostFixture.debugElement.query(
      By.css('.card__in-cart')
    );
    expect(inCartButton).toBeTruthy();
    expect(inCartButton.nativeElement.textContent.trim()).toBe('IN CART');
  });

  it('should show buy button when item is not owned and not in cart', () => {
    hostFixture.detectChanges();

    const buyButton = hostFixture.debugElement.query(By.css('.card__buy'));
    expect(buyButton).toBeTruthy();
    expect(buyButton.nativeElement.textContent.trim()).toBe('$29.99');
  });

  it('should have proper accessibility attributes', () => {
    hostFixture.detectChanges();

    const card = hostFixture.debugElement.query(By.css('.card'));
    expect(card.nativeElement.getAttribute('role')).toBe('article');

    const image = hostFixture.debugElement.query(By.css('.card__image'));
    expect(image.nativeElement.getAttribute('alt')).toBe('Test Game');
    expect(image.nativeElement.getAttribute('loading')).toBe('lazy');

    const discountElement = hostFixture.debugElement.query(
      By.css('.card__discount')
    );
    expect(discountElement.nativeElement.getAttribute('aria-label')).toBe(
      '20% discount'
    );

    const buyButton = hostFixture.debugElement.query(By.css('.card__buy'));
    expect(buyButton.nativeElement.getAttribute('aria-label')).toBe(
      'Add Test Game to cart for $29.99'
    );
  });

  it('should use OnPush change detection strategy', () => {
    expect(hostFixture.componentRef.changeDetectorRef.detach).toBeDefined();
  });
});
