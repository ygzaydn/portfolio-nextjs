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
        <Grid item xs={2} className="techStack__logoGrid">
            {url !== "" && (
                <img
                    height={75}
                    width={75}
                    src={url}
                    alt={logo}
                    className="techStack__logo"
                />
            )}

            <Typography variant="h6" color="primary">
                {name}
            </Typography>
        </Grid>
    );
};

export default TechItem;
