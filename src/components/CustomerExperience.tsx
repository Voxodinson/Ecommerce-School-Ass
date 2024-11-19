import { LiaShippingFastSolid } from "react-icons/lia";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineGppGood } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
const CustomerExperience = () => {
  return (
    <div className="w-full h-fit lg:h-[95vh] flex flex-col items-center justify-center pb-[60px] ">
      <div className="w-full h-fit flex items-center justify-center flex-col gap-[1rem] pb-[2rem]    ">
        <h5 className="mdtext-[1.3rem] capitalize font-semibold text-gray_color">
          <span className="text-blue-300 font-bold md:text-[1.6rem]">100%</span>{" "}
          customer satisfaction!
        </h5>
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-[1.4rem] md:text-[2.6rem] text-black font-bold capitalize">
            we provide the best customer.
          </h1>
          <h1 className="text-[1.4rem] md:text-[2.6rem] text-black font-bold capitalize">
            experience
          </h1>
          <h5 className="mdtext-[1.3rem] capitalize font-semibold text-gray_color">
            why choose us?
          </h5>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-4 flex-wrap">
        <div
          className=" flex flex-col gap-[.7rem] items-start justify-center  w-full mx-[20px] md:w-[330px] md:mx-0 p-[1rem] border-[1px]
         border-white hover:border-gray-600 transition-all duration-300 ease-in-out rounded-lg "
        >
          <div className="p-[.7rem] rounded-md  bg-blue-300 justify-center flex items-center">
            <LiaShippingFastSolid className="text-[1.7rem] text-white" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-[2rem] capitalize text-black">Free Shipping</h2>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              laborum sed tenetur repellendus quaerat quos corrupti dolorum
              praesentium fugit incidunt!
            </span>
          </div>
        </div>
        <div
          className=" flex flex-col gap-[.7rem] items-start justify-center  w-full mx-[20px] md:w-[330px] md:mx-0  p-[1rem] border-[1px]
         border-white hover:border-gray-600 transition-all duration-300 ease-in-out rounded-lg"
        >
          <div className="p-[.7rem] rounded-md  bg-blue-300 justify-center flex items-center">
            <RiRefund2Line className="text-[1.7rem] text-white" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-[2rem] capitalize text-black">Refund</h2>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              laborum sed tenetur repellendus quaerat quos corrupti dolorum
              praesentium fugit incidunt!
            </span>
          </div>
        </div>
        <div
          className=" flex flex-col gap-[.7rem] items-start justify-center  w-full mx-[20px] md:w-[330px] md:mx-0 p-[1rem] border-[1px]
         border-white hover:border-gray-600 transition-all duration-300 ease-in-out rounded-lg"
        >
          <div className="p-[.7rem] rounded-md  bg-blue-300 justify-center flex items-center">
            <MdOutlineGppGood className="text-[1.7rem] text-white" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-[2rem] capitalize text-black">Quality</h2>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              laborum sed tenetur repellendus quaerat quos corrupti dolorum
              praesentium fugit incidunt!
            </span>
          </div>
        </div>
        <div
          className=" flex flex-col gap-[.7rem] items-start justify-center  w-full mx-[20px] md:w-[330px] md:mx-0  p-[1rem] border-[1px]
         border-white hover:border-gray-600 transition-all duration-300 ease-in-out rounded-lg"
        >
          <div className="p-[.7rem] rounded-md  bg-blue-300 justify-center flex items-center">
            <FaMoneyCheckAlt className="text-[1.7rem] text-white" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-[2rem] capitalize text-black">Free Shipping</h2>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              laborum sed tenetur repellendus quaerat quos corrupti dolorum
              praesentium fugit incidunt!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerExperience;
