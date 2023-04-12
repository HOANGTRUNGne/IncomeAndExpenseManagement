import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useMemo } from 'react';
import { Filters } from '~/models';

interface QueryParams<T> extends Record<string, any> {}

export function useQueryParams<TQueryParams extends QueryParams<TQueryParams>>() {
    const router = useRouter();

    const setQueryParams = (filters: Filters) => {
        router.push({
            pathname: router.pathname,
            search: `?${queryString.stringify(filters)}`,
        });
    };

    const queryParams = useMemo(() => {
        const params = queryString.parse(router.asPath.split(/\?/)[1]);
        return {
            ...params,
        } as TQueryParams;
    }, [router.asPath]);

    return { queryParams, setQueryParams };
}
