import Link from "next/link";

export default function SectionHeader({ title, subtitle, linkHref, linkLabel = "View All →" }) {
  return (
    <div className="flex justify-between items-end mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>
      {linkHref && (
        <Link href={linkHref} className="text-primary font-semibold text-sm hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}