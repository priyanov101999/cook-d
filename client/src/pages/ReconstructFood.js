import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, CircularProgress, Typography, Button, Card, CardContent, Autocomplete, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import IngredientDisplay from './IngredientDisplay';
import ReconstructedFoodList from './ReconstructedFoodList';
import { recipeList, recipes } from '../variables/recipe';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import MacronutrientTable from './MacronutrientTable';

function ReconstructFood() {
  const { title } = useParams();
  const [foodName, setFoodName] = useState('');
  const [ingredientsData, setIngredientsData] = useState([]);  
  const [recipe, setRecipe] = useState([]);
  const [ingredientsString, setIngredientsString] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [macronutrients, setMacronutrients] = useState({});
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const cuisines = ['Italian', 'Chinese', 'Mexican', 'Indian', 'American']; // Example list of cuisines

  useEffect(() => {
    setFoodName(title);
    handleSearch();
  }, [title]);

  const handleChange = (e) => {
    console.log(e.target.textContent);
    const value = e.target.textContent;
    setFoodName(value);
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleSearch = () => {
    if (!foodName) return;
    setLoading(true); 
    setFlag(false);
    axios.get(`https://api.spoonacular.com/recipes/${recipeList[foodName]}/ingredientWidget.json?apiKey=29bf45631c2f468c89e0b91f11c822d3`)
      .then((response) => {
        const ingredientsData = response.data.ingredients;

        const ingredients = ingredientsData.map(ingredient => ({
          name: ingredient.name,
          quantity: ingredient.amount.metric.value
        }));

        setIngredientsData(ingredientsData);
        setIngredientsString(ingredients.map(ing => ing.name).join('+'));
        console.log(ingredients);

        axiosInstance.post('/calculate', { ingredients }).then((response) => { setMacronutrients(response.data); }); 
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleReconstructFood = () => {
    if (!foodName) return; 
    setLoading(true);
    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=10&apiKey=29bf45631c2f468c89e0b91f11c822d3`)
      .then((response) => {
        console.log("response.data:", response.data);
        setFlag(true);
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching ingredients:', error);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Food Recipe Search
      </Typography>

      {/* Cuisine Select Box */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="cuisine-select-label">Cuisine</InputLabel>
        <Select
          labelId="cuisine-select-label"
          value={selectedCuisine}
          onChange={handleCuisineChange}
          label="Cuisine"
        >
          {cuisines.map((cuisine) => (
            <MenuItem key={cuisine} value={cuisine}>
              {cuisine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Autocomplete for Food */}
      <Autocomplete
        freeSolo
        options={recipes}
        value={foodName}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for Food"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
          />
        )}
      />

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginBottom: '20px' }}
      >
        Search
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleReconstructFood}
        style={{ marginBottom: '20px' }}
      >
        Reconstruct Food
      </Button>

      {/* Loading Spinner */}
      {loading && <CircularProgress />}

      {/* Display Ingredients from the API */}
      {!loading && ingredientsData.length > 0 && !flag && (
        <>
          <IngredientDisplay ingredients={ingredientsData} />
          <MacronutrientTable macronutrients={macronutrients} />
        </>
      )}

      {/* Display Reconstructed Food List */}
      {!loading && recipe.length > 0 && flag && (
        <ReconstructedFoodList recipe={recipe} />
      )}
    </div>
  );
}

export default ReconstructFood;
