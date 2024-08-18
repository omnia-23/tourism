export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-white overflow-hidden grid place-items-center text-5xl font-serif">
      <div className="animate-spin size-40 border-4 border-slate-100 border-t-primary rounded-full" />
    </div>
  );
}
