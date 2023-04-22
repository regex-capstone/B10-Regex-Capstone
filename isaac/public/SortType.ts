export enum SortType {
    ALPHABETICAL,
    RECENTLY_CREATED,
    NONE
}

export const parseSortType = (str: string) => {
    const type = SortType[str.toUpperCase() as keyof typeof SortType];
    return (type === undefined) ? SortType.NONE : type;
}