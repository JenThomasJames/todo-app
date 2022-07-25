import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandButtonOutlineComponent } from './brand-button-outline.component';

describe('BrandButtonOutlineComponent', () => {
  let component: BrandButtonOutlineComponent;
  let fixture: ComponentFixture<BrandButtonOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandButtonOutlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandButtonOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
