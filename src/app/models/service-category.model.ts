import {Category} from "./category.model";

export class ServiceCategory {
    constructor(
        public id: string,
        public category: Category,
        public title: string,
        public description: string,
        public imageUrl: string
    ) {
    }
}
