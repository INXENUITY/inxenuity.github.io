import { TestBed } from '@angular/core/testing';
import { HeroBackgroundVisualizerComponent } from './hero-background-visualizer';

describe('HeroBackgroundVisualizerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBackgroundVisualizerComponent]
    }).compileComponents();
  });

  it('should create the hero background visualizer component', () => {
    const fixture = TestBed.createComponent(HeroBackgroundVisualizerComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
