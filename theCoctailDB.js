document.getElementById("button-addon2").addEventListener("click", () => {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  inputField.value = "";
  if (inputValue.length == 1) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;

    fetchData(url).then((data) => {
      console.log(data.drinks);
      displayData(data.drinks);
    });
  } else if (inputValue.length > 1) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;

    fetchData(url).then((data) => {
      console.log(data.drinks);
      displayData(data.drinks);
    });
  } else {
   

    const displayField = document.getElementById("diplay-container");
    displayField.innerHTML = ``;

    const singleDetails = document.getElementById("single-details");
    singleDetails.innerHTML = ``;

    singleDetails.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show w-75 mx-auto" role="alert">
         <strong>Please enter value!</strong> 
             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
  }
});

const fetchData = async (url) => {
  console.log(url);
  const res = await fetch(url);

  const data = await res.json();
  console.log(data);
  return data;
};

const displayData = (data) => {
  console.log(data);
  if (data !== null) {
    //   error message 
    const singleDetails = document.getElementById("single-details");
    singleDetails.innerHTML = ``;

    const displayField = document.getElementById("diplay-container");
    displayField.innerHTML = ``;


    data.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
            <div class="card h-100">
            <img src="${
              element.strDrinkThumb
            }" class="card-img-top" alt="..." />
            <div class="card-body">
              <h2 class="card-title">${element.strDrink}</h2>
              <h5>${element.strAlcoholic}</h5>
              <p class="card-text">
                ${element.strInstructions.slice(0, 100)}
              </p>

              
            </div>
            <div class="">
            <button id="details-button" onclick="getDetails('${element.idDrink}')"  type="button" class="btn btn-info m-3">See Details</button>
          </div>
          </div>
            
            `;
      displayField.appendChild(div);
    });
  } else {
    const displayField = document.getElementById("diplay-container");
    displayField.innerHTML = ``;

    const singleDetails = document.getElementById("single-details");
    singleDetails.innerHTML = ``;
    singleDetails.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show w-75 mx-auto" role="alert">
    <strong>Result Not Found!</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>
        `;
  }
};

const getDetails = (itemID) =>{
    console.log(itemID);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemID}`;
    console.log(url);

    fetchData(url).then((data) => {
        console.log(data.drinks[0]);
         displayDetailsData(data.drinks[0]);
      });

}

const displayDetailsData = (data) =>{
    window.scrollTo(0,40);
    const singleDetails = document.getElementById("single-details");
    singleDetails.innerHTML = ``;
    singleDetails.innerHTML = `
    <div class="row row-cols-md-2 row-cols-1  justify-content-center g-4">
    <div class="col">
      <div class="card">
        <img src="${data.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h2 class="card-title">${data.strDrink}</h2>
          <h5 class="">Ingridient</h5>
          <ul >
            <li>${data.strIngredient1}</li>
            <li>${data.strIngredient2}</li>
            <li>${data.strIngredient3}</li>
         </ul>
          <p class="card-text">${data.strInstructions.slice(0, 100)}</p>
        </div>
      </div>
    </div>
    </div>
        `;
}
