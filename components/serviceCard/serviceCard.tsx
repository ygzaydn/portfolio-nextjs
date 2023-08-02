import React, { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  logo: ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  logo,
}) => {
  return (
    <div
      className=" group flex flex-col shadow-lg rounded-md px-2 py-4 border-2 border-gray-100 items-center transition hover:bg-blue-400 hover:text-slate-50"
      key={title}
      data-testid="serviceCardGrid"
    >
      <div
        className="my-4 text-indigo-500 [&>svg]:text-4xl group-hover:text-slate-50 transform group-hover:scale-150"
        data-testid="serviceCardGrid-logo"
      >
        {logo}
      </div>

      <h5 className="text-center text-xl my-2 text-indigo-400 group-hover:text-slate-50">
        {title}
      </h5>

      <h6 className="text-center text-sm my-2">{description}</h6>
    </div>
  );
};

export default ServiceCard;
