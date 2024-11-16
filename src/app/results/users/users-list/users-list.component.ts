import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  @Input() results: any[] = [];
  @Input() page!: number;
  @Input() perPage!: number;
  @Input() limit!: number;
}
