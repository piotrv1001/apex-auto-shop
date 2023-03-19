import { MinMax } from './../../model/types/min-max';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-price-slider',
  templateUrl: './price.slider.component.html',
  styleUrls: ['./price-slider.component.scss']
})
export class PriceSliderComponent implements OnInit {

  @Input() min: number = 50;
  @Input() max: number = 10000;
  @Input() minLabel: string = 'Min price';
  @Input() maxLabel: string = 'Max price';
  @Input() btnLabel: string = 'Apply';
  @Output() applyBtnClick: EventEmitter<MinMax> = new EventEmitter<MinMax>();

  minVal: number = 50;
  maxVal: number = 10000;

  ngOnInit(): void {
    const diff = this.max - this.min;
    this.minVal = this.min + 0.2 * diff;
    this.maxVal = this.max - 0.2 * diff;
  }

  applyBtnClicked(): void {
    this.applyBtnClick.emit({ min: this.minVal, max: this.maxVal });
  }

}
