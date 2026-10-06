import type { Review } from "@/src/types";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Rating } from "@/src/components/ui/rating";
import { formatDate } from "@/src/utils/format";
import { Card } from "@/src/components/ui/card";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card variant="outlined" className="flex flex-col p-5">
      <div className="flex items-center gap-3">
        <Avatar name={review.authorName} size={40} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ink-900">
              {review.authorName}
            </span>
            {review.verified && (
              <Badge variant="success" size="sm">
                Verified visit
              </Badge>
            )}
          </div>
          <p className="text-xs text-ink-500">
            {review.authorRole === "student" ? "GGDSD student" : review.authorRole === "faculty" ? "Faculty" : review.authorRole === "alumni" ? "GGDSD alumnus/a" : "Campus visitor"} · {formatDate(review.date)}
          </p>
        </div>
        <Rating value={review.rating} size={14} />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-ink-900">
        {review.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
        {review.content}
      </p>
    </Card>
  );
}

/** Rating breakdown with bars, used on profile pages. */
export function ReviewSummary({
  rating,
  reviewCount,
  reviews,
}: {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}) {
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, percent: reviews.length ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <div className="rounded-card border border-paper-200 bg-white p-6">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <span className="font-display text-5xl font-semibold text-ink-950 tabular-nums">
            {rating.toFixed(1)}
          </span>
          <div className="mt-1 flex justify-center">
            <Rating value={rating} size={16} />
          </div>
          <p className="mt-1.5 text-xs text-ink-500">
            {reviewCount} reviews
          </p>
        </div>
        <dl className="flex-1 space-y-2">
          {distribution.map(({ stars, percent }) => (
            <div key={stars} className="flex items-center gap-3">
              <dt className="w-6 text-right text-xs font-medium text-ink-600">
                {stars}★
              </dt>
              <dd className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full bg-brass-500"
                  style={{ width: `${percent}%` }}
                />
              </dd>
              <span className="w-8 text-xs tabular-nums text-ink-500">
                {Math.round(percent)}%
              </span>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
