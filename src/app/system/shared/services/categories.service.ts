import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category.model";
import {Injectable} from "@angular/core";

@Injectable()
export class CategoriesService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    addCategory(category: Category): Observable<Category> {
        return this.post('categories', category);
    }

    getCategories(): Observable<Category[]> {
        return this.get('categories');
    }

    updateCategory(category: Category): Observable<Category> {
        return this.put(`categories/${category.id}`, category);
    }

    getCategoryById(id: number):Observable<Category> {
        return this.get(`categories/${id}`);
    }
}
