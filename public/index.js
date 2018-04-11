const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", callback);

  request.send();
};

const requestComplete = function(){
if(this.status !== 200) return;

const jsonString = this.responseText;
debugger;
const brews = JSON.parse(jsonString);

populateSelect(brews)
getBeer(brews)
};

const populateSelect = function(brews){
  const select = document.getElementById("beer-list");
  brews.forEach(function(beer, index){
    let option = document.createElement('option');
    option.innerText = beer.name
    option.value = index
    select.appendChild(option);

  })
};

const getIngredients = function(beer){
  const div = document.getElementById('ingredients');
  clearContent(div)
  const hops = beer.ingredients.hops;
  hops.forEach(function(hop, index){
    let p = document.createElement('p');
    p.innerText = hop.name
    p.value = index
    div.appendChild(p);
  })
}

const getBeer = function(brews){
  const selected = document.querySelector('select');
  selected.addEventListener('change', function(){
    let beer = brews[this.value]
    save(beer);
    getDetails(beer);
    getIngredients(beer);
  })
}

const getDetails = function(beer){
  const div = document.getElementById('details')
  clearContent(div)
  const name = document.createElement('p')
  name.innerText = `Name: ${beer.name}`
  const tag = document.createElement('p')
  tag.innerText = `${beer.tagline}`
  const abv = document.createElement('p')
  abv.innerText = `ABV: ${beer.abv}`
  const des = document.createElement('p')
  des.innerText = ` ${beer.description}`
  const pair = document.createElement('p')
  pair.innerText = `Food Pairing: ${beer.food_pairing[0]}`
  const img = document.createElement('img')
  img.src = beer.image_url
  div.appendChild(name);
  div.appendChild(tag);
  div.appendChild(abv);
  div.appendChild(des);
  div.appendChild(pair);
  div.appendChild(img);
  return div;
};

const save = function(beer){
  const jsonString = JSON.stringify(beer);
  localStorage.setItem('currentBeer', jsonString);
}

const clearContent = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

var app = function(){
  const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json";
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
