import React, {useEffect, useRef} from "react";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import SearchAtom from "../Recoil/SearchAtom";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useRecoilState(SearchAtom);

  const navigate = useNavigate();

  return (
    <main className=" w-full shadow-md ">
      {/*  */}

      <nav className=" grid grid-cols-10 w-full shadow-md py-3 px-3 md:px-10 ">
        {/* Icon Code */}

        <section className=" col-span-5 lg:col-span-3  order-1 ">
          <Link to="/" className=" flex  items-center justify-start gap-x-3 w-fit">
            <BusinessCenterRoundedIcon fontSize="medium" className=" text-zinc-800" />
            <p className=" text-[1.4rem] md:text-[1.5rem] text-yellow-500 tracking-wide font-Nunito font-bold italic ">Go Careers</p>
          </Link>
        </section>

        {/* Search Code */}

        <section className=" col-span-10 mt-3 lg:mt-0 lg:col-span-4 border-[1px] border-zinc-300 rounded-full flex items-center justify-center  order-3 lg:order-2">
          <div className=" rounded-full text-white px-8 h-full flex items-center justify-center bg-yellow-500 ">
            <SearchTwoToneIcon fontSize="medium" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              navigate("/jobs");
            }}
            name="company"
            className=" bg-transparent flex-1 text-black placeholder:text-zinc-500 py-[9px] px-3  outline-none  tracking-wide"
            placeholder="Search for jobs"
          />
        </section>

        {/* Sign in / Sign out */}

        <section className=" flex items-center gap-x-2 justify-end col-span-5 lg:col-span-3 order-2 lg:order-3 ">
          <button className=" px-5 md:px-6 py-2 border-[0.1px] rounded-full border-yellow-500 ">Sign In</button>
          <button className=" px-5 md:px-6 py-2 border-[0.1px] border-yellow-500 rounded-full bg-yellow-500 text-white "> Sign In</button>
        </section>
      </nav>

      {/*  */}
    </main>
  );
};

export default Navbar;
