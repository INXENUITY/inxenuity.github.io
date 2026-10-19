import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { BriefingModalComponent } from './components/briefing-modal/briefing-modal';
import { BriefingService } from './services/briefing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BriefingModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly briefingService = inject(BriefingService);
}
