import { Routes } from '@angular/router';
import { PlatformComponent } from './pages/platform/platform';
import { SolutionsComponent } from './pages/solutions/solutions';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: PlatformComponent, title: 'InXenuity | Multimodal AI Architecture' },
  { path: 'platform', component: PlatformComponent, title: 'InXenuity | Platform Architecture' },
  { path: 'solutions', component: SolutionsComponent, title: 'InXenuity | AI Solutions for Enterprise' },
  { path: 'about', component: AboutComponent, title: 'InXenuity | About Us & Leadership' },
  { path: 'contact', component: ContactComponent, title: 'InXenuity | Start a Technical Conversation' },
  { path: '**', redirectTo: '' }
];
