import CategoryPublicAPIInterface, { CategoryPublicAPI } from "./api/Category";
import MetricPageClickPublicAPIInterface, { MetricPageClickPublicAPI } from "./api/MetricPageClick";
import PagePublicAPIInterface, { PagePublicAPI } from "./api/Page";
import RevisionPublicAPIInterface, { RevisionPublicAPI } from "./api/Revision";
import SearchPublicAPIInterface, { SearchPublicAPI } from "./api/Search";
import UserPublicAPIInterface, { UserPublicAPI } from "./api/User";
import MetricPageFeedbackPublicAPIInterface, { MetricPageFeedbackPublicAPI } from './api/MetricPageFeedback';
import MetricSearchQueryPublicAPIInterface, { MetricSearchQueryPublicAPI } from "./api/MetricSearchQuery";

/**
 * The public API endpoint for the ISAAC API.
 * ALL requests and responses to/from the ISAAC API should go through this endpoint.
 * 
 * APIs: isaac/public/api/*
 */
interface PublicAPIInterface {
    Page: PagePublicAPIInterface,
    Category: CategoryPublicAPIInterface,
    Revision: RevisionPublicAPIInterface,
    Search: SearchPublicAPIInterface,
    User: UserPublicAPIInterface,
    MetricPageClick: MetricPageClickPublicAPIInterface,
    MetricPageFeedback: MetricPageFeedbackPublicAPIInterface,
    MetricSearchQuery: MetricSearchQueryPublicAPIInterface
}

const PublicAPIEndpoint: PublicAPIInterface = {
    Page: PagePublicAPI,
    Category: CategoryPublicAPI,
    Revision: RevisionPublicAPI,
    Search: SearchPublicAPI,
    User: UserPublicAPI,
    MetricPageClick: MetricPageClickPublicAPI,
    MetricPageFeedback: MetricPageFeedbackPublicAPI,
    MetricSearchQuery: MetricSearchQueryPublicAPI
}

export default PublicAPIEndpoint;
