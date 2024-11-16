import { Component, Input } from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon
  ],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss'
})
export class ReposListComponent {
  @Input() results: any[] = [];
  @Input() page!: number;
  @Input() perPage!: number;
  @Input() limit!: number;
}
