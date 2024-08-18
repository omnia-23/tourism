export default function Loading() {
  return (
    <div className="fixed top-0 left-52 w-[calc(100%-13rem)] h-full z-50 bg-white opacity-30 overflow-hidden grid place-items-center text-5xl font-serif">
      <div className="animate-spin size-40 border-4 border-slate-100 border-t-primary rounded-full" />
    </div>
  );
}
