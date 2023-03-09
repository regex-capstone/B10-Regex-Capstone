import { TfIdf } from "natural";
import { Page } from "../models";

export default interface Search {
    search(query: string, pages: Page[]): Page[]
}