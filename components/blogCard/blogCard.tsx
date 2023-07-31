import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { useRouter } from "next/router";

interface IBlogCard {
    title: string;
    img: string;
    tag: string;
    id: string;
}

export default function BlogCard({ title, img, tag, id }: IBlogCard) {
    const router = useRouter();
    const navigate = (path: string): Promise<boolean> => router.push(path);

    return (
        <Card
            sx={{ maxWidth: 345 }}
            style={{
                borderRadius: 5,

                border: ".5px lightgray solid",
            }}
        >
            <CardActionArea
                onClick={() => {
                    navigate(`/blog/${id}`);
                }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={title}
                    style={{ objectFit: "contain" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {tag[0].toUpperCase() + tag.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                    <Button
                        style={{ padding: 0, marginTop: "1rem" }}
                        color="primary"
                    >
                        Click to read
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
