import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {Observable, Subscription} from "rxjs/rx";
import {Bill} from "../shared/models/bill.model";

export class Currency {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
}

@Component({
    selector: 'mm-bill-page',
    templateUrl: './bill-page.component.html',
    styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

    sub1: Subscription;
    sub2: Subscription;
    currency: Currency[] = [];
    bill: Bill;
    isLoaded = false;


    constructor(private billService: BillService) {
    }

    ngOnInit() {
        this.sub1 = Observable.combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency()
        ).subscribe((data: [Bill, any]) => {
            this.bill = data[0];
            this.currency = data[1];
            this.isLoaded = true;
        });
    }

    onRefresh() {
        this.isLoaded = false;
        this.sub2 = this.billService.getCurrency()
            .subscribe((currency: Currency[]) => {
                this.currency = currency;
                this.isLoaded = true;
            });
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
        if (this.sub2) {
            this.sub2.unsubscribe();
        }
    }

}
