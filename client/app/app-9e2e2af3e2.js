"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}angular.module("sorentinoApp",["sorentinoApp.constants","ngCookies","ngResource","ngSanitize","ui.router","jkuri.gallery"]).config(["$urlRouterProvider","$locationProvider","$stateProvider",function(t,e,i){t.otherwise("/"),i.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("product",{url:"/product/:id",templateUrl:"app/product/product.html",controller:"ProductController",controllerAs:"prodCtrl"}).state("collection",{url:"/collection/:id",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),e.html5Mode(!0)}]),angular.module("sorentinoApp.util",[]),function(t,e){t.module("sorentinoApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();!function(){var t=function(){function t(e,i,n){var o=this;_classCallCheck(this,t),this.showSortBy=!1,this.$http=e,this.selectedSortBy={id:-1,name:""},this.collectionId=parseInt(i.id),this.collection={id:-1,name:"All Bags"},isNaN(this.collectionId)&&n.go("main"),this.sortBy=[{id:1,name:"Price: Low To High"},{id:2,name:"Price: High To Low"}],this.items=[],this.pagination={page:1,pageSize:8,totalHit:0},this.currItems=[],this.$http.get("/api/constant/product").then(function(t){o.collectionId?!function(){var e=o.collectionId,i=o.items;t.data.products.forEach(function(t){-1!=t.collections.indexOf(e)&&i.push(t)})}():o.items=t.data.products,o.pagination.totalHit=o.items.length,o.currItems=o.items.slice(0,o.pagination.page*o.pagination.pageSize)}),this.$http.get("/api/constant/collection").then(function(t){var e=void 0;o.collectionId&&!function(){var i=o.collectionId;t.data.collections.forEach(function(t){i==t.id&&(e=t)})}(),e&&(o.collection=e)})}return t.$inject=["$http","$stateParams","$state"],_createClass(t,[{key:"showHideSortBy",value:function(t){this.showSortBy=t}},{key:"setSortBy",value:function(t){this.selectedSortBy=t,this.items.sort(function(e,i){return 1==t.id?e.price-i.price:i.price-e.price}),this.pagination.page=1,this.currItems=this.items.slice(0,this.pagination.page*this.pagination.pageSize)}},{key:"loadMore",value:function(){var t=this.currItems.length;this.pagination.page++;var e=this.items.slice(t,this.pagination.page*this.pagination.pageSize),i=this.currItems;e.forEach(function(t){i.push(t)})}}]),t}();angular.module("sorentinoApp").controller("MainController",t)}();var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();!function(){var t=function(){function t(e,i){var n=this;_classCallCheck(this,t),this.$http=e,this.$stateParams=i,this.product={},this.color={},this.currColorName="",this.mainImage="",this.mainImageIndex=-1,this.imageGalerry=[],this.$http.get("/api/constant/product/"+this.$stateParams.id).then(function(t){n.product=t.data,n.changeColor(n.product.colors[0])})}return t.$inject=["$http","$stateParams"],_createClass(t,[{key:"changeColor",value:function(t){this.imageGalerry=[],this.color=t,this.mainImage=this.color.images[0],this.mainImageIndex=0;var e=this.imageGalerry;this.color.images.forEach(function(t){e.push({thumb:"",img:t,description:""})})}},{key:"setMainImage",value:function(t){this.mainImage=t,this.mainImageIndex=this.color.images.indexOf(t)}}]),t}();angular.module("sorentinoApp").controller("ProductController",t)}(),angular.module("sorentinoApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(t,e){e.addClass("footer")}}});var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),NavbarController=function(){function t(e){_classCallCheck(this,t),this.$http=e,this.menu=[]}return t.$inject=["$http"],_createClass(t,[{key:"$onInit",value:function(){var t=this;this.$http.get("/api/constant/menu").then(function(e){t.menu=e.data.menu,t.$http.get("/api/constant/collection").then(function(e){for(var i=0;i<t.menu.length;i++)if("collections"===t.menu[i].name.toLowerCase()){t.menu[i].items=e.data.collections;break}})})}}]),t}();angular.module("sorentinoApp").controller("NavbarController",NavbarController),angular.module("sorentinoApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav",link:function(t,e){e.addClass("nav-bar").addClass("nav-bar--fixed"),$("navbar").headroom({offset:124,tolerance:{down:0,up:100},classes:{initial:"animated"}})}}}),function(){function t(t){var e={safeCb:function(t){return angular.isFunction(t)?t:angular.noop},urlParse:function(t){var e=document.createElement("a");return e.href=t,""===e.host&&(e.href=e.href),e},isSameOrigin:function(i,n){return i=e.urlParse(i),n=n&&[].concat(n)||[],n=n.map(e.urlParse),n.push(t.location),n=n.filter(function(t){return i.hostname===t.hostname&&i.port===t.port&&i.protocol===t.protocol}),n.length>=1}};return e}t.$inject=["$window"],angular.module("sorentinoApp.util").factory("Util",t)}(),angular.module("sorentinoApp").run(["$templateCache",function(t){t.put("components/navbar/navbar.html",'<div class=\"nav-bar__first-line\"><div class=\"nav-bar__first-line__logo\"><div class=\"nav-bar__first-line__logo__img\"><a href=\"/\"><img src=\"http://placehold.it/300x300\" alt=\"\"/></a></div><h2 class=\"nav-bar__first-line__logo__name\">Sorentino</h2><div class=\"nav-bar__first-line__logo__menu\"><ul><li ng-repeat=\"item in nav.menu track by $index\"><a href=\"{{item.link}}\"><span ng-class=\"{\'nav-bar--active\': isActive(item.name)}\">{{item.name}}</span></a><div ng-class=\"{\'nav-bar__sub--show\': item.items &amp;&amp; item.items.length &gt; 0}\" class=\"nav-bar__sub\"><ul ng-if=\"item.items &amp;&amp; item.items.length &gt; 0\"><li ng-repeat=\"subItem in item.items track by $index\"><a href=\"/collection/{{subItem.id}}\"><span>{{subItem.name}}</span></a></li></ul></div></li></ul></div></div><h2 class=\"nav-bar__first-line__right-logo\">Sorentino</h2></div><div class=\"nav-bar__second-line\"><ul><li ng-repeat=\"item in nav.menu track by $index\"><a href=\"{{item.link}}\"><span ng-class=\"{\'nav-bar--active\': isActive(item.name)}\">{{item.name}}</span></a><div ng-class=\"{\'nav-bar__sub--show\': item.items &amp;&amp; item.items.length &gt; 0}\" class=\"nav-bar__sub\"><ul ng-if=\"item.items &amp;&amp; item.items.length &gt; 0\"><li ng-repeat=\"subItem in item.items track by $index\"><a href=\"/collection/{{subItem.id}}\"><span>{{subItem.name}}</span></a></li></ul></div></li></ul></div>'),t.put("app/main/main.html",'<section style="background-image: url(/assets/images/main/banner.png);" class="spotlight"><div class="spotlight__content"></div></section><div class="main"><div class="main__header"><h2 class="main__header__title">{{main.collection.name}}</h2><div class="main__header__description">What\'s your style? Find your perfect bag from our selection of shoulder bags, satchels, totes and more.</div></div><div class="main__content"><a href="#" ng-click="main.showHideSortBy(!main.showSortBy)"><h6 ng-class="{\'main__content__header--border-bottom\': !main.showSortBy}" class="main__content__header"><span>Sort By {{main.selectedSortBy.name}}</span><i aria-hidden="true" class="fa fa-caret-down"></i><ul ng-show="main.showSortBy"><li ng-repeat="item in main.sortBy" ng-click="main.setSortBy(item)">{{item.name}}</li></ul></h6></a><div ng-class="{\'main__mask--hide\': !main.showSortBy}" ng-click="main.showHideSortBy(false)" class="main__mask"></div><div class="main__content__grid"><a ng-repeat="item in main.currItems track by $index" href="/product/{{item.id}}"><div ng-if="item.colors &amp;&amp; item.colors.length &gt; 0" class="main__content__grid__item col-sm-4 col-md-3"><img src="{{item.colors[0].images[0]}}" alt=""/><div class="main__content__grid__item__info"><h5 class="main__content__grid__item__info__title">{{item.name}}</h5><div class="main__content__grid__item__info__description">{{item.description}}</div><div class="main__content__grid__item__info__price">{{item.price | currency: "" : 0}} VND</div></div></div></a></div><div ng-click="main.loadMore()" ng-if="main.pagination.page * main.pagination.pageSize &lt; main.pagination.totalHit" class="btn main__content__loadmore">See More</div></div></div>'),t.put("app/main/spotlight.html",'<section style="background-image: url(/assets/images/main/banner.png);" class="spotlight"><div class="spotlight__content"></div></section>'),t.put("app/product/product.html",'<div class="product"><div class="product__main col-xs-7"><ng-gallery images="prodCtrl.imageGalerry" thumbs-num="1"></ng-gallery><div class="product__main__list"><a href="#" ng-repeat="item in prodCtrl.color.images track by $index" ng-click="prodCtrl.setMainImage(item)"><img src="{{item}}" class="col-xs-2"/></a></div></div><div class="product__info col-xs-5"><h2 class="product__info__title">{{prodCtrl.product.name}}</h2><p class="product__info__description">{{prodCtrl.product.description}}</p><p class="product__info__price">{{prodCtrl.product.price | currency: "" : 0}} VND</p><div class="product__info__color--container"><p class="product__info__color__title">More Colors:</p><a ng-repeat="color in prodCtrl.product.colors" ng-click="prodCtrl.changeColor(color)" ng-style="{\'background-color\': color.code}" href="#" ng-class="{\'product__info__color--active\': prodCtrl.color.code == color.code}" ng-mouseover="prodCtrl.currColorName = color.name" ng-mouseleave="prodCtrl.currColorName = prodCtrl.color.name" class="product__info__color product__info__color--select"></a><div class="product__info__color__name">{{prodCtrl.currColorName}}</div></div><hr/><div class="product__info__spec"><ul class="product__info__spec__menu"><li class="product__info__spec__menu__item"><a href="#">Description</a></li><li class="product__info__spec__menu__item"><a href="#">Details</a></li><li class="product__info__spec__menu__item"><a href="#">Material</a></li></ul><hr/><div class="product__info__spec__description product__info__spec__description--active">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis ornare ipsum. Ut sed molestie diam. Mauris magna mi, pretium at purus id, pulvinar rutrum massa. Proin consequat justo ac lacus interdum, vitae scelerisque urna tincidunt. Donec ac maximus libero, et ultrices est. Curabitur quis cursus ligula, sed mattis ipsum.</div><div class="product__info__spec__description">Sed vitae tempus massa, eget congue ligula. Mauris scelerisque egestas enim nec auctor. Ut id nisi mauris. Quisque at metus odio. Sed vestibulum nisi vel elementum ultricies. Aenean id tellus eu nunc varius vestibulum sit amet non mauris. In semper mi arcu, nec commodo ligula varius non. Etiam eu feugiat erat.</div><div class="product__info__spec__description">Etiam elementum massa nibh, vel lacinia lorem imperdiet vel. Nam velit dolor, cursus et interdum quis, euismod mattis mi. Vivamus semper pharetra pulvinar. In ultrices arcu nunc, eu sagittis mi consectetur ut. Curabitur fringilla enim vitae ipsum ullamcorper, et laoreet augue dictum.</div></div></div></div>')}]);