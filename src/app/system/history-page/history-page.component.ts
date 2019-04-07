import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Observable, Subscription} from "rxjs";
import {Category} from "../shared/models/category.model";
import {MMEvent} from "../shared/models/event.model";
import * as moment from 'moment';

@Component({
    selector: 'mm-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    categories: Category[] = [];
    events: MMEvent[] = [];
    filteredEvents: MMEvent[] = [];
    isLoaded = false;
    chartData = [];
    sub1: Subscription;
    isFilterVisible = false;

    constructor(private categoriesService: CategoriesService,
                private eventsService: EventsService) {
    }

    ngOnInit() {
        this.sub1 = Observable.combineLatest(
            this.categoriesService.getCategories(),
            this.eventsService.getEvents()
        ).subscribe((data: [Category[], MMEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];
            this.setOriginalEvents();
            this.calculateCharData();
            this.isLoaded = true;
        });
    }

    private setOriginalEvents() {
        this.filteredEvents = this.events.slice();
    }

    calculateCharData(): void {
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome')
            this.chartData.push({
                name: cat.name,
                value: catEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });
    }

    private toggleFilterVisibility(dir: boolean) {
        this.isFilterVisible = dir;
    }

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterApply(filterData  ) {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();

        const stratPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');

        this.filteredEvents = this.filteredEvents
            .filter((e) => {
                return filterData.types.indexOf(e.type) !== -1;
            })
            .filter((e) => {
                return filterData.categories.indexOf(e.category.toString()) !== -1;
            })
            .filter((e) => {
            const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
            return momentDate.isBetween(stratPeriod, endPeriod);
        });
        this.calculateCharData();
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();
        this.calculateCharData();
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

}
