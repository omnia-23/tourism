import Link from "next/link";
import star from "@/assets/star.png";
import Image from "next/image";
import { getSingleTour } from "@/lib/actions/tour.actions";
import { ReviewForm } from "./_components/form/reviewForm";
import { cookies } from "next/headers";
import img from "@/assets/img.png";
import { cn } from "@/lib/utils";
import { yesteryear } from "@/lib/fonts";
import {
  IoInformationCircleOutline,
  IoLocationOutline,
  IoImagesOutline,
} from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IconType } from "react-icons/lib";
import { FaRegCheckCircle, FaArrowRight } from "react-icons/fa";
import { Tour, TourMedia, TourReview } from "@/models";
import { Button } from "@/components/ui";

type TabNames = "info" | "reviews" | "media" | "";

export default async function TourPage({
  params: { tourId },
  searchParams: { tab },
}: {
  params: { tourId: string };
  searchParams: {
    tab: TabNames;
  };
}) {
  const tour = await getSingleTour(Number(tourId));
  const { media, reviews } = tour;

  return (
    <>
      <section className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="relative w-full">
          <div className="w-full flex items-center justify-center absolute top-[6rem] md:top-1/3 left-1/2 transform -translate-x-1/2 z-10">
            <div className="text-white flex flex-col items-center w-2/3">
              <h2
                className={cn(
                  "text-4xl md:text-6xl font-semibold my-3 text-center capitalize",
                  yesteryear.className
                )}
              >
                travel with us
              </h2>
            </div>
          </div>
          <Image
            src={img}
            alt="img"
            width={800}
            height={200}
            className="w-full min-h-[15rem] md:min-h-[23rem] object-cover object-right"
          />
        </div>

        <div className="relative md:-top-[5rem] bg-white rounded shadow w-full md:w-5/6 mx-auto ">
          <div className="flex justify-center">
            <Tab
              text={"information"}
              Icon={IoInformationCircleOutline}
              link="info"
              active={tab === "info" || tab === ""}
            />
            <Tab
              text={"reviews"}
              Icon={IoLocationOutline}
              link="reviews"
              active={tab === "reviews"}
            />
            <Tab
              text={"gallery"}
              Icon={IoImagesOutline}
              link="media"
              active={tab === "media"}
            />
          </div>
          {(() => {
            switch (tab) {
              case "info":
                return <Info tour={tour} />;
              case "reviews":
                return <Reviews reviews={reviews} tourId={Number(tourId)} />;
              case "media":
                return <Media media={media} />;
              default:
                return null;
            }
          })()}
        </div>
      </section>
    </>
  );
}

const Tab = ({
  text,
  Icon,
  link,
  active,
}: {
  text: string;
  Icon: IconType;
  link: TabNames;
  active: boolean;
}) => {
  return (
    <Link
      href={`?tab=${link}`}
      className={cn(
        "w-1/3 justify-center capitalize flex gap-2 cursor-pointer font-bold items-center py-6 bg-neutral-100 hover:bg-white transition-all",
        active && "bg-white"
      )}
    >
      <Icon size={22} /> {text}
    </Link>
  );
};

const Detail = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="grid grid-cols-3">
      <p className="capitalize text-primary-foreground font-semibold">
        {name} :
      </p>
      <p className="col-span-2">{value}</p>
    </div>
  );
};

const Reviews = ({
  reviews,
  tourId,
}: {
  reviews: TourReview[];
  tourId: number;
}) => {
  return (
    <>
      {reviews?.length === 0 && cookies().has(`reviewe/tour/${tourId}`) && (
        <div className="h-40" />
      )}
      <div className="px-8 py-10">
        {!cookies().has(`reviewe/tour/${tourId}`) && (
          <>
            <h3 className="mt-10 text-3xl font-medium font-lato  my-3 py-3 border-b-2 col-span-2 ">
              Leave a review
            </h3>
            <div className="mb-10">
              <ReviewForm tour_id={Number(tourId)} />
            </div>
          </>
        )}
        <>
          <h3 className=" text-3xl font-medium font-lato  mb-3 pb-3 border-b-2 col-span-2 ">
            Overall Reviews
          </h3>
          <div className="mb-10 capitalize items-start">
            {reviews?.map((item, index) => (
              <div className="border-b py-3" key={index}>
                <div className="flex items-center justify-between">
                  <p className="text-xl">{item.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{item.stars}</span>
                    <Image
                      className="mx-2 inline"
                      src={star}
                      alt="rate"
                      width={15}
                    />
                  </div>
                </div>
                <p className="my-1">{item.body}</p>
              </div>
            ))}
          </div>
        </>
      </div>
    </>
  );
};

const Media = ({ media }: { media: TourMedia[] }) => {
  return (
    <>
      {media?.length === 0 && <div className="h-40" />}
      <div className="px-8 py-10 grid-cols-1 md:grid-cols-3 grid gap-4">
        {
          // Array(9)
          // .fill("")
          media.map((m) => (
            <Image
              className="md:w-80 h-60 object-cover"
              key={m.id}
              src={m.original_url}
              // key={Math.random()}
              // src={img}
              alt="img"
              width={500}
              height={500}
            />
          ))
        }
      </div>
    </>
  );
};

const Info = ({
  tour: {
    name,
    price,
    description,
    location,
    duration,
    includes,
    excludes,
    options,
    id,
  },
}: {
  tour: Tour;
}) => {
  const formatter = new Intl.NumberFormat();

  return (
    <div className="flex md:flex-row flex-col justify-between">
      <div className="px-8 py-10 md:w-1/2 w-full">
        <div className="flex gap-8 items-baseline">
          <p className="text-2xl font-bold">{name}</p>
          <p className="text-lg font-semibold text-primary-foreground">
            {formatter.format(price)} EGP
          </p>
        </div>
        <p className="text-sm mt-6">{description}</p>
        <br />
        {/* <Link href={`${id}/reserve`}>
          <Button
            className="w-full flex gap-2 items-center group mt-4"
            variant={"outline"}
          >
            Reserve
            <FaArrowRight className="mr-0 group-hover:-mr-3 transition-all" />
          </Button>
        </Link> */}
      </div>
      <div className="md:w-1/2 w-full mb-6 mx-6 md:my-8">
        <p className="text-xl font-bold mb-4">Tour Details</p>
        <Detail name={"location"} value={location} />
        <br />
        <Detail name={"duration"} value={duration} />
        <br />
        {
          includes?.length &&
          <div className="grid grid-cols-3">
            <p className="capitalize text-primary-foreground font-semibold">
              Includes :
            </p>
            <div className="col-span-2 grid grid-cols-2 gap-y-4">
              {includes?.map((i) => (
                <p key={i} className="flex items-center gap-2">
                  <FaRegCheckCircle size={14} className="mt-1" />
                  {i}
                </p>
              ))}
            </div>
          </div>
        }
        <br />
        {
          excludes?.length && <div className="grid grid-cols-3 ">
            <p className="capitalize text-primary-foreground font-semibold">
              Excludes :
            </p>
            <div className="col-span-2 grid grid-cols-2 gap-y-4">
              {excludes?.map((i) => (
                <p key={i} className="flex items-center gap-2">
                  <IoMdCloseCircleOutline size={16} className="mt-1" />
                  {i}
                </p>
              ))}
            </div>
          </div>
        }
        <div className="grid grid-cols-3 ">
          <p className="capitalize text-primary-foreground font-semibold">
            Excludes :
          </p>
          <div className="col-span-2 grid grid-cols-2 gap-y-4">
            {excludes?.map((i) => (
              <p key={i} className="flex items-center gap-2">
                <IoMdCloseCircleOutline size={16} className="mt-1" />
                {i}
              </p>
            ))}
          </div>
        </div>
        {!!options.length && (
          <>
            <br />
            <div className="grid grid-cols-3 ">
              <p className="capitalize text-primary-foreground font-semibold">
                Options :
              </p>
              <div className="col-span-2 grid grid-cols-2 gap-y-4">
                {options.map((i) => (
                  <p
                    key={i.name}
                    className="flex items-center justify-center gap-2"
                  >
                    <span>- {i.name}</span>
                    <span>{i.price} EGP</span>
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
