import Link from "next/link";

export interface SessionEntryProps {
  title: string;
  sessionNumber: number;
  date: string | Date;
  summary?: string;
  partyPresent?: string[];
  href?: string;
}

export default function SessionEntry({
  title,
  sessionNumber,
  date,
  summary,
  partyPresent = [],
  href = "/campaigns",
}: SessionEntryProps) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <Link
      href={href}
      className="group flex items-start gap-4 sm:gap-6 p-5 sm:px-6 bg-[#302e2c] border-b border-[#4a4845] transition-colors hover:bg-[#3a3836] last:border-b-0"
    >
      {/* Session Number */}
      <div className="shrink-0 w-10 sm:w-12 text-center pt-0.5">
        <span className="font-['Cinzel_Decorative',serif] text-xl sm:text-2xl text-[#807868] leading-none">
          {String(sessionNumber).padStart(2, "0")}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-['Cinzel'] text-sm sm:text-base font-semibold text-[#b8b098] tracking-wide mb-1 group-hover:text-[#ddd4b0] transition-colors m-0">
          {title}
        </h3>

        {summary && (
          <p className="italic text-sm sm:text-[15px] text-[#b09888] leading-relaxed mb-2 font-serif">
            {summary}
          </p>
        )}

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap font-['Cinzel'] text-[9px] tracking-[0.1em] uppercase text-[#9a8c7e]">
          <span className="flex items-center gap-1.5">
            <i className="fa-regular fa-calendar text-[#6898a8]"></i>
            {formattedDate}
          </span>
          {partyPresent.length > 0 && (
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-users text-[#6898a8]"></i>
              {partyPresent.join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Trailing Arrow */}
      <div className="shrink-0 text-[#9a8c7e] text-xs pt-1.5 group-hover:text-[#b8b098] transition-colors">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </Link>
  );
}
