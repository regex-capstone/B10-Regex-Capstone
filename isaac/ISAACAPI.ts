import { 
    PageAPI,
    RevisionAPI, 
    CategoryAPI, 
    UserAPI, 
    SearchAPI, 
    MetricPageClickAPI,
    MetricPageFeedbackAPI,
    MetricSearchQueryAPI
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
    Search: SearchAPI,
    MetricPageClick: MetricPageClickAPI,
    MetricPageFeedback: MetricPageFeedbackAPI,
    MetricSearchQuery: MetricSearchQueryAPI
};
