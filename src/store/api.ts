import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Show } from './models/Show';
import { Tag } from './models/Tag';

export interface Filters {
  statusFilter?: string;
  tagFilters?: string[];
}

export interface NormalizedTags {
  [key: string]: string;
}

interface URIEncodedFilters {
  statusFilter?: string;
  tagFilters?: string;
}

export interface UpdateShowFieldDTO {
  id: string;
  field: string;
  updatedValue: string | number;
}

// TODO: Replace userId with authenticated user
const userId = 'dummy-user-id';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://p231zv4mxb.execute-api.us-east-1.amazonaws.com/dev/',
  }),
  tagTypes: ['SHOW', 'TAG'],
  endpoints: (builder) => ({
    // Shows
    getAllShows: builder.query<Show[], Filters>({
      query: (filters: Filters) => {
        const { statusFilter, tagFilters } = filters;
        const queryObj: { url: string; params?: URIEncodedFilters } = {
          url: `${userId}/shows`,
        };

        if (statusFilter || tagFilters) {
          queryObj.params = {};

          if (statusFilter) {
            queryObj.params = { statusFilter };
          }

          if (
            tagFilters &&
            tagFilters.length > 0 &&
            Array.isArray(tagFilters)
          ) {
            const encodedTagFilters = encodeURIComponent(
              JSON.stringify(tagFilters)
            );

            if (statusFilter) {
              queryObj.params = {
                ...queryObj.params,
                tagFilters: encodedTagFilters,
              };
            }
          }
        }

        return queryObj;
      },
      providesTags: ['SHOW'],
    }),
    addShow: builder.mutation<string, Omit<Show, 'id'>>({
      query: (show) => ({
        url: `${userId}/shows`,
        method: 'POST',
        body: show,
      }),
      invalidatesTags: ['SHOW'],
    }),
    updateShow: builder.mutation<Omit<Show, 'id'>, Show>({
      query: ({ id, ...show }) => ({
        url: `${userId}/shows/${id}`,
        method: 'PUT',
        body: show,
      }),
      invalidatesTags: ['SHOW'],
    }),
    updateShowField: builder.mutation<void, UpdateShowFieldDTO>({
      query: ({ id, ...payload }) => ({
        url: `${userId}/shows/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['SHOW'],
    }),
    deleteShows: builder.mutation<void, string | string[]>({
      query: (ids) => {
        if (Array.isArray(ids)) {
          return {
            url: `${userId}/shows/delete`,
            method: 'POST',
            body: ids,
          };
        } else {
          return {
            url: `${userId}/shows/${ids}`,
            method: 'DELETE',
          };
        }
      },
      invalidatesTags: ['SHOW'],
    }),

    // Tags
    getAllTags: builder.query<Tag[], void>({
      query: () => ({
        url: `${userId}/tags`,
      }),
      // transformResponse: (res: Tag[]) => {
      //   const normalizedTags = {} as NormalizedTags;

      //   res.forEach((tag) => {
      //     normalizedTags[tag.id] = tag.name;
      //   });

      //   return normalizedTags;
      // },
      providesTags: ['TAG'],
    }),
    addTag: builder.mutation<Tag, string>({
      query: (tag) => ({
        url: `${userId}/tags`,
        method: 'POST',
        body: {tag},
      }),
      invalidatesTags: ['TAG'],
    }),
  }),
});

export const {
  useGetAllShowsQuery,
  useGetAllTagsQuery,
  useAddShowMutation,
  useUpdateShowMutation,
  useUpdateShowFieldMutation,
  useDeleteShowsMutation,
  useAddTagMutation,
} = api;

export default api;

// Selectors
const selectTagsResult = api.endpoints.getAllTags.select();

export const selectAllTags = createSelector(selectTagsResult, tagsResult => tagsResult?.data ?? []);

