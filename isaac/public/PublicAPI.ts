import CategoryPublicAPIInterface, { CategoryPublicAPI } from "./api/Category";
import MetricPublicAPIInterface, { MetricPublicAPI } from "./api/Metric";
import PagePublicAPIInterface, { PagePublicAPI } from "./api/Page";
import RevisionPublicAPIInterface, { RevisionPublicAPI } from "./api/Revision";
import SearchPublicAPIInterface, { SearchPublicAPI } from "./api/Search";
import UserPublicAPIInterface, { UserPublicAPI } from "./api/User";

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
    Metric: MetricPublicAPIInterface
}

const PublicAPIEndpoint: PublicAPIInterface = {
    Page: PagePublicAPI,
    Category: CategoryPublicAPI,
    Revision: RevisionPublicAPI,
    Search: SearchPublicAPI,
    User: UserPublicAPI,
    Metric: MetricPublicAPI
}

export default PublicAPIEndpoint;

export enum SortType {
    ALPHABETICAL,
    RECENTLY_CREATED,
    NONE
}
