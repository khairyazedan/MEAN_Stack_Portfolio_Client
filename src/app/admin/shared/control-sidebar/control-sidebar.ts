import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-control-sidebar',
  styleUrl: './control-sidebar.css',
  templateUrl: './control-sidebar.html',
})
export class ControlSidebar {}
