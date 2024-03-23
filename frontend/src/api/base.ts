export const cacheConfig: { cache: RequestCache } = {
    cache: "no-store",
};

export const nextFetchConfig: { next: NextFetchRequestConfig } = {
    next: {
        revalidate: 0,
    },
};
