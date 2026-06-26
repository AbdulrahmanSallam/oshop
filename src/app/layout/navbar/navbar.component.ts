import {
  Component,
  HostListener,
  inject,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { '(document:click)': 'onDocumentClick($event)' },
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly shoppingCartService = inject(ShoppingCartService);
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);
  private destroy$ = new Subject<void>();

  cart$!: Observable<ShoppingCart | null>;
  appUser: AppUser | null = null;
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isMobileDropdownOpen = false;
  isScrolled = false;
  isDark = false;

  ngOnInit() {
    this.cart$ = this.shoppingCartService.getShoppingCart();
    this.authService.appUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.appUser = user));
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => (this.isDark = theme === 'dark'));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    document.body.style.overflow = '';
  }

  @HostListener('window:scroll') onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
  @HostListener('window:resize') onWindowResize() {
    if (window.innerWidth >= 1024 && this.isMobileMenuOpen)
      this.closeMobileMenu();
  }

  onDocumentClick(event: Event) {
    if (
      this.isDropdownOpen &&
      !this.elementRef.nativeElement.contains(event.target)
    )
      this.isDropdownOpen = false;
    if (
      this.isMobileDropdownOpen &&
      !this.elementRef.nativeElement.contains(event.target)
    )
      this.isMobileDropdownOpen = false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isMobileDropdownOpen = false;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown() {
    this.isDropdownOpen = false;
  }
  toggleMobileDropdown(event: Event) {
    event.stopPropagation();
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
    this.isMobileMenuOpen = false;
  }
  closeMobileDropdown() {
    this.isMobileDropdownOpen = false;
  }
  logout() {
    this.closeMobileMenu();
    this.closeDropdown();
    this.closeMobileDropdown();
    this.authService.logout();
  }
}
