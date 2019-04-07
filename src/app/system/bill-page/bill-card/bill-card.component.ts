import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";
import {Currency} from "../bill-page.component";

@Component({
    selector: 'mm-bill-card',
    templateUrl: './bill-card.component.html',
    styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

    @Input() bill: Bill;
    @Input() currency: Currency[];

    dollar: number;
    euro: number;
    rubl: number;

    constructor() {
    }

    ngOnInit() {
        for (let i = 0; i < this.currency.length; i++) {
            console.log(this.currency[i]);
            if (this.currency[i].ccy === 'USD') {
                this.dollar = this.bill.value / +this.currency[i].buy;
            }
            if (this.currency[i].ccy === 'EUR') {
                this.euro = this.bill.value / +this.currency[i].buy;
            }
            if (this.currency[i].ccy === 'RUR') {
                this.rubl = this.bill.value / +this.currency[i].buy;
            }
        }
    }

}
