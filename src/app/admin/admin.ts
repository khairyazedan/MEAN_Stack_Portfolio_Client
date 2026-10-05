import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlSidebar } from './shared/control-sidebar/control-sidebar';

@Component({ 
  imports: [RouterOutlet, ControlSidebar],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {} 
