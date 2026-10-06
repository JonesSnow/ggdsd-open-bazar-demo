import type { Business, Category } from "@/src/types";

/**
 * Artwork is generated into /public/images/art. Every category has six
 * variants; businesses and products map deterministically onto them.
 */
export const artPath = (slug: string, variant: number): string =>
  `/images/art/${slug}-${variant % 6}.svg`;

export const categoryArt = (category: Category, variant = 0): string =>
  artPath(category.artSlug, variant);

export const businessCoverArt = (business: Business): string => {
  const [primaryCategoryId] = business.categoryIds;
  const slug = primaryCategoryId?.replace("cat-", "") ?? "technology";
  return artPath(slug, business.artVariant);
};

export const businessGalleryArt = (business: Business): string[] => {
  const [primaryCategoryId] = business.categoryIds;
  const slug = primaryCategoryId?.replace("cat-", "") ?? "technology";
  return [1, 2, 3].map((offset) =>
    artPath(slug, business.artVariant + offset)
  );
};

export const productArt = (business: Business, productIndex: number): string => {
  const [primaryCategoryId] = business.categoryIds;
  const slug = primaryCategoryId?.replace("cat-", "") ?? "technology";
  return artPath(slug, business.artVariant + productIndex + 1);
};

export const categoryTileArt = (category: Category): string =>
  artPath(category.artSlug, 0);
