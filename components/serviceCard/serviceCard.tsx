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
      className="flex flex-col rounded-md px-2 py-4 border-2 border-gray-300 items-center transition hover:bg-blue-400 hover:text-slate-50 [&>div]:hover:scale-150"
      key={title}
      data-testid="serviceCardGrid"
    >
      <div className="my-4" data-testid="serviceCardGrid-logo">
        {logo}
      </div>

      <h5 className="text-center text-xl my-2">{title}</h5>

      <h6 className="text-center text-sm my-2">{description}</h6>
    </div>
  );
};

export default ServiceCard;
