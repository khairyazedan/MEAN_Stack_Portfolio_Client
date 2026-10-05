import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutEdit } from './about-edit';

describe('AboutEdit', () => {
  let component: AboutEdit;
  let fixture: ComponentFixture<AboutEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
