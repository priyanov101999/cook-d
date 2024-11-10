import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const ReconstructedFoodList = ({ recipe }) => {
  return (
    <Grid container spacing={3}>
      {recipe?.map(recipe => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <Link to={`/recipe/${recipe.title}`} style={{ textDecoration: 'none' }}>  {/* Link to the new page with title */}
            <Card>
              <CardMedia
                component="img"
                alt={recipe.title}
                height="140"
                image={recipe.image}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {recipe.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReconstructedFoodList;
