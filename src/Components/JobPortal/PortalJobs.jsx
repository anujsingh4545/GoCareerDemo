import React from "react";
import LocationSearchingSharpIcon from "@mui/icons-material/LocationSearchingSharp";
import {Link} from "react-router-dom";

const PortalJobs = ({id, title, name, description, location, posted, type, experience}) => {
  return (
    <main className=" w-full  px-5 pt-5 border-[0.1px] rounded-md  border-zinc-200 bg-white shadow-sm  ">
      {/*  */}

      {/* Profile Section */}

      <section className=" flex items-center justify-center w-full gap-x-3">
        <div className=" size-14 bg-zinc-200 animate-pulse rounded-full"></div>

        <div className="  flex-1 flex items-start justify-start flex-col  ">
          <p className=" font-semibold tracking-wider text-[1rem] ">{title}</p>
          <p className=" text-zinc-600 tracking-wide text-[0.85rem]">{name}</p>
        </div>
      </section>

      {/* Role Description */}

      <section className=" mt-3  ">
        <p className=" text-[0.9rem] text-zinc-800 tracking-wide font-Nunito line-clamp-6 min-h-28 overflow-clip ">{description}</p>
      </section>

      {/* Experience and type */}

      <section className=" grid grid-cols-2 gap-x-5  w-full border-b-[0.1px] pb-1">
        <p className=" font-medium tracking-wider text-[0.9rem] text-zinc-700 italic">
          Experience: <span>{experience}</span>
        </p>
        <p className=" w-full text-right font-medium tracking-wider text-[0.9rem] text-zinc-700  italic">
          Type: <span>{type}</span>
        </p>
      </section>

      {/* Location and view job */}

      <section className="  flex items-center w-full justify-between py-3 text-zinc-800 font-Nunito tracking-wide text-[0.9rem] ">
        <div className=" flex  items-center justify-center gap-x-2">
          <LocationSearchingSharpIcon />
          <p>{location}</p>
        </div>

        <Link to={`/jobs/${title}-${name}-${id}`}>
          <button className=" px-8 border-[0.1px] py-2 rounded-md bg-zinc-200 hover:bg-zinc-400 ease-in-out duration-150 ">View</button>
        </Link>
      </section>

      {/*  */}
    </main>
  );
};

export default PortalJobs;
