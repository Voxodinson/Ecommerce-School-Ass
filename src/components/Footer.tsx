import { FaFacebookMessenger, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
type payment = {
  image: string;
  id: number
};
const PaymentItem: payment[] = [
  {
    image: "src/assets/creditCardImg/apple_pay.png",
    id: 1,
  },
  {
    image: "src/assets/creditCardImg/Mastercard Logo.jpg",
    id: 2,
  },
  {
    image: "src/assets/creditCardImg/paypal.png",
    id: 3,
  },
  {
    image: "src/assets/creditCardImg/visa.jpg",
    id: 4,
  },
  {
    image: "src/assets/creditCardImg/visaElectron.png",
    id: 5,
  },
];
const Footer = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center mt-[30px] pt-6 border-t-[1px] border-gray-200 ">
      <div className="w-[90%] h-full flex items-start justify-between   ">
        <div className="w-fit h-fit items-center justify-center">
          <div className=" flex items-center justify-center flex-col">
            <h1 className="text-[2rem] text-black uppercase leading-10 border-b-[1px] border-gray_color">
              Vox Docoration
            </h1>
            <span className="text-gray_color capitalize text-[.9rem] ">
              Make your home more creative
            </span>
          </div>
          <div className="w-full flex mt-[20px] gap-[1rem] text-[1.5rem] justify-center text-white">
            <a
              href=""
              className="p-[8px] bg-blue-300 rounded-full hover:scale-[115%] transition-all duration-200 ease-in-out hover:-translate-y-2 "
            >
              <FaFacebook />
            </a>
            <a
              href=""
              className="p-[8px] bg-blue-300 rounded-full  hover:scale-[115%] transition-all duration-200 ease-in-out hover:-translate-y-2 "
            >
              <FaFacebookMessenger />
            </a>
            <a
              href=""
              className="p-[8px] bg-blue-300 rounded-full  hover:scale-[115%] transition-all duration-200 ease-in-out hover:-translate-y-2 "
            >
              <FaInstagram />
            </a>
            <a
              href=""
              className="p-[8px] bg-blue-300 rounded-full  hover:scale-[115%] transition-all duration-200 ease-in-out hover:-translate-y-2 "
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
        <div className=" flex items-start justify-center gap-[6rem]">
          <div className="">
            <h4 className="font-semibold text-[1.3rem] border-b-[1px] border-gray_color ">
              New Release
            </h4>
            <ul className="flex flex-col capitalize mt-[10px] leading-5">
              <li className="hover:underline hover:decoration-1">
                <a href="">Living</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">Bedroom</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">Kitchen</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">aldult room</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">kid room</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="font-semibold w-fit text-[1.3rem] border-b-[1px] border-gray_color">
              Tranding
            </h4>
            <ul className="flex flex-col capitalize mt-[10px] leading-5">
              <li className="hover:underline hover:decoration-1">
                <a href="">Sofa</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">Bed</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">Table</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">chair</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">air conditoner</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">refrigarator</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">desk</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="font-semibold text-[1.3rem] border-b-[1px] border-gray_color">
              Best Products
            </h4>
            <ul className="flex flex-col capitalize mt-[10px] leading-5">
              <li className="hover:underline hover:decoration-1">
                <a href="">Table</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">chair</a>
              </li>
              <li className="hover:underline hover:decoration-1">
                <a href="">bed</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold text-[1.3rem] border-b-[1px] border-gray_color w-fit">
            Payment method
          </h4>
          <div className="mt-[30px] ">
            <input
              type="text"
              placeholder="Send message...!"
              className="py-1 px-[10px] outline-none border-[1px] border-gray_color text-[1rem]"
            />
            <button className="py-[4.5px] px-[10px] border-[1px] ml-1 text-white bg-blue-300">
              Send
            </button>
          </div>

          <div className="mt-[30px]">
            <ul className="flex gap-[.6rem] items-center justify-start h-fit">
              {PaymentItem.map((i) => {
                return (
                  <li className="w-[45px] " key={i.id}>
                    <img src={i.image} alt="" className="" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-[10vh] mt-[30px] border-t-[1px] ">
        <p className="text-gray_color">
          <span className="text-black font-semibold">&#169;</span>
          Copyright{" "}
          <span className="text-black font-semibold">@VoxDecoration.</span> all
          Right reserved by
        </p>
      </div>
    </div>
  );
};

export default Footer;
