import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topics-list',
  standalone: true,
  imports: [],
  templateUrl: './topics-list.component.html',
  styleUrl: './topics-list.component.scss'
})
export class TopicsListComponent {
  @Input() topics: any[] = [];
  @Input() page!: number;
  @Input() perPage!: number;
}
