import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-notfound',
  styleUrl: './notfound.css',
  templateUrl: './notfound.html', 
})
export class Notfound {
  links = [
    { label: 'Home', path: '/home' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Articles', path: '/articles' },
    { label: 'Contact', path: '/contact' },
  ];
}
