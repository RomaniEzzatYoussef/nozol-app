import {CategoryType} from "./category-type.model";

export class Category {
    id: string;
    categoryType: CategoryType;
    title: string;
    description: string;
    imageUrl: string;

    constructor(
        id: string,
        categoryType: CategoryType,
        title: string,
        description: string,
        imageUrl: string
    ) {}
}
