import { FaAirbnb } from "react-icons/fa6";

interface partner {
  src: JSX.Element;
  title: string;
}
export function Partners() {

  let info: partner[] = [
    {
      src: <FaAirbnb size={50} />,
      title: "airbnb"
    },
    {
      src: <FaAirbnb size={50} />,
      title: "airbnb"
    },
    {
      src: <FaAirbnb size={50} />,
      title: "airbnb"
    }, {
      src: <FaAirbnb size={50} />,
      title: "airbnb"
    }


  ];

  return (
    <section className="w-full p-5 md:flex items-center justify-around bg-gray-100">

      {info.map((item, index) => (
        <div key={index} className="p-5 flex items-center justify-center">
          <div>
            {item.src}
          </div>
          <p>{item.title}</p>
        </div>
      ))}
    </section>
  );
}
