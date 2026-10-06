import type { Product, Service } from "@/src/types";
import type { Business } from "@/src/types";
import { productArt } from "@/src/utils/images";
import { formatINR } from "@/src/utils/format";
import { Card } from "@/src/components/ui/card";
import { Icon } from "@/src/components/ui/icon";
import { Rating } from "@/src/components/ui/rating";

export function ProductCard({
  business,
  product,
  index,
}: {
  business: Business;
  product: Product;
  index: number;
}) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card
      hover
      className="group flex h-full flex-col overflow-hidden"
    >
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productArt(business, index)}
          alt=""
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink-950/50 text-sm font-semibold text-white">
            Out of stock
          </span>
        )}
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-brass-500 px-2.5 py-0.5 text-[11px] font-bold text-brass-950">
            −{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-pine-800 backdrop-blur-sm">
            <Icon name="sparkles" size={11} />
            Popular
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold text-ink-950">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-600">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-paper-200 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-semibold text-ink-950">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-ink-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
          <Rating value={product.rating} size={12} showValue />
        </div>
      </div>
    </Card>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card hover className="group flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
          <Icon name="timer" size={19} />
        </span>
        <span className="rounded-full bg-paper-100 px-2.5 py-1 text-[11px] font-medium text-ink-600">
          {service.duration}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">
        {service.name}
      </h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-600">
        {service.description}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-paper-200 pt-4">
        <span className="font-display text-lg font-semibold text-ink-950">
          {formatINR(service.price)}
        </span>
        <Rating value={service.rating} size={12} showValue />
      </div>
    </Card>
  );
}
