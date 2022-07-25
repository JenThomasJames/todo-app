import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-button',
  templateUrl: './brand-button.component.html',
  styleUrls: ['./brand-button.component.scss']
})
export class BrandButtonComponent implements OnInit {
  @Input() buttonText: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
