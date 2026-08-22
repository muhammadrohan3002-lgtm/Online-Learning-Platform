export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <span className="loading loading-bars loading-lg text-primary"></span>
      <p className="text-sm font-semibold tracking-wide text-gray-500">Loading SkillSphere...</p>
    </div>
  );
}