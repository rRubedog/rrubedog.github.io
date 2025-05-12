// Main variables
let cookies = 0;
let perClick = 1;
let perSec = 0;

// Buildings prices and count array
// items: 0=building name 1=building price 2=building count 3=I forgor 4=perSec increase 
const clickerData = new Array("clicker", 15, 0, 5, 1);
const chefData = new Array("chef", 100, 0, 15, 5);
const farmData = new Array("farm", 1100, 0, 30, 100);

// DOM variables
let perSecDOM = document.getElementById('per-sec-count');
let cookiesDOM = document.getElementById('total-cookies');

// Convert total cookies so the number can't just go '10e+1000'
function convertDOMCooies(){
  let displayCookie = cookies;
  let totalCookiesNum = document.getElementById("total-cookies-num");
  if(cookies >= 1000000){
    //   Millions
    displayCookie = cookies / 1000000;
    displayCookie = Math.round(displayCookie * 1000) / 1000;
    totalCookiesNum.innerHTML = ' Million';
    cookiesDOM.innerHTML = displayCookie;
    document.title = displayCookie + ' Cookies | TimmWeb';
  }
  if(cookies >= 100000){
    //   Thousands
    displayCookie = cookies / 1000000;
    displayCookie = Math.round(displayCookie * 1000) / 1000;
    totalCookiesNum.innerHTML = ' Hundred Thousand';
    cookiesDOM.innerHTML = displayCookie;
    document.title = displayCookie + ' Cookies | TimmWeb';
  }
  if(cookies >=0 && cookies < 100000){
    //   Else
    cookiesDOM.innerHTML = cookies;
    document.title = cookies + ' Cookies | TimmWeb';
    totalCookiesNum.innerHTML = '';
  }
}

// onClick functions
let bigCookie = document.querySelector('.big-cookie');

bigCookie.addEventListener('click', function(){
  cookies += perClick;
  convertDOMCooies();
});

// Buy buildings onClick functions
let buyClicker = document.getElementById('clicker');
let buyChef = document.getElementById('chef');
let buyFarm = document.getElementById('farm');

buyClicker.addEventListener("click", function(){
  updateBuildings(clickerData);
});

buyChef.addEventListener("click", function(){
  updateBuildings(chefData);
});

buyFarm.addEventListener("click", function(){
  updateBuildings(farmData);
});

// Update building price and count and update total cookies
function updateBuildings(item){
  if(cookies >= item[1]){
    cookies -= item[1];
    convertDOMCooies();
    perSec += Math.floor(item[4]);
    perSecDOM.innerHTML = perSec;
    addCookiesPerSec();
    item[2] += 1;
    item[1] += item[3];
    item[3] = Math.floor(item[3] * 1.1);
    let buildName = item[0];
    document.getElementById(buildName + '-count').innerHTML = item[2];
    document.getElementById(buildName + '-price').innerHTML = item[1]; 
  }
}

let cookieTime = setInterval(function(){
  let helloWorld = "hello world";
}, 1000);

function addCookiesPerSec(){
  let cookieInterval = 1000 / perSec;
  let cookieInc = 1;
  
  if(perSec >= 100){
    cookieInterval = 100;
    cookieInc = perSec - 1000;
  }
  
  if(cookies >= 100000){
    cookieInterval = 500;
    cookieInc = perSec / 2;
  }
  
  clearInterval(cookieTime);
  cookieTime = setInterval(function(){
    cookies += cookieInc;
    convertDOMCooies();
  }, Math.floor(cookieInterval));
}

document.getElementById("goback").addEventListener("click", () => {
  history.back();
});