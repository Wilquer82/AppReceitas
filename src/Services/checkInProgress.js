const checkInProgress = () => {
  const initialObj = {
    cocktails: {},
    meals: {},
  };

  const lookForInProgress = localStorage.getItem('inProgressRecipes');

  if (!lookForInProgress) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialObj));
  }
};

export default checkInProgress;
