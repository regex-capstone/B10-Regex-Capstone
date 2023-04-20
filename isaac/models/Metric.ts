import MongooseUtil from '../database/mongoose/MongooseUtil';

export default interface Metric {
    created_at?: number;
    major: string;
    standing: string,
    met_page_id?: string;
}