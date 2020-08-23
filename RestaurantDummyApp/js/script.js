$(function () {
	
	$("#navbarToggle").blur(function(event) {
		/* Act on the event */
		var screenWidth = window.innerWidth;
		if( screenWidth < 768 ){
			$("#collapsable-nav").collapse('hide');
		}	
	});

	$("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });	
});

(function (global) {
	
	var pr = {};


	var homeHTML = 'snippets/home-snippet.html';

	var categoriesTitleHTML = 'snippets/categories-title-snippet.html';

	var categoryHTML = 'snippets/category-snippet.html';

	var allCategoriesURL = 'https://davids-restaurant.herokuapp.com/categories.json';

	var menuItemsURL = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=';

	var menuItemsTitleHTML = 'snippets/menu-items-title.html';

	var menuItemHTML = 'snippets/menu-item.html';


	var insertHTML = function (selector,html) {
		let targetElement = document.querySelector(selector);
		console.log(targetElement);
		console.log(selector);
		targetElement.innerHTML =  html; 
	};

	var showLoading = function (selector) {
		let html = '<div class="text-center"><img src="images/ajax-loader.gif" height="30" width="30"></div>';
		insertHTML(selector,html);
	};

	function insertProperty(string , propName , propValue) {
		var propToReplace = "{{"+propName+"}}";

		string = string.replace(new RegExp(propToReplace,"g"),propValue);
		return string;
	}

	document.addEventListener("DOMContentLoaded",function (event) {
		
		showLoading("#main-content");

		$ajaxUtil.sendGetRequest(homeHTML,function (responseText) {
			insertHTML("#main-content",responseText);
		},false);


	});

	var switchMenuToActive = function () {
		var classes = document.querySelector("#navHomeButton").className;
		classes = classes.replace(new RegExp("active","g"),"");
		document.querySelector("#navHomeButton").className = classes;

		classes = document.querySelector("#navMenuButton").className;
		if(classes.indexOf("active")==-1){
			classes += " active";
			document.querySelector("#navMenuButton").className = classes;
		}
	};
	pr.loadMenuCategories = function () {
		showLoading("#main-content");
		$ajaxUtil.sendGetRequest( allCategoriesURL , buildAndShowCategoriesHTML );
	};


	pr.loadMenuItems = function (categoryShort) {
		showLoading("#main-content");
		$ajaxUtil.sendGetRequest( menuItemsURL+categoryShort, buildAndShowMenuItemsHTML);
	};

	function buildAndShowCategoriesHTML(categories) {
		
		$ajaxUtil.sendGetRequest( categoriesTitleHTML , function ( categoriesTitleHTML ) {
			$ajaxUtil.sendGetRequest( categoryHTML , function ( categoryHTML ) {
				switchMenuToActive();
				var categoriesViewHTML = buildCategoriesViewHTML(categories,categoriesTitleHTML,categoryHTML);
				insertHTML("#main-content",categoriesViewHTML);
			},false);
		},false);
	}

	function buildAndShowMenuItemsHTML(menuItems) {
		
		$ajaxUtil.sendGetRequest( menuItemsTitleHTML , function ( menuItemsTitleHTML ) {
			$ajaxUtil.sendGetRequest( menuItemHTML , function ( menuItemHTML ) {
				var menuItemsViewHTML = buildMenuItemsViewHTML(menuItems,menuItemsTitleHTML,menuItemHTML);
				insertHTML("#main-content",menuItemsViewHTML);
			},false);
		},false);
	}

	function buildCategoriesViewHTML(categories,categoriesTitleHTML,categoryHTML) {
		var finalHTML = categoriesTitleHTML;
		finalHTML += "<section class=row>";
		var html,name,short_name;
		console.log(categories);
		for( let i = 0 ; i < categories.length ; i++ ){
			
			html = categoryHTML;
			name = categories[i].name;
			short_name = categories[i].short_name;
			html = insertProperty(html,"name",name);
			html = insertProperty(html,"short_name",short_name);
			finalHTML += html;
		}
		finalHTML += '</section>';
		return finalHTML;
	}

	function buildMenuItemsViewHTML(CategoryMenuItems,menuItemsTitleHTML,menuItemsHTML) {
		menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,"name", CategoryMenuItems.category.name);
		menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,"special_instructions", CategoryMenuItems.category.special_instructions);
		var finalHTML = menuItemsTitleHTML;
		finalHTML += "<section class='row'>";
		var html,name,short_name,description,catShortName,price_small,price_large,small_portion_name,large_portion_name;
		console.log(CategoryMenuItems);
		var menuItems = CategoryMenuItems.menu_items;
		console.log(menuItems);
		catShortName = CategoryMenuItems.category.short_name;
		
		for( let i = 0 ; i < menuItems.length ; i++ ){
			html = menuItemsHTML;
			name = menuItems[i].name;
			short_name = menuItems[i].short_name;
			price_small = menuItems[i].price_small;
			price_large = menuItems[i].price_large;
			small_portion_name = menuItems[i].small_portion_name;
			large_portion_name = menuItems[i].large_portion_name;
			description = menuItems[i].description;
			
			html = insertProperty(html,"name",name);
			html = insertProperty(html,"short_name",short_name);
			html = insertProperty(html,"description",description);
			html = insertItemPrice(html,"price_large",price_large);
			html = insertItemPrice(html,"price_small",price_small);
			html = insertProperty(html,"catShortName",catShortName);
			html = insertItemPortionName(html,"small_portion_name",small_portion_name);
			html = insertItemPortionName(html,"large_portion_name",large_portion_name);
		
			if(i%2==1){
				html += '<div class="clearfix visible-md-block visible-lg-block"></div>';
			}
			finalHTML += html;
		}
		finalHTML += '</section>';

		return finalHTML;
	}

	function insertItemPrice(html,pricePropName,priceValue) {
		if(!priceValue){
			return insertProperty(html,pricePropName,"");
		}
		priceValue = "$" + priceValue.toFixed(2);
		return insertProperty(html,pricePropName,priceValue);
	}

	function insertItemPortionName(html,portionPropName,portionValue) {
		if(!portionValue){
			return insertProperty(html,portionPropName,"");
		}
		portionValue = "(" + portionValue + ")";
		return insertProperty(html,portionPropName,portionValue);
	}



	global.$pr = pr;

})(window);

