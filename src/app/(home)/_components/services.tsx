import { MdOutlineContactSupport } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";

export interface FeatureInfo {
  src: JSX.Element;
  title: string;
  description: string

}
export function Services() {
  let info: FeatureInfo[] = [
    {
      src: <MdOutlineContactSupport />,
      title: "Guided Tours",
      description: "sunt qui repellat saepe quo velit aperiam id aliquam placeat."

    },
    {
      src: <FaMoneyBill1Wave />,
      title: "Best Flights Options",
      description: "sunt qui repellat saepe quo velit aperiam id aliquam placeat."

    },
    {
      src: <RiSecurePaymentLine />,
      title: "Religious Tours",
      description: "sunt qui repellat saepe quo velit aperiam id aliquam placeat."

    },
    {
      src: <RiSecurePaymentLine />,
      title: "Medical insurance",
      description: "sunt qui repellat saepe quo velit aperiam id aliquam placeat."

    },
  ];

  return (
    <section className="mt-20 flex-col items-center justify-center">
      <p className="text-secondary text-center text-base uppercase font-semibold">Services</p>
      <h2 className="text-center text-4xl font-semibold capitalize my-5">we offer the best services</h2>

      <div className="w-5/6 mx-auto md:flex my-5">
        {info.map((item, index) => (
          <div key={index} className="flex flex-col text-center items-center p-5">
            <div className="flex justify-center text-5xl">
              {item.src}
            </div>
            <h2 className="font-semibold my-2">{item.title}</h2>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
