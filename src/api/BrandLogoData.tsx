type BrandType = {
  logo: string;
};
export const BrandData: BrandType[] = [
  {
    logo: "src/assets/brandingLogo/79b73f8b49bd9853e61dd1985ef45c0219a6ce09.png",
  },
  {
    logo: "src/assets/brandingLogo/1626198091918-e1668530786720.jpg",
  },
  {
    logo: "src/assets/brandingLogo/anthropologie.jpg",
  },
  {
    logo: "src/assets/brandingLogo/article_logo.jpg",
  },
  {
    logo: "src/assets/brandingLogo/CB2_-removebg-preview.png",
  },
  {
    logo: "src/assets/brandingLogo/download (1).png",
  },
  {
    logo: "src/assets/brandingLogo/download-1-e1668530719922.png",
  },
  {
    logo: "src/assets/brandingLogo/download.png",
  },
  {
    logo: "src/assets/brandingLogo/exhibitorlogo_accountid_66461_VCC-Logo_Linear-Gray2.png",
  },
  {
    logo: "src/assets/brandingLogo/Jungalow_logotype_main_header_logo_520x41px_c0636e1d-b03c-4767-aeb0-02b3412321b1_500x.png",
  },
  {
    logo: "src/assets/brandingLogo/Michael_Aram_Logo_-_Black_Text_1400x.png",
  },
  {
    logo: "src/assets/brandingLogo/The_Citizenry_Logo.jpg",
  },
  {
    logo: "src/assets/brandingLogo/wayfair-logo-removebg-preview.png",
  },
];
export const CardItem = ({ logo }: BrandType) => {
  return (
    <div className="w-[120px] flex flex-col items-center justify-center group">
      <a href="p-2">
        <img
          src={logo}
          alt=""
          className="w-full group-hover:scale-125 transition-all duration-200 ease-in-out"
        />
      </a>
    </div>
  );
};
