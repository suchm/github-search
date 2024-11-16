import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-commits-list',
  standalone: true,
  imports: [],
  templateUrl: './commits-list.component.html',
  styleUrl: './commits-list.component.scss'
})
export class CommitsListComponent {
  @Input() results: any[] = [];
  @Input() page!: number;
  @Input() perPage!: number;
  @Input() limit!: number;
}
