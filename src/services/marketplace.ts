import type { Announcement, Business, Category, Location } from "@/src/types";
import { announcements } from "@/src/data/site";
import {
  getBusinessById,
  getBusinessBySlug,
  getBusinessesByCategory,
  getPublicBusinesses,
  getRelatedBusinesses,
} from "@/src/data/businesses";
import {
  getCategoryById,
  getCategoryBySlug,
  getAllCategories,
} from "@/src/data/categories";
import { getLocationById } from "@/src/data/locations";

/**
 * Read-only boundary for public marketplace data.
 *
 * Route components depend on this async contract rather than on the mock
 * arrays. A future server/API adapter can replace the demo service without
 * changing page composition or the listing cards.
 */
export interface MarketplaceReader {
  listAnnouncements(): Promise<Announcement[]>;
  listPublicBusinesses(): Promise<Business[]>;
  getBusinessBySlug(slug: string): Promise<Business | undefined>;
  getBusinessById(id: string): Promise<Business | undefined>;
  listBusinessesByCategory(categoryId: string): Promise<Business[]>;
  listCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getRelatedBusinesses(
    business: Business,
    limit?: number
  ): Promise<Business[]>;
  getLocationById(id: string): Promise<Location | undefined>;
}

export const demoMarketplaceService: MarketplaceReader = {
  /** Public, ordered demo records; future admin writes stay server-authorized. */
  async listAnnouncements() {
    return announcements;
  },
  async listPublicBusinesses() {
    return getPublicBusinesses();
  },
  async getBusinessBySlug(slug) {
    return getBusinessBySlug(slug);
  },
  async getBusinessById(id) {
    return getBusinessById(id);
  },
  async listBusinessesByCategory(categoryId) {
    return getBusinessesByCategory(categoryId);
  },
  async listCategories() {
    return getAllCategories();
  },
  async getCategoryBySlug(slug) {
    return getCategoryBySlug(slug);
  },
  async getCategoryById(id) {
    return getCategoryById(id);
  },
  async getRelatedBusinesses(business, limit = 4) {
    return getRelatedBusinesses(business, limit);
  },
  async getLocationById(id) {
    return getLocationById(id);
  },
};

/** Selected implementation; replace this adapter when a real service exists. */
export const marketplaceService: MarketplaceReader = demoMarketplaceService;
