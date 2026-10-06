import type { Business, SearchFilters, SortKey } from "@/src/types";
import { getLocationById } from "@/src/data/locations";
import { getOpenStatus } from "@/src/utils/hours";
import { searchBusinesses } from "@/src/data/businesses";

export function applyFilters(
  list: Business[],
  filters: SearchFilters
): Business[] {
  let result = list;

  if (filters.query && filters.query.trim()) {
    result = searchBusinesses(filters.query, result);
  }

  if (filters.categoryIds && filters.categoryIds.length > 0) {
    result = result.filter((business) =>
      business.categoryIds.some((categoryId) =>
        filters.categoryIds!.includes(categoryId)
      )
    );
  }

  if (filters.types && filters.types.length > 0) {
    result = result.filter((business) => filters.types!.includes(business.type));
  }

  if (filters.minRating && filters.minRating > 0) {
    result = result.filter((business) => business.rating >= filters.minRating!);
  }

  if (filters.locationId) {
    result = result.filter(
      (business) => business.locationId === filters.locationId
    );
  }

  if (filters.verifiedOnly) {
    result = result.filter((business) => business.verified);
  }

  if (filters.openNow) {
    result = result.filter((business) => {
      const location = getLocationById(business.locationId);
      return location ? getOpenStatus(location).open : false;
    });
  }

  return result;
}

export function sortBusinesses(list: Business[], sort: SortKey): Business[] {
  const sorted = [...list];
  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "reviews":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "oldest":
      return sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    default:
      return sorted;
  }
}

export function countActiveFilters(filters: SearchFilters): number {
  let count = 0;
  if (filters.categoryIds?.length) count += filters.categoryIds.length;
  if (filters.types?.length) count += filters.types.length;
  if (filters.minRating && filters.minRating > 0) count += 1;
  if (filters.locationId) count += 1;
  if (filters.verifiedOnly) count += 1;
  if (filters.openNow) count += 1;
  return count;
}

export const DEFAULT_FILTERS: SearchFilters = {};
