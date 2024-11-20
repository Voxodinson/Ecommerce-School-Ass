import LinvingRoom from "../assets/cardImage/livingroom.jpg";
import bathroom from "../assets/cardImage/bathroom.jpg";
import bedroom from "../assets/cardImage/bedroom.jpg";
import kitchen from "../assets/cardImage/blackKitchen.jpg";
import { NavLink } from "react-router-dom";
const ProductsFeathur = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-[1rem] items-center justify-center py-[55px]">
      <div className="w-[90%] h-fit flex flex-col md:flex-row gap-[1rem]">
        <div className="w-full md:w-[65%] h-[300px]  relative ">
          <div className="w-full h-full  absolute top-0 left-0 z-10">
            <img
              src={LinvingRoom}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="z-20 absolute text-white flex flex-col w-full h-full left-0 top-0 p-5">
            <h4 className="capitalize">160+ products</h4>
            <h2 className="font-bold text-[2rem] capitalize">Bathroom</h2>
            <span className="text-[.8rem]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
              corporis! Lorem ipsum dolor,
              <br /> sit amet consectetur adipisicing elit. Libero beatae
              optioaut numquam
              <br /> autem qui earum cupiditate, tempore dolor illum.
            </span>
            <NavLink
              to="/products"
              className="w-fit px-20 py-1 text-white capitalize  border-[1px] border-white mt-[10px] hover:bg-white/10 hover:backdrop-blur-sm"
            >
              View all
            </NavLink>
          </div>
        </div>
        <div className="bg-blue-400 w-full md:w-[35%]  h-[300px]">
          <div className="w-full h-full">
            <img
              src={bedroom}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-[90%] h-fit flex flex-col md:flex-row gap-[1rem] md:gap-[1rem]">
        <div className="bg-blue-400 w-full md:w-[35%]  h-[300px]">
          <div className="w-full h-full">
            <img
              src={bathroom}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-[65%] h-[300px]  relative ">
          <div className="w-full h-full  absolute top-0 left-0 z-10">
            <img src={kitchen} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="z-20 absolute text-white flex flex-col w-full h-full left-0 top-0 p-5 justify-end ">
            <h4 className="capitalize">130+ products</h4>
            <h2 className="font-bold text-[2rem] capitalize">kitchen</h2>
            <span className="text-[.8rem]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
              corporis! Lorem ipsum dolor,
              <br /> sit amet consectetur adipisicing elit. Libero beatae
              optioaut numquam
              <br /> autem qui earum cupiditate, tempore dolor illum.
            </span>

            <NavLink
              to="/products"
              className="w-fit px-20 py-1 text-white capitalize  border-[1px] border-white mt-[10px] hover:bg-white/10 hover:backdrop-blur-sm"
            >
              View all
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFeathur;
