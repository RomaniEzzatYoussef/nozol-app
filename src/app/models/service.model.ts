import {Category} from "./category.model";
import {CategoryService} from "../services/category/category.service";

export class Service {
    constructor(
        public id: string,
        public categoryService: CategoryService,
        public title: string,
        public price: string,
        public description: string,
        public imageUrl: string
    ) {
    }
}
