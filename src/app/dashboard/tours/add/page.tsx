import { TourForm } from "./form/TourForm";

export default function AddPage() {
  return (
    <>
      <div className="text-2xl h-20 shadow-md font-semibold pt-4 pb-4 px-4 ml-0.5 bg-white flex  items-center justify-between">
        Tours
      </div>
      <TourForm />
    </>
  );
}
