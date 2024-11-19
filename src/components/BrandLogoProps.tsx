import { BrandData } from "../api/BrandLogoData";
import { CardItem } from "../api/BrandLogoData";
const CardBrand = () => {
  return (
    <div className="w-full h-full ">
      <div className="w-full flex items-center justify-center bg-primary_color ">
        <h4 className="uppercase font-semibold text-[1.3rem] text-white py-2  drop-shadow-lg">
          Brand
        </h4>
      </div>
      <div className="w-full h-[16vh] overflow-auto scrollbar-none cursor-grab border-b-[1px]">
        <div className="w-fit h-full flex gap-[4rem] items-center justify-center px-8">
          {BrandData.map((item, index) => {
            return <CardItem key={index} logo={item.logo} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CardBrand;
