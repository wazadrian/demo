import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameOfTheWeekComponent } from './game-of-the-week.component';

describe('GameOfTheWeekComponent', () => {
  let component: GameOfTheWeekComponent;
  let fixture: ComponentFixture<GameOfTheWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOfTheWeekComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOfTheWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
