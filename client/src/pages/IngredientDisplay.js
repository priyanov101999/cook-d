import React from 'react';
import { Card, CardContent, Typography, Box, Paper, List, ListItem } from '@mui/material';

// Sample JSON for ingredients


function IngredientsDisplay({ingredients}) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <Typography variant="h3" gutterBottom align="center" style={{ color: '#333' }}>
        Recipe Ingredients
      </Typography>

      {/* List of ingredients */}
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index} sx={{ display: 'block', marginBottom: '16px' }}>
            <Paper elevation={4} style={{ borderRadius: '8px', padding: '16px', width: '100%' }}>
              <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                  {/* Ingredient Name and Amounts */}
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    {/* Ingredient Name */}
                    <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                      {ingredient.name}
                    </Typography>

                    {/* Ingredient Amounts */}
                    <Box>
                      <Typography variant="body1" color="textSecondary">
                        <strong>{ingredient.amount.metric.value} {ingredient.amount.metric.unit || 'unit'}</strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span style={{ fontStyle: 'italic' }}>
                          ({ingredient.amount.us.value} {ingredient.amount.us.unit || 'unit (US)'})
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default IngredientsDisplay;
