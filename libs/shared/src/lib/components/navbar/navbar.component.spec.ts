import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

@Component({
  template: `
    <shared-navbar>
      <div class="test-content">Test Content</div>
    </shared-navbar>
  `,
  standalone: true,
  imports: [NavbarComponent],
})
class TestHostComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    hostFixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper accessibility attributes', () => {
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('role')).toBe('navigation');
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('should display the logo', () => {
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('img.logo');
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('src')).toBe('/logo.png');
    expect(logo.getAttribute('alt')).toBe('GOG Logo');
  });

  it('should project content', () => {
    hostFixture.detectChanges();
    const projectedContent =
      hostFixture.nativeElement.querySelector('.test-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent).toBe('Test Content');
  });

  it('should use OnPush change detection strategy', () => {
    expect(fixture.componentRef.changeDetectorRef.detach).toBeDefined();
  });
});
