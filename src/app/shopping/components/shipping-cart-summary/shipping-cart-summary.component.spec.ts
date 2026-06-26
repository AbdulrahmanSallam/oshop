import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCartSummaryComponent } from './shipping-cart-summary.component';

describe('ShoppingCartSummaryComponent', () => {
  let component: ShippingCartSummaryComponent;
  let fixture: ComponentFixture<ShippingCartSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingCartSummaryComponent],
    });
    fixture = TestBed.createComponent(ShippingCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
