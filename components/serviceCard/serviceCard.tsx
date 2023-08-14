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
            className="group flex flex-col shadow-lg rounded-md px-2 py-4 border-2 border-gray-100 items-center transition hover:bg-blue-900 hover:text-slate-50 h-full ring-2 hover:border-blue-900 ring-blue-900"
            key={title}
            data-testid="serviceCardGrid"
        >
            <div
                className="my-4 text-blue-900 [&>svg]:text-4xl group-hover:text-slate-50 transform group-hover:scale-150"
                data-testid="serviceCardGrid-logo"
            >
                {logo}
            </div>

            <h5 className="text-center text-xl my-2 text-blue-900 group-hover:text-slate-50">
                {title}
            </h5>

            <h6 className="text-center text-sm my-2">{description}</h6>
        </div>
    );
};

export default ServiceCard;
