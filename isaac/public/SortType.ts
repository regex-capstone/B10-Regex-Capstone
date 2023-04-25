export enum SortType {
    ALPHABETICAL,
    RECENTLY_CREATED,
    NONE
}

export const parseSortType = (str: string) => {
    if (!str) return SortType.NONE;
    return SortType[str.toUpperCase() as keyof typeof SortType];
}