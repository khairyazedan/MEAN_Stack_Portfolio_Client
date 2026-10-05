import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
 
@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html', 
})
export class Layout{
  
}