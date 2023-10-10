const tabs = {
	"About": 'home',
	"Articles": 'my_articles',
  "Resources": 'resources',
	//"Projects": 'projects',
	"My Art": 'my_art',
	"Contact me": 'contact_me'
};

const colorTransparent = {
	"lowGrey" : 'rgba(50,50,50,0.3)',
	"lowWine" : 'rgba(180,120,150,0.15)'
}

const color = {
	"grey" : 'rgb(50,50,50)',
	"wine" : '#550a0a',
	"lowWine": 'rgb(160,20,10)'
}

const tagColor = {
  "Data Report": 'cornflowerblue',
  'Web Article': 'blanchedalmond',
}

const myArtItems = [
  'arahi.jpg',
  'eye.jpg',
  'karen.jpg',
  'karen_medico.jpg',
  'luciano.jpg',
  'suki.jpg',
  'the-clown.jpg',
]

const articles = {
	"cosmological-constant": "https://melanynadine.github.io/my-articles/cosmological_constant.html",
  "coronavirus": "https://melanynadine.github.io/my-articles/coronavirus_outbreak_pdf.html",
}

const resourcesFolders = {
  "Useful Code Pieces": "resources/useful_code_pieces.html",
  "Non-Imperial Library of Mine": 'https://mega.nz/folder/b4Yh3JAJ#1SEqPYHc31VX-I6sfcwSmA',
}


/* *******************************************
/*              URLS variables
******************************************/

const mail =  "melany_nadine@hotmail.com";
let currentUrl = window.location.href;


/* ******************************************
/*			RESPONSIVE LAYOUT GENERAL VARIABLES
*********************************************/


var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var screenHeight = window.screen.height;
var gap = screenHeight - windowHeight;
var mobileBodyWidth = window.matchMedia("(max-width: 700px)");

/* ******************************************
/*			CSS VARIABLES
*********************************************/

document.documentElement.style.setProperty('--innerHeight', windowHeight-gap+'px');

/* ******************************************
/*			FUNCTIONS AND CLASSES
*********************************************/


const getYear = () => {
  const currentTime = new Date();
  document.getElementById("year").innerHTML = currentTime.getFullYear();
}

/* ******************************************
/
/ 	  					HEADER
/
*********************************************/

const frontEnd = () => {
  let home = document.getElementById("home_section");
  if(!currentUrl.includes('?')){
    home.style.display='block';
  }
  getYear();
  nav();
}

const nav = () => {
	let navBarItems = document.getElementById("nav-bar");
  let hamburger = document.querySelector("#hamburger");
	let nav = new Nav(navBarItems, hamburger);
	return nav.layout();
}

/* ******************************************
/
/ 	  				WHOLE WEBSITE
/
*********************************************/

const home = () => {
	let home = document.getElementById("home_section");
  home.style.display='block';
}

const my_articles = () => {

	// ARTICLES SECTION LAYOUT
	let articlesSection = document.getElementById("my_articles_section");
  responsiveDisplay(articlesSection, "block", "grid");

	// FETCH ARTICLES

  Object.keys(articles).forEach(fetchArticle, this);

  function fetchArticle(key){
    xmlRequest(articlesSection, articles[key], key);
  }
}

const resources = () => {
  let myResources = document.getElementById("resources_section");
	myResources.style.display = "flex";
  let buttons = document.getElementById("buttons");

  function sortObject(folders) {
    return Object.keys(folders).sort().reduce(function (result, key) {
      result[key] = folders[key];
      return result;
    }, {});
  }	

  let sortedFolders =  sortObject(resourcesFolders);

  Object.entries(sortedFolders).forEach(([key, value])=>{
    buttons.innerHTML += `<a target="_blank" href="${value}"><li>${key}</li></a>`;   
  });

}

const projects = () => {
	let projects = document.getElementById("projects_section");
	projects.style.display = "block";

}

const my_art = () => {
	let myArtUrl = 'https://melanynadine.github.io/blog/my_art/';
  let artSection = document.getElementById("my_art_section");
  responsiveDisplay(artSection, "block", "grid");
  myArtItems.map( item => artSection.innerHTML += '<div><img src="'+myArtUrl+item+'"></div>'
  );
}

const contact_me = () => {
  let contactSection = document.getElementById("contact_me_section");
  contactSection.style = 'display:flex;align-items:center;justify-content:center;';
  contactSection.innerHTML += '<div class="contact_window"><p>Feel free to send me an email to the following direction:</p><a href="mailto:'+mail+'">'+mail+'</a></div>'
}

const responsiveDisplay = (node, displayOption1, displayOption2) => {
  let option1 = "node.style = 'display:'+displayOption1+';' ";  
  let option2 = " node.style = 'display:'+displayOption2+';' ";
  windowWidth <= 700 ? eval(option1) : eval(option2);
  mobileBodyWidth.addListener(ifWidthChanges);
  function ifWidthChanges(){
    mobileBodyWidth.matches ?  eval(option1) : eval(option2);
  }
}

const informativeTextBox = (id, title) => {
  let htmlObject = document.getElementById(id);
  let htmlInfoObject = `<p id="info-text" >${title}</p>`;
  htmlObject.innerHTML += htmlInfoObject;
  htmlObject.onmouseout = function() {document.getElementById("info-text").remove()};
}

class Nav {
	constructor(navBar, hamburger){
		this.navBar = navBar;
    this.hamburger = hamburger;
	}

	addButton(value){
		this.navBar.innerHTML += '<a href="?'+tabs[value]+'" onclick='+tabs[value]+'()><li id="'+tabs[value]+'">'+value+'</li></a>';
	}

  identifyActiveTab(){
    let tabStartsAt = currentUrl.indexOf('?')+1;
    let tab = currentUrl.slice(tabStartsAt);
		let activeTab = this.navBar.querySelector(`#${tab}`);
		activeTab.style.borderBottom = `2px solid ${color['lowWine']}`;
    eval(tab+"()");
  }

  createNavBar(){
  	Object.keys(tabs).forEach(this.addButton, this);
    this.identifyActiveTab();
  }
	
	fillHamburger(){
		let hamburgerItems = "";
		for (let i=0; i<3; i++){
			hamburgerItems += '<li style="border-radius:5px;border:calc(1.5px + 0.2vw) solid '+color["wine"]+';margin:1vw;"></li>';
		}
    this.hamburger.innerHTML += hamburgerItems;
		return this.hamburger;
	}

  addHamburguerFunctionality(){
    this.hamburger.addEventListener('click', ifHamburgerGetsClicked);
    function ifHamburgerGetsClicked(){
      document.getElementById("hamburger").style = 'display:none';
      let navBar = document.getElementById("nav-bar");
      responsiveDisplay(navBar, "block", "flex");
      navBar.style = 'display:block';
    }
  }

	layout(){
		this.createNavBar();
    this.fillHamburger();
		this.addHamburguerFunctionality();
	}
}

/*---------------------------------
/				Articles XHR Request
---------------------------------*/


const xmlRequest = (body, url, key) => {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", () => {
    var xhrResponse = xhr.responseText;
		let article = new Article(body, xhrResponse, url, key);
		return article.layout();
  });
	xhr.open("GET", url);
	xhr.send();
	return this.request;
}

class Article {

	constructor(body,article, url, key){
		this.body = body;
		this.article = article;
		this.url = url;
    this.id = key;
	}

	getImage(){
		let article = this.article;
		let startPoint = article.indexOf('"imageURL":');
		let endPoint = article.indexOf(',', startPoint);
		let imageURL = article.slice(startPoint+13, endPoint-1);
		return imageURL;
	}

	getTitle(){
		let article = this.article;
		let startPoint = article.indexOf('"title":');
		let endPoint = article.indexOf(',', startPoint);
		let title = article.slice(startPoint+10, endPoint-1);
		return title;
	}

	getDescription(){
		let article = this.article;
		let startPoint = article.indexOf('"description":');
		let endPoint = article.indexOf(',', startPoint);
		let description = article.slice(startPoint+16, endPoint);
		description = description.replace(/\\/g, "");
		return description;
	}

	getTag(){
		let article = this.article;
		let startPoint = article.indexOf('"tag":');
		let endPoint = article.indexOf(',', startPoint);
		let tag = article.slice(startPoint+8, endPoint-1);
		tag = tag.replace(/\\/g, "");
		return tag;
	}

	getSiteName(){
		let article = this.article;
		let startPoint = article.indexOf('"site_name":');
		let endPoint = article.indexOf(',', startPoint);
		let siteName = article.slice(startPoint+14, endPoint-1);
		return siteName;
	}

  title(wholeTitle){
    if (wholeTitle.length > 33){
      let lastWordLimit = wholeTitle.lastIndexOf(" ", 33); 
      wholeTitle = wholeTitle.replace(wholeTitle.substring(lastWordLimit), " (...)");  
    }
    return wholeTitle;
  }

	layout(){

    let wholeTitle = this.getTitle();
    let tag = this.getTag();
    
		this.body.innerHTML += 
    `<a href="${this.url}" target="_blank">
      <div class="container">
        <p class="tag" style="background-color:${tagColor[tag]}">${tag}</p>
        <img src="${this.getImage()}" width="100%">
        <h4 onMouseOver="informativeTextBox('${this.id}','${wholeTitle}')" id="${this.id}">${this.title(wholeTitle)}</h4>
        <p>${this.getDescription()}</p>
        <span style="display:flex">
          <img id="link_img" src="https://cdn1.iconfinder.com/data/icons/digital-marketing-43/64/16-512.png">
          <h5>${this.getSiteName()}</h5>
        </span>
      </div>
    </a>
    `;

	}

}