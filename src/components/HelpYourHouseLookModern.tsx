import chair from "../assets/modern-Interrior/chair.jpg";
import sofa from "../assets/modern-Interrior/sofaImg.jpg";
import squarDot from "../assets/modern-Interrior/dotSquar.png";
import lamp from "../assets/modern-Interrior/lamp.jpg";
const HelpYourHouseLookModern = () => {
  return (
    <div className="w-full h-[100vh] lg:flex items-center justify-center hidden ">
      <div className="w-[90%] h-full flex items-center justify-center">
        <div className="relative w-[60%] h-[80%]  ">
          <div className="w-[300px]  absolute top-5px left-[-30px] ">
            <img src={squarDot} alt="" className="rounded-lg w-full h-full " />
          </div>
          <div className="w-[400px] absolute left-[100px] top-[100px] z-10 drop-shadow-lg rounded-lg">
            <img src={sofa} alt="" className="rounded-lg w-full h-full" />
          </div>
          <div className="w-[250px] absolute top-[230px] right-[20px] z-20  drop-shadow-lg rounded-lg">
            <img src={chair} alt="" className="rounded-lg w-full h-full" />
          </div>
          <div className="w-[200px] absolute top-0 right-[60px] drop-shadow-lg rounded-lg ">
            <img src={lamp} alt="" className="rounded-lg w-full h-full" />
          </div>
          <div className="w-[200px] absolute top-[400px] right-[200px]">
            <img src={squarDot} alt="" className="rounded-lg w-full h-full" />
          </div>
        </div>
        <div className="w-[50%] h-full flex items-center justify-center">
          <div className="h-fit w-full flex flex-col gap-[1.5rem]">
            <div className=" flex flex-col gap-[1rem]">
              <h2 className="capitalize text-[2rem] font-bold break-words drop-shadow-sm shadow-black leading-10">
                We help you to make modern interior design for youe house
              </h2>
              <p className="text-[1rem] ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, non. Similique sapiente autem at veniam
                blanditiis optio, explicabo labore quibusdam. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Et similique nisi dolorem
                sed repellat quisquam eligendi atque neque vel dolores.
              </p>
            </div>
            <div className=" flex px-[20px] text-[1rem]  ">
              <ul className="flex flex-col   list-disc list-inside gap-[.8rem]">
                <li>
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Alias, quibusdam?
                  </span>
                </li>
                <li>
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Alias, quibusdam?
                  </span>
                </li>
              </ul>
              <ul className="flex flex-col list-disc list-inside gap-[.8rem]">
                <li>
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Alias, quibusdam?
                  </span>
                </li>
                <li>
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Alias, quibusdam?
                  </span>
                </li>
              </ul>
            </div>
            <div className=" mt-[20px]">
              <a
                href=""
                className="py-2 px-14 bg-white rounded-full text-black uppercase font-semibold text-[1rem] border-[1px] border-black hover:bg-blue-300 hover:text-white"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpYourHouseLookModern;
