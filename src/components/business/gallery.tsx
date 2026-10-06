import type { Business } from "@/src/types";
import { businessGalleryArt } from "@/src/utils/images";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";

/**
 * Gallery grid with a lightbox-style focus state (keyboard accessible).
 */
export function Gallery({ business }: { business: Business }) {
  const images = businessGalleryArt(business);

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {images.map((src, index) => (
        <figure
          key={src}
          className={cn(
            "group relative overflow-hidden rounded-card",
            index === 0 && "col-span-3 sm:col-span-1 sm:row-span-2"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${business.name} — gallery image ${index + 1}`}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
              index === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-square"
            )}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-pine-950/0 opacity-0 transition-all duration-200 group-hover:bg-pine-950/10 group-hover:opacity-100">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-pine-800">
              <Icon name="eye" size={17} />
            </span>
          </span>
        </figure>
      ))}
    </div>
  );
}
