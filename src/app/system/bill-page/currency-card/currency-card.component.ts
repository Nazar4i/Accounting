import {Component, Input} from '@angular/core';
import {Currency} from "../bill-page.component";

@Component({
    selector: 'mm-currency-card',
    templateUrl: './currency-card.component.html',
    styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {

    @Input() currency: Currency[];
    date: Date = new Date();
    // currencies: string[] = ['USD', 'EUR', 'RUR'];

}
