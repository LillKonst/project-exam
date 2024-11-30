import mainImage from "../images/swimming-pool-2128578_1280-main.jpg";

export default function MainImage() {
  return (
    <div className="relative w-full h-auto">
      <img
        src={mainImage}
        alt="Swimming Pool"
        className="relative top-0 left-0 w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 p-2 md:p-5 rounded-tr-lg bg-customBlue/50">
        <h1 className="text-sm xxs:text-xl xs:text-3xl md:text-4xl text-customWhite">
          FIND YOUR NEXT VACATION SPOT
        </h1>
      </div>
    </div>
  );
}
