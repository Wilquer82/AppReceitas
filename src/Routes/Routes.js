import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import RecipesFoods from '../Pages/RecipesFoods';
import RecipesDrinks from '../Pages/RecipesDrinks';
import Profile from '../Pages/Profile';
import RecipesDone from '../Pages/RecipesDone';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import ExploreFoodOrigin from '../Pages/ExploreFoodOrigin';
import ExploreDrinksIngredients from '../Pages/ExploreDrinksIngredients';
import ExploreFoodsIngridients from '../Pages/ExploreFoodsIngredients';
import ExploreDrinks from '../Pages/ExploreDrinks';
import ExploreFoods from '../Pages/ExploreFoods';
import Explore from '../Pages/Explore';
import DrinkDetails from '../Pages/DrinkDetails';
import ProcessFoods from '../Pages/ProcessFoods';
import ProcessDrinks from '../Pages/ProcessDrinks';
import FoodDetails from '../Pages/FoodDetails';
import NotFound from '../Components/NotFound';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ RecipesFoods } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <FoodDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DrinkDetails { ...props } /> }
        />
        <Route exact path="/bebidas/" component={ RecipesDrinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsIngridients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodOrigin } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipesDone } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ ProcessFoods }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ ProcessDrinks }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          component={ NotFound }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
