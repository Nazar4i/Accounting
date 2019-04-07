import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MMEvent} from "../models/event.model";
import {Injectable} from "@angular/core";

@Injectable()
export class EventsService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: MMEvent): Observable<MMEvent> {
        return this.post('events', event);
    }

    getEvents(): Observable<MMEvent[]> {
        return this.get('events');
    }

    getEventById(id: string):Observable<MMEvent> {
        return this.get(`events/${id}`);
    }
}
