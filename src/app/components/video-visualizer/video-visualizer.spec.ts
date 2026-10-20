import { TestBed } from '@angular/core/testing';
import { VideoVisualizerComponent } from './video-visualizer';

describe('VideoVisualizerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoVisualizerComponent]
    }).compileComponents();
  });

  it('should create the video visualizer component', () => {
    const fixture = TestBed.createComponent(VideoVisualizerComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should toggle play state', () => {
    const fixture = TestBed.createComponent(VideoVisualizerComponent);
    const comp = fixture.componentInstance;
    expect(comp.isPlaying()).toBe(true);
    comp.togglePlay();
    expect(comp.isPlaying()).toBe(false);
    comp.togglePlay();
    expect(comp.isPlaying()).toBe(true);
  });

  it('should update visualizer mode', () => {
    const fixture = TestBed.createComponent(VideoVisualizerComponent);
    const comp = fixture.componentInstance;
    comp.setMode('robotics');
    expect(comp.mode).toBe('robotics');
    expect(comp.getModeLabel()).toBe('ROBOTICS PERCEPTION // 8W TDP');
  });
});
