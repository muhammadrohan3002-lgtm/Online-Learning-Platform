import Link from "next/link";

export default function HeroSlide({ slide }) {
  if (!slide) return null;

  return (
    <div className="relative w-full h-full min-h-[340px] md:min-h-[380px] flex flex-col justify-center items-start p-8 md:p-14 bg-gradient-to-br from-neutral via-neutral to-neutral/90 text-neutral-content rounded-2xl overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl flex flex-col items-start gap-4">
        {slide.badge && (
          <span className="badge badge-primary badge-outline font-semibold tracking-wide px-3 py-3 text-xs uppercase">
            {slide.badge}
          </span>
        )}

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          {slide.title}
        </h1>

        <p className="text-sm sm:text-base text-neutral-content/80 leading-relaxed max-w-lg">
          {slide.description}
        </p>

        {slide.buttonText && (
          <Link
            href={slide.link || "/courses"}
            className="btn btn-primary btn-md mt-2 shadow-md hover:shadow-primary/30 transition-all font-semibold"
          >
            {slide.buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
