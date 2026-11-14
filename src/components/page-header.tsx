import Link from "next/link";
import React from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  children,
}: PageHeaderProps) {
  return (
    <header className="pt-20 pb-10 border-b border-[#4a4845] bg-gradient-to-b from-[#6898a8]/5 to-transparent w-full">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 font-['Cinzel'] text-[9px] tracking-[0.18em] uppercase text-[#9a8c7e] hover:text-[#b8b098] transition-colors mb-3"
            >
              <i className="fa-solid fa-chevron-left text-[8px]"></i> {backLabel}
            </Link>
          )}
          <h1 className="font-['Cinzel_Decorative',serif] text-3xl sm:text-5xl font-bold text-[#ddd4b0] leading-tight mb-2 tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="font-['Cinzel'] text-sm tracking-[0.08em] text-[#b09888] m-0">
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className="flex items-center gap-2.5 shrink-0 sm:pb-1">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
