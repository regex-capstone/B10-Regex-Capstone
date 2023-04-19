import { PageAPI } from './api/Page';
import { RevisionAPI } from './api/Revision';
import { CategoryAPI } from './api/Category';
import { UserAPI } from './api/User';
import { MetricAPI } from './api/Metric';
import { SearchAPI } from './api/Search';

/**
 * This is the logic interface for the ISAAC API.
 * 
 * APIs: isaac/api/*
 */
export default {
    Page: PageAPI,
    Revision: RevisionAPI,
    Category: CategoryAPI,
    User: UserAPI,
    Metric: MetricAPI,
    Search: SearchAPI
};
