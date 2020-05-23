import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @Input() cerContent: string;

  constructor() {}

  ngOnInit(): void {}
}
