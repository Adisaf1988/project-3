import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";

export default function ActionAreaCard() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        marginTop: 4,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/id/1770512501/photo/traveler-asian-woman-relax-and-travel-on-thai-longtail-boat-in-ratchaprapha-dam-at-khao-sok.jpg?s=612x612&w=0&k=20&c=eiecLtSMS9XT_s0KZ6VSawD9BK-FAu_NuF3DWx9KAt4="
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Thailand: A Journey Through Paradise
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Experience the Magic of Thailand's Stunning Landscapes, Rich
              Heritage, and Bustling City Life
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/id/1774474530/photo/a-tourist-woman-stands-in-the-red-desert-of-dubai.jpg?s=612x612&w=0&k=20&c=o7K3haHKWgalHDB4OLpbhv1B0HM0d8WCGy6hsXjWehs="
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Dubai: A Modern Oasis in the Heart of the Desert
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Explore the Blend of Luxury, Innovation, and Tradition in One of
              the World's Most Vibrant Cities
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/id/1405307098/photo/smiling-black-woman-in-the-city.jpg?s=612x612&w=0&k=20&c=fuC7N3wils_kFyUKEPbNimqu9HanFHNYBWv56cDl94M="
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sunset in Rio de Janeiro
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Experience the Enchanting Beauty of Rio's Sunset: Where Nature
              Meets Urban Charm
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/id/1192084200/photo/woman-in-oia-on-santorini.jpg?s=612x612&w=0&k=20&c=GKJafqzcZ0y_1Sj3awNcQDh2GIrXpbw8dYk6T8Txhv8="
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Santorini: A Dream Destination in the Aegean Sea
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Explore the Island's Iconic Blue Domes, Crystal-Clear Waters, and
              Unforgettable Sunsets
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/id/1155330280/photo/couple-toasting-with-the-douro-river-and-porto-in-background-at-sunset.jpg?s=612x612&w=0&k=20&c=duN0sZQiEzdHGfxDJteWaNB-tEraKIHmhCG9ToHZ_2E="
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Portugal: A Land of Charm and Tradition
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Discover Portugal's Rich History, Beautiful Coastlines, and
              Vibrant Culture from Lisbon to Porto
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/id/509319013/photo/the-ancient-city-of-dresden-germany.jpg?s=612x612&w=0&k=20&c=glrR9q5ZOEpX-_4v0yjLr-VV2q1o7O7fTMakLyFf3WY="
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Barcelona: A Fusion of Art, Architecture, and Culture
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Explore the Uniqueness of Barcelona’s Iconic Landmarks, Stunning
              Beaches, and Dynamic Atmosphere
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
