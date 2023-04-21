import { 
    PageAPI,
    RevisionAPI, 
    CategoryAPI, 
    UserAPI, 
    MetricAPI, 
    SearchAPI, 
    MetricPageClickAPI 
} from "./api";


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
    Search: SearchAPI,
    MetricPageClick: MetricPageClickAPI
};
