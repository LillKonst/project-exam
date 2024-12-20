import logo from "../../../images/holidaze-logo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-col w-full mt-10">
      <div className="h-[15px] bg-customYellow w-full text-center text-customRed -mb-2">
        .
      </div>
      <div className="bg-customWhite flex flex-col md:flex-row z-10 w-full justify-between items-center rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:ms-10 flex flex-col p-5 items-center md:items-start">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-[40px]" />
            </Link>
            <p>Org: 98765432</p>
          </div>
          <div className="flex flex-col md:p-5 items-center md:items-start">
            <p className="hover:font-semibold hover:cursor-pointer">Support</p>
            <p className="hover:font-semibold hover:cursor-pointer">
              Terms of use
            </p>
            <p className="hover:font-semibold hover:cursor-pointer">
              Safe Payment with Holidaze
            </p>
          </div>
        </div>
        <div className="flex flex-col md:me-10 my-10 items-center md:items-start">
          <p>Website made by Lill-Kristine Konst</p>
          <p>Exam 2024, Frontend Development</p>
          <p>Noroff University</p>
        </div>
      </div>
    </div>
  );
}
