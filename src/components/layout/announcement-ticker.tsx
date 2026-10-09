import Link from "next/link";
import type { Announcement } from "@/src/types";

/** Continuous public announcement strip; data is supplied by the read service. */
export function AnnouncementTicker({ items }: { items: Announcement[] }) {
  if (items.length === 0) return null;

  return (
    <div className="announcement-ticker" role="region" aria-label="Announcements">
      <span className="announcement-ticker__label" aria-hidden="true">
        Updates
      </span>
      <div className="announcement-ticker__viewport">
        <div className="announcement-track">
          {[false, true].map((isDuplicate) => (
            <div
              key={isDuplicate ? "duplicate" : "primary"}
              className={`announcement-group${isDuplicate ? " announcement-group--duplicate" : ""}`}
              aria-hidden={isDuplicate || undefined}
            >
              {items.map((item) => (
                <span className="announcement-item" key={item.id}>
                  <span className="announcement-item__dot" aria-hidden="true" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      tabIndex={isDuplicate ? -1 : undefined}
                      className="announcement-item__link"
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
