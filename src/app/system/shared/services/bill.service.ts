import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/rx";
import {Bill} from "../models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";

@Injectable()
export class BillService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency() {
        return this.http.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`);
    }
}
