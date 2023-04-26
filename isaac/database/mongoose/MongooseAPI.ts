import DatabaseAPI from "../DatabaseInterface";
import connectToDatabase from './MongooseProvider'; 
import { PageModelAPI } from './api/Page';
import { RevisionModelAPI } from './api/Revision';
import { CategoryModelAPI } from './api/Category';
import { UserModelAPI } from './api/User';
import { MetricPageClickAPI } from "./api/MetricPageClick";
import MetricSearchQuery from '../../models/MetricSearchQuery';
import MetricPageFeedback from '../../models/MetricPageFeedback';
import { MetricPageFeedbackAPI } from "./api/MetricPageFeedback";
import { MetricSearchQueryAPI } from "./api/MetricSearchQuery";

try {
    await connectToDatabase();
} catch (err) {
    throw err;
}

/**
 * The database API endpoint for the ISAAC API.
 * The current database is MongoDB using Mongoose.
 * 
 * APIs: isaac/database/mongoose/api/*
 */
const MongooseDatabaseAPI: DatabaseAPI = {
    Page: PageModelAPI,
    Revision: RevisionModelAPI,
    Category: CategoryModelAPI,
    User: UserModelAPI,
    MetricPageClick: MetricPageClickAPI,
    MetricSearchQuery: MetricSearchQueryAPI,
    MetricPageFeedback: MetricPageFeedbackAPI
};

export default MongooseDatabaseAPI;