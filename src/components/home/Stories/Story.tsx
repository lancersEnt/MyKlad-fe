import { Card, CardMedia } from '@mui/material';

interface StoryProps {
  imageUrl: string;
  alt: string;
}
export default function Story({ imageUrl, alt }: StoryProps) {
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: '1rem',
        minWidth: { xs: '23.5%', sm: '20%', md: '20.5%', lg: '17.5%' },
        width: { xs: '23.5%', sm: '20%', md: '20.5%', lg: '17.5%' },
        height: '220px',
      }}
    >
      <CardMedia component="img" alt={alt} height="100%" image={imageUrl} />
    </Card>
  );
}
