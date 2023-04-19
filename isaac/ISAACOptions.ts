export interface BaseOptions {
    id?: string;
    single?: boolean;
}

export function cleanOptions(options: BaseOptions) {
    const id = options.id;

    let query = {}

    // Because MongoDB uses '_id' instead of just 'id', we need to do change
    // the property here.
    if (id) {
        delete options.id;

        query = {
            _id: id
        }
    }

    return {
        ...query,
        ...options
    }
}
