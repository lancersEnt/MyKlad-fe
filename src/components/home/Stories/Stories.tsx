import { useRef, useState } from 'react';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';

// icons
import AddIcon from '@mui/icons-material/ControlPoint';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// custom components
import Story from './Story';

function AddStory() {
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: '1rem',
        minWidth: { xs: '23.5%', sm: '17.5%', md: '17.5%' },
        width: { xs: '23.5%', sm: '17.5%', md: '17.5%' },
        height: '220px',
        display: 'flex',
        justifyContent: 'center',
        mb: '2rem',
      }}
    >
      <Stack spacing={2} my="auto">
        <AddIcon fontSize="large" sx={{ mx: 'auto' }} />
        <Typography fontSize={{ xs: '15px' }} align="center">
          Ajouter votre Story
        </Typography>
      </Stack>
    </Card>
  );
}

const scrollOffset = 300;

export default function Stories() {
  const ref = useRef<HTMLInputElement>(null);

  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(true);

  const scroll = (scrollDirection: string) => {
    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if (scrollDirection === 'right') ref.current.scrollLeft -= scrollOffset;
      else ref.current.scrollLeft += scrollOffset;
    }
  };

  const HandleScroll = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      if (scrollLeft + clientWidth === scrollWidth) {
        setRight(true);
        setLeft(false);
      } else if (scrollLeft === 0) {
        setRight(false);
        setLeft(true);
      } else {
        setRight(false);
        setLeft(false);
      }
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Stories
      </Typography>
      <Stack
        ref={ref}
        id="stories"
        direction="row"
        p={1}
        spacing={1}
        sx={{ overflowX: 'auto' }}
        onScroll={() => HandleScroll()}
      >
        <AddStory />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680079527283-0ff93b782407?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=lorenzo-gerosa-JbyzWiyo6ao-unsplash.jpg&w=640"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680022546558-550eaf22351e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680079527283-0ff93b782407?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=lorenzo-gerosa-JbyzWiyo6ao-unsplash.jpg&w=640"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680022546558-550eaf22351e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680079527283-0ff93b782407?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=lorenzo-gerosa-JbyzWiyo6ao-unsplash.jpg&w=640"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680022546558-550eaf22351e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680079527283-0ff93b782407?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=lorenzo-gerosa-JbyzWiyo6ao-unsplash.jpg&w=640"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680022546558-550eaf22351e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680035116082-c7cd5e96fdb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Story
          alt="story"
          imageUrl="https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
      </Stack>

      {/* stories horizontall scroll buttons scroll */}
      <IconButton
        color="primary"
        sx={{
          display: right ? 'none' : 'inline-flex',
          backgroundColor: 'white',
          border: '1px solid rgba(0,0,0,.2)',
          position: 'absolute',
          top: '50%',
          right: 0,
        }}
        onClick={() => scroll('left')}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        color="primary"
        sx={{
          display: left ? 'none' : 'inline-flex',
          backgroundColor: 'white',
          border: '1px solid rgba(0,0,0,.2)',
          position: 'absolute',
          top: '50%',
          left: 0,
        }}
        onClick={() => scroll('right')}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Box>
  );
}
