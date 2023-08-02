import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

interface TechItemProps {
  logo: string;
  name: string;
}

const TechItem: React.FC<TechItemProps> = ({ logo, name }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(require(`../../public/logo/${logo}.svg`).default?.src);
  }, []);

  return (
    <div className="group mx-10 relative flex justify-center [&>img]:hover:brightness-0 [&>h6]:hover:flex">
      {url !== "" && (
        <img
          height={75}
          width={75}
          src={url}
          alt={logo}
          className="w-16 h-16 transition"
        />
      )}

      <h6 className="my-auto text-blue-400 hidden absolute text-center h-16 items-center -rotate-6 text-xl">
        {name}
      </h6>
    </div>
  );
};

export default TechItem;
