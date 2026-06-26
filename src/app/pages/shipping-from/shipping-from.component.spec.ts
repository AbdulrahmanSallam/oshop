import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFromComponent } from './shipping-from.component';

describe('ShippingFromComponent', () => {
  let component: ShippingFromComponent;
  let fixture: ComponentFixture<ShippingFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingFromComponent]
    });
    fixture = TestBed.createComponent(ShippingFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
