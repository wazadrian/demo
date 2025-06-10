# Gog demo app

- install: `npm install`
- run: `nx serve gog` -> http://localhost:4200/
- ssr `npx nx build gog` `npx nx serve-static gog`
- e2e: `nx e2e gog-e2e`
- jest: `nx run-many -t test -p cart game gog`

- vercel deployment: https://demo-blush-one.vercel.app/

# Summary

## Cart Features

- Cart icon with item counter
  - Uses itemCount() computed signal to show real-time count
  - Updates automatically when items are added/removed
  - Styled with hover effects and active states
- Dropdown functionality
  - Uses Angular CDK Menu for dropdown behavior
  - "CLEAR CART" button triggers clearCart() method
  - Remove option appears on hover for each item
  - Shows total amount and item count in header

## Product Features

- Add to cart functionality
  - Price button triggers addToCart event
  - Prevents duplicate items through addItem method check
  - Updates UI immediately through signal state
- "IN CART" status
  - Uses isInCart computed property
  - Changes button to "IN CART" when product is added
  - Clicking "IN CART" opens cart dropdown

## Technical Implementation

- State Management
  - Uses @ngrx/signals for reactive state
  - CartStore handles all cart operations
  - Persistent storage with @larscom/ngrx-signals-storage
- Testing
  - Unit tests with jest
  - "e2e" tests with cypress
