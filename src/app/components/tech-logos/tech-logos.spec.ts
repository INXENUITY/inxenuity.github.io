import { TestBed } from '@angular/core/testing';
import { TechLogosComponent } from './tech-logos';

describe('TechLogosComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechLogosComponent]
    }).compileComponents();
  });

  it('should create the tech logos component', () => {
    const fixture = TestBed.createComponent(TechLogosComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should default to ribbon mode', () => {
    const fixture = TestBed.createComponent(TechLogosComponent);
    const comp = fixture.componentInstance;
    expect(comp.mode).toBe('ribbon');
  });

  it('should allow grid mode', () => {
    const fixture = TestBed.createComponent(TechLogosComponent);
    const comp = fixture.componentInstance;
    comp.mode = 'grid';
    expect(comp.mode).toBe('grid');
  });
});
