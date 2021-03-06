import { renderAddedFavoriteRecipe } from '../components/favorite.js';



const saveRecipe = recipe => {
  let recipesList = JSON.parse(localStorage.getItem('allRecipe')) || [];
  recipesList.push(recipe);
  return localStorage.setItem('allRecipe', JSON.stringify(recipe));
}


const searchRecipe = e => {
  e.preventDefault();
  let recipes = JSON.parse(localStorage.getItem('allRecipe'));
  let result = [];

  recipes.forEach( recipe => {

    let searchInput = document.querySelector('[type="search"]').value;

    if (recipe.name.startsWith(searchInput)) {
      result.push(recipe);
    }

    searchInput = '';
  })

  return renderSearchResult(result);
}


const renderSearchResult = result => {

  if (result.length === 0) {

    document.querySelector('.home__container').innerHTML =
    `
      <div class="wrapper">
        <h2 class="error-msg">Not recipes found with that name 🚫 </h2>
        <a href="/">
          <span id="close-search" class="material-icons close-icon">cancel</span>
        </a>
      </div>
    `;

  } else {

    document.querySelector('.home__container').innerHTML =
      `
        <div class="home__container__title">
          <h3>Recipes found:</h3>
          <a href="/">
            <span id="close-search" class="material-icons close-icon">cancel</span>
          </a>
        </div>
        <div class="home__container__body">
          <div class="home__container__carousel">
            <div id="result" class="carousel no-slide"></div>
          </div>
        </div>
      `;
  }

  result.forEach(recipe => {

    let div = document.createElement('div');
    div.className = 'result';
    div.id = recipe.name;

    if (recipe.favorite === true) {

      div.innerHTML =
      `
        <a href="#">
          <img src="${recipe.image}" alt="food">
        </a>
        <div class="result__details">
          <h4>${recipe.name}</h4>
          <button type="button" class="favorite-btn">
            <span class="material-icons">favorite</span>
          </button>
        </div>
      `;

    } else {

      div.innerHTML =
        `
          <a href="#">
            <img src="${recipe.image}" alt="food">
          </a>
          <div class="result__details">
            <h4>${recipe.name}</h4>
            <button type="button" class="favorite-btn">
              <span class="material-icons">favorite_border</span>
            </button>
          </div>
        `;
    }

    document.querySelector('.carousel.no-slide').appendChild(div);

  })
}


const renderRecipe = () => {
  let recipes = JSON.parse(localStorage.getItem('allRecipe'));

  recipes.forEach( el => {
    let div = document.createElement('div');
    div.className = 'recipe';
    div.id = el.name;

    if (el.favorite === true) {

      div.innerHTML =
      `
        <a href="#">
          <img src="${el.image}" alt="food">
        </a>
        <div class="recipe__details">
          <h3>${el.name}</h3>
          <button type="button" class="favorite-btn" >
            <span id="${el.name}" class="material-icons">favorite</span>
          </button>
        </div>
      `;

    } else {

      div.innerHTML =
      `
        <a href="#">
          <img src="${el.image}" alt="food">
        </a>
        <div class="recipe__details">
          <h3>${el.name}</h3>
          <button type="button" class="favorite-btn" >
            <span id="${el.name}" class="material-icons">favorite_border</span>
          </button>
        </div>
      `;
    }


    switch (el.category) {
      case 'healthy and veggy':
        document.getElementById('healthy').appendChild(div);
        break;
      case 'international':
        document.getElementById('international').appendChild(div);
        break;
      case 'meat lover':
        document.getElementById('meat').appendChild(div);
        break;
      default:
        document.getElementById('popular').appendChild(div);
        break;
    }
  })
}


const renderRecipeDetails = e => {
  let recipes = JSON.parse(localStorage.getItem('allRecipe'));
  let card = document.querySelector('.recipe__card');

  if (e.path[0].className === 'material-icons') {
    return;
  }

  recipes.forEach(recipe => {
    if (recipe.name === e.path[2].id || recipe.name === e.path[1].id) {

      if (recipe.favorite === true) {

        card.innerHTML =
        `
          <div class="recipe__card__body">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe__card__title">
              <h2>${recipe.name}</h2>
              <button type="button" class="favorite-btn">
                <span class="material-icons">favorite</span>
              </button>
            </div>
            <div class="recipe__card__details">
              <div class="recipe__card__details__ingridients">
                <h4>Ingridients</h4>
                  <p>${recipe.ingridients}</p>
              </div>
              <div class="recipe__card__details__description">
                <h4>Description</h4>
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
          <span id="close-details" class="material-icons close-icon">cancel</span>
        `;

      } else {

        card.innerHTML =
        `
          <div class="recipe__card__body">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe__card__title">
              <h2>${recipe.name}</h2>
              <button type="button" class="favorite-btn">
                <span class="material-icons">favorite_border</span>
              </button>
            </div>
            <div class="recipe__card__details">
              <div class="recipe__card__details__ingridients">
                <h4>Ingridients</h4>
                  <p>${recipe.ingridients}</p>
              </div>
              <div class="recipe__card__details__description">
                <h4>Description</h4>
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
          <span id="close-details" class="material-icons close-icon">cancel</span>
        `;
      }
    }
  })

  card.classList.remove('hide');

  const closeDetailsIcon = document.getElementById('close-details');
  closeDetailsIcon.addEventListener('click', closeRecipeDetails);
}


const closeRecipeDetails = () => {
  let card = document.querySelector('.recipe__card');
  card.classList.add('hide');
}


const addNewRecipe = e => {
  const recipeName = document.getElementById('name');
  const recipeCategory = document.getElementById('category');
  const recipeIngridients = document.getElementById('ingridients');
  const recipeDescription = document.getElementById('description');
  const recipeAuthor = document.getElementById('author');
  const recipeImage = document.getElementById('image');

  let addedRecipe = {
    name: recipeName.value,
    category: recipeCategory.value,
    ingridients: recipeIngridients.value,
    description: recipeDescription.value,
    author: recipeAuthor.value,
    image: recipeImage.value,
    favorite: true,
  };

  e.preventDefault();

  let recipesFroStorage = JSON.parse(localStorage.getItem('allRecipe'));
  let recipes = [...recipesFroStorage];

  recipes.push(addedRecipe);

  localStorage.setItem('allRecipe', JSON.stringify(recipes));

  recipeName.value = '';
  recipeCategory.value = '';
  recipeIngridients.value = '';
  recipeDescription.value = '';
  recipeAuthor.value = '';
  recipeImage.value = '';

  renderRecipe();
  renderAddedFavoriteRecipe(addedRecipe);

}

export { saveRecipe, searchRecipe, renderRecipe, renderRecipeDetails, addNewRecipe };