import { getSingleTour } from "@/lib/actions/tour.actions";
import { SingleTourButtons } from "./_components/SingleTourButtons";
import Image from "next/image";

export default async function SingleTourPage({
  params: { tourId },
}: {
  params: { tourId: string };
}) {
  const tour = await getSingleTour(Number(tourId));
  const { name, description, location, duration, media, includes, excludes } =
    tour;

  return (
    <>
      <div className="text-3xl h-20 shadow-md font-semibold py-4 px-4 ml-1 bg-white flex justify-between">
        {name}
      </div>
      <div className="bg-white m-4 rounded-lg p-4 space-y-4 shadow-md">
        <div>
          <p className="font-semibold capitalize">description:</p>
          <p>{description}</p>
        </div>
        <div>
          <p className="font-semibold capitalize">location</p>
          <p>{location}</p>
        </div>
        <div>
          <p className="font-semibold capitalize">duration</p>
          <p>{duration}</p>
        </div>

        {!!includes?.length && (
          <div>
            <p className="font-semibold capitalize">Includes</p>
            <ul className="list-disc list-inside">
              {includes?.map((include) => (
                <li className="ml-4" key={include}>
                  {include}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!!excludes?.length && (
          <div>
            <p className="font-semibold capitalize">Excludes</p>
            <ul className="list-disc list-inside">
              {excludes?.map((exclude) => (
                <li className="ml-4" key={exclude}>
                  {exclude}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!!media.length && (
          <div className="flex gap-4 flex-wrap">
            {media?.map((image) => (
              <Image
                key={image.original_url}
                src={image.original_url}
                alt={name}
                width={300}
                height={300}
              />
            ))}
          </div>
        )}
        <SingleTourButtons tourId={Number(tourId)} />
      </div>
    </>
  );
}
