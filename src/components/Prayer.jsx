import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
export default function MediaCard({ name, time, prayerimage }) {
  return (
    <Card sx={{ maxWidth: 345 }} className="hover:animate-pulse">
      <CardMedia
        sx={{ height: 140 }}
        image={prayerimage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h2" sx={{ color: "text.secondary" }}>
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
