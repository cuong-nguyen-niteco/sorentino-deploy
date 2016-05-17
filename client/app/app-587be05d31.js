'use strict';

angular.module('sorentinoApp', ['sorentinoApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'jkuri.gallery', 'ckeditor']).config(["$urlRouterProvider", "$locationProvider", "$stateProvider", function ($urlRouterProvider, $locationProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  }).state('product', {
    url: '/product/:id',
    templateUrl: 'app/product/product.html',
    controller: 'ProductController',
    controllerAs: 'prodCtrl'
  }).state('collection', {
    url: '/collection/:id',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  }).state('create-edit-product', {
    url: '/admin/create-edit-product',
    templateUrl: 'app/admin/create-product.html',
    controller: 'CreateProductController',
    controllerAs: 'cpCtrl',
    params: { product: null }
  }).state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    controllerAs: 'adminCtrl'
  });

  $locationProvider.html5Mode(true);
}]);
//# sourceMappingURL=app.js.map

'use strict';

angular.module('sorentinoApp.util', []);
//# sourceMappingURL=util.module.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AdminController = function () {
    AdminController.$inject = ["$http", "$state", "$stateParams"];
    function AdminController($http, $state, $stateParams) {
      var _this = this;

      _classCallCheck(this, AdminController);

      this.products = [];
      this.$http = $http;
      this.$state = $state;

      this.$http.get('/api/product/all').then(function (response) {
        _this.products = response.data.data;
      });
    }

    _createClass(AdminController, [{
      key: 'onDelete',
      value: function onDelete(product) {
        if (confirm("Delete this product?")) {
          this.$http.post("/api/product/delete", { product: product }).then(function (response) {
            console.log(response.data);
            product.hide = true;
          });
        }
      }
    }, {
      key: 'onEdit',
      value: function onEdit(product) {
        this.$state.go("create-edit-product", { product: product });
      }
    }, {
      key: 'onCreate',
      value: function onCreate() {
        this.$state.go("create-edit-product", { product: null });
      }
    }]);

    return AdminController;
  }();

  angular.module('sorentinoApp').controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var CreateProductController = function () {
    CreateProductController.$inject = ["$http", "$stateParams", "$state"];
    function CreateProductController($http, $stateParams, $state) {
      var _this = this;

      _classCallCheck(this, CreateProductController);

      this.editorOptions = {
        language: 'en',
        allowedContent: true,
        entities: false
      };
      this.specDesc = "";
      this.specDetail = "";
      this.specMat = "";

      this.imageRoot = '/assets/images/products/';
      this.$http = $http;
      this.$state = $state;
      this.$stateParams = $stateParams;

      this.specDescShow = true;
      this.specDetailShow = false;
      this.specMatShow = false;

      this.isEditingMode = !!$stateParams.product;
      this.product = this.isEditingMode ? $stateParams.product : {};
      this.collectionModel = {};
      this.collections = [];
      this.colors = [];
      this.selectedColor = {};

      if (this.product.collections) {
        this.product.collections.forEach(function (item) {
          _this.collectionModel[item] = item;
        });
      }

      if (this.product.colors) {
        this.product.colors.forEach(function (item, idx) {
          var color = angular.copy(item);
          color.imageDisplay = "";
          color.id = idx + 1;
          color.images.forEach(function (ele) {
            color.imageDisplay += ele.replace(_this.imageRoot, "") + ";";
          });
          _this.colors.push(color);
        });
      }

      if (this.product.spec) {
        this.specDesc = this.product.spec.description;
        this.specDetail = this.product.spec.details;
        this.specMat = this.product.spec.material;
      }

      this.$http.get('/api/constant/collection').then(function (response) {
        _this.collections = response.data.collections;
      });
    }

    _createClass(CreateProductController, [{
      key: 'changeSpecDescShow',
      value: function changeSpecDescShow() {
        this.specDescShow = !this.specDescShow;
      }
    }, {
      key: 'getTemplate',
      value: function getTemplate(color) {
        if (color.id === this.selectedColor.id) return 'edit';else return 'display';
      }
    }, {
      key: 'addColor',
      value: function addColor() {
        var newColor = { id: this.colors.length + 1, name: '', images: '' };
        this.colors.push(newColor);
        this.selectedColor = angular.copy(newColor);
      }
    }, {
      key: 'editColor',
      value: function editColor(color) {
        this.selectedColor = angular.copy(color);
      }
    }, {
      key: 'deleteColor',
      value: function deleteColor(color) {
        if (confirm("Delete this color?")) {
          for (var i = 0; i < this.colors.length; i++) {
            if (this.colors[i].id === color.id) {
              this.colors.splice(i, 1);
            }
          }
        }
      }
    }, {
      key: 'saveColor',
      value: function saveColor(idx) {
        this.colors[idx] = angular.copy(this.selectedColor);
        this.reset();
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.selectedColor = {};
      }
    }, {
      key: 'buildCollections',
      value: function buildCollections() {
        var collections = [];
        for (var item in this.collectionModel) {
          if (this.collectionModel[item] !== false) {
            collections.push(item);
          }
        }
        return collections;
      }
    }, {
      key: 'buildColorImages',
      value: function buildColorImages() {
        var colors = [];
        var root = this.imageRoot;
        this.colors.forEach(function (item) {
          if (item.name && item.code && item.imageDisplay) {
            (function () {
              var color = {};
              color.name = item.name;
              color.code = item.code;
              color.images = [];
              item.imageDisplay.split(';').forEach(function (image) {
                if (image) {
                  color.images.push('' + root + image.trim());
                }
              });
              colors.push(color);
            })();
          }
        });
        return colors;
      }
    }, {
      key: 'buildSpec',
      value: function buildSpec() {
        return {
          description: this.specDesc,
          details: this.specDetail,
          material: this.specMat
        };
      }
    }, {
      key: 'submitProduct',
      value: function submitProduct() {
        var _this2 = this;

        this.product.collections = this.buildCollections();
        this.product.colors = this.buildColorImages();
        this.product.spec = this.buildSpec();

        if (this.isEditingMode) {
          this.$http.post('/api/product/edit', { product: this.product }).then(function (response) {
            _this2.$state.go("admin");
          });
        } else {
          this.$http.post('/api/product/add', this.product).then(function (response) {
            _this2.$state.go("admin");
          });
        }
      }
    }]);

    return CreateProductController;
  }();

  angular.module('sorentinoApp').controller('CreateProductController', CreateProductController);
})();
//# sourceMappingURL=create-product.controller.js.map

"use strict";

(function (angular, undefined) {
	angular.module("sorentinoApp.constants", []).constant("appConfig", {
		"userRoles": ["guest", "user", "admin"]
	});
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    MainController.$inject = ["$http", "$stateParams", "$state"];
    function MainController($http, $stateParams, $state) {
      var _this = this;

      _classCallCheck(this, MainController);

      this.showSortBy = false;
      this.$http = $http;
      this.selectedSortBy = { id: -1, name: "" };

      this.collectionId = parseInt($stateParams.id);
      this.collection = { id: -1, name: "All Bags" };

      if (isNaN(this.collectionId)) {
        $state.go("main");
      }

      this.sortBy = [{
        id: 1,
        name: "Price: Low To High"
      }, {
        id: 2,
        name: "Price: High To Low"
      }];

      this.items = [];
      this.pagination = {
        page: 1,
        pageSize: 8,
        totalHit: 0
      };

      this.currItems = [];

      this.$http.get('/api/product/all').then(function (response) {
        if (_this.collectionId) {
          (function () {
            var collectionIdTmp = _this.collectionId;
            var itemsTmp = _this.items;

            response.data.data.forEach(function (item) {
              if (item.collections.indexOf(collectionIdTmp) != -1) {
                itemsTmp.push(item);
              }
            });
          })();
        } else {
          _this.items = response.data.data;
        }
        _this.pagination.totalHit = _this.items.length;
        _this.currItems = _this.items.slice(0, _this.pagination.page * _this.pagination.pageSize);
      });

      this.$http.get('/api/constant/collection').then(function (response) {
        var collectionTmp = void 0;
        if (_this.collectionId) {
          (function () {
            var collectionIdTmp = _this.collectionId;
            response.data.collections.forEach(function (item) {
              if (collectionIdTmp == item.id) {
                collectionTmp = item;
              }
            });
          })();
        }
        if (collectionTmp) {
          _this.collection = collectionTmp;
        }
      });
    }

    _createClass(MainController, [{
      key: "showHideSortBy",
      value: function showHideSortBy(show) {
        this.showSortBy = show;
      }
    }, {
      key: "setSortBy",
      value: function setSortBy(item) {
        this.selectedSortBy = item;
        this.items.sort(function (a, b) {
          if (item.id == 1) {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
        this.pagination.page = 1;
        this.currItems = this.items.slice(0, this.pagination.page * this.pagination.pageSize);
      }
    }, {
      key: "loadMore",
      value: function loadMore() {
        var offset = this.currItems.length;
        this.pagination.page++;
        var newItems = this.items.slice(offset, this.pagination.page * this.pagination.pageSize);
        var currItemTmp = this.currItems;
        newItems.forEach(function (item) {
          currItemTmp.push(item);
        });
      }
    }]);

    return MainController;
  }();

  angular.module('sorentinoApp').controller('MainController', MainController);
})();
//# sourceMappingURL=main.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ProductController = function () {
    ProductController.$inject = ["$http", "$stateParams"];
    function ProductController($http, $stateParams) {
      var _this = this;

      _classCallCheck(this, ProductController);

      this.$http = $http;
      this.$stateParams = $stateParams;
      this.product = {};
      this.color = {};
      this.currColorName = "";

      this.mainImage = "";
      this.mainImageIndex = -1;
      this.imageGalerry = [];
      this.spec = "";
      this.specType = 1;

      this.$http.get('/api/product/' + this.$stateParams.id).then(function (response) {
        _this.product = response.data.product;
        _this.changeColor(_this.product.colors[0]);
        _this.spec = _this.product.spec.description;
        _this.specType = 1;
      });
    }

    _createClass(ProductController, [{
      key: "changeColor",
      value: function changeColor(color) {
        this.imageGalerry = [];
        this.color = color;
        this.currColorName = color.name;
        this.mainImage = this.color.images[0];
        this.mainImageIndex = 0;
        var imageGalerryTmp = this.imageGalerry;
        this.color.images.forEach(function (image) {
          imageGalerryTmp.push({
            thumb: "", img: image, description: ""
          });
        });
      }
    }, {
      key: "setMainImage",
      value: function setMainImage(image) {
        this.mainImage = image;
        this.mainImageIndex = this.color.images.indexOf(image);
      }
    }, {
      key: "setSpec",
      value: function setSpec(spec, specType) {
        this.spec = spec;
        this.specType = specType;
      }
    }]);

    return ProductController;
  }();

  angular.module('sorentinoApp').controller('ProductController', ProductController);
})();
//# sourceMappingURL=product.controller.js.map

'use strict';

angular.module('sorentinoApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController = function () {
  NavbarController.$inject = ["$http"];
  function NavbarController($http) {
    _classCallCheck(this, NavbarController);

    this.$http = $http;
    this.menu = [];
  }

  _createClass(NavbarController, [{
    key: '$onInit',
    value: function $onInit() {
      var _this = this;

      this.$http.get('/api/constant/menu').then(function (response) {
        _this.menu = response.data.menu;
        _this.$http.get('/api/constant/collection').then(function (response) {
          for (var i = 0; i < _this.menu.length; i++) {
            if (_this.menu[i].name.toLowerCase() === "collections") {
              _this.menu[i].items = response.data.collections;
              break;
            }
          }
        });
      });
    }
  }]);

  return NavbarController;
}();

angular.module('sorentinoApp').controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map

'use strict';

angular.module('sorentinoApp').directive('navbar', function () {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav',
    link: function link(scope, element) {
      element.addClass('nav-bar').addClass('nav-bar--fixed');
      $('navbar').headroom({
        'offset': 124, //$(window).height(),//TODO:get 100vh * 1.5
        'tolerance': {
          down: 0,
          up: 100
        },
        'classes': {
          'initial': 'animated'
          //'pinned': 'slideInDown',
          //'unpinned': 'slideOutUp'
        }
      });
    }
  };
});
//# sourceMappingURL=navbar.directive.js.map

'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  UtilService.$inject = ["$window"];
  function UtilService($window) {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */

      safeCb: function safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
      },


      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse: function urlParse(url) {
        var a = document.createElement('a');
        a.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (a.host === '') {
          a.href = a.href;
        }

        return a;
      },


      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin: function isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = origins && [].concat(origins) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (o) {
          return url.hostname === o.hostname && url.port === o.port && url.protocol === o.protocol;
        });
        return origins.length >= 1;
      }
    };

    return Util;
  }

  angular.module('sorentinoApp.util').factory('Util', UtilService);
})();
//# sourceMappingURL=util.service.js.map
angular.module("sorentinoApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/admin/_sidebar.html","<div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/create-edit-product\">Create New</a><a href=\"/\">Back To Home</a></div>");
  $templateCache.put("app/admin/admin.html","<section class=\"admin\"><div class=\"container\"><h2 class=\"admin__title\">All Products</h2><div class=\"col-xs-2\"><div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/create-edit-product\">Create New</a><a href=\"/\">Back To Home</a></div></div><div class=\"admin__content col-xs-9\"><div class=\"admin__content__menu row\"><a href=\"#\" ng-click=\"adminCtrl.onCreate()\"><div class=\"btn btn-success\">Create New</div></a></div><div class=\"admin__content__table row\"><table class=\"table table-bordered table-striped\"><thead><tr><th>Name</th><th>Price</th><th>Description</th><th>Collections</th><th>Colors</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"product in adminCtrl.products\" ng-if=\"!product.hide\"><td>{{product.name}}</td><td>{{product.price}}</td><td>{{product.description}}</td><td>{{product.collections}}</td><td><div ng-repeat=\"color in product.colors track by $index\" ng-style=\"{\'background-color\': color.code}\" title=\"{{color.name}}\" class=\"admin__color-square\"></div></td><td><button ng-click=\"adminCtrl.onEdit(product)\" title=\"Edit\"><span class=\"glyphicon glyphicon-edit text-warning\"></span></button><button ng-click=\"adminCtrl.onDelete(product)\" title=\"Delete\"><span class=\"glyphicon glyphicon-trash text-danger\"></span></button></td></tr></tbody></table></div></div></div></section>");
  $templateCache.put("app/admin/create-product.html","<div class=\"product-form\"><div class=\"container\"><h2 class=\"admin__title\">Create New Product</h2><div class=\"col-xs-2\"><div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/create-edit-product\">Create New</a><a href=\"/\">Back To Home</a></div></div><form class=\"col-xs-10\"><div class=\"form-group\"><label>Name</label><input required=\"required\" ng-model=\"cpCtrl.product.name\" class=\"form-control\"/></div><div class=\"form-group\"><label>Price</label><input type=\"number\" required=\"required\" placeholder=\"\" ng-model=\"cpCtrl.product.price\" class=\"form-control\"/></div><div class=\"form-group\"><label>Description</label><input required=\"required\" placeholder=\"\" ng-model=\"cpCtrl.product.description\" class=\"form-control\"/></div><div class=\"form-group\"><label class=\"product-form--block\">Collections</label><div ng-repeat=\"item in cpCtrl.collections track by $index\" class=\"product-form__checkbox\"><label class=\"checkbox-inline\">{{item.name}}<input type=\"checkbox\" ng-model=\"cpCtrl.collectionModel[item.id]\" ng-true-value=\"{{item.id}}\"/></label></div></div><div class=\"form-group\"><label>Colors</label><div class=\"product-form__buttons\"><button ng-click=\"cpCtrl.addColor()\"><span class=\"glyphicon glyphicon-plus text-success\">Add</span></button><span class=\"product-form__buttons--right\">Image Root: <strong>{{cpCtrl.imageRoot}}</strong></span></div><table class=\"table table-striped table-bordered\"><thead><tr><th class=\"col-md-3\">Name</th><th class=\"col-md-2\">Code</th><th class=\"col-md-5\">Images</th><th class=\"col-md-2\"></th></tr></thead><tbody><tr ng-repeat=\"color in cpCtrl.colors track by $index\" ng-include=\"cpCtrl.getTemplate(color)\"></tr></tbody></table></div><div class=\"form-group\"><label>Specifications</label><div class=\"product-form__sub-label\"><label>Description</label><a href=\"#\" ng-click=\"cpCtrl.specDescShow = !cpCtrl.specDescShow;\">{{cpCtrl.specDescShow ? \"Hide\" : \"Show\"}}</a></div><div ng-show=\"cpCtrl.specDescShow\"><div ckeditor=\"cpCtrl.editorOptions\" ng-model=\"cpCtrl.specDesc\" class=\"form-control\"></div></div><div class=\"product-form__sub-label\"><label>Details</label><a href=\"#\" ng-click=\"cpCtrl.specDetailShow = !cpCtrl.specDetailShow;\">{{cpCtrl.specDetailShow ? \"Hide\" : \"Show\"}}</a></div><div ng-show=\"cpCtrl.specDetailShow\"><div ckeditor=\"cpCtrl.editorOptions\" ng-model=\"cpCtrl.specDetail\" class=\"form-control\"></div></div><div class=\"product-form__sub-label\"><label>Material</label><a href=\"#\" ng-click=\"cpCtrl.specMatShow = !cpCtrl.specMatShow;\">{{cpCtrl.specMatShow ? \"Hide\" : \"Show\"}}</a></div><div ng-show=\"cpCtrl.specMatShow\"><div ckeditor=\"cpCtrl.editorOptions\" ng-model=\"cpCtrl.specMat\" class=\"form-control\"></div></div></div><div class=\"form-group\"><button type=\"submit\" ng-click=\"cpCtrl.submitProduct()\" class=\"btn btn-primary\">Submit</button></div></form></div></div><script id=\"display\" type=\"text/ng-template\"><td>{{color.name}}</td>\n<td>{{color.code}}<div class=\"product-form__square\" ng-style=\"{\'background-color\' : color.code}\"></div></td>\n<td>{{color.imageDisplay}}</td>\n<td>\n  <button ng-click=\"cpCtrl.editColor(color)\"><span class=\"glyphicon glyphicon-edit text-warning\"></span></button>\n  <button ng-click=\"cpCtrl.deleteColor(color)\"><span class=\"glyphicon glyphicon-trash text-danger\"></span></button>\n</td></script><script id=\"edit\" type=\"text/ng-template\"><td><input type=\"text\" ng-model=\"cpCtrl.selectedColor.name\" /></td>\n<td><input type=\"text\" ng-model=\"cpCtrl.selectedColor.code\" /></td>\n<td><input type=\"text\" ng-model=\"cpCtrl.selectedColor.imageDisplay\" /></td>\n<td>\n  <button ng-click=\"cpCtrl.saveColor($index)\"><span class=\"glyphicon glyphicon-ok text-success\"></span></button>\n  <button ng-click=\"cpCtrl.reset()\"><span class=\"glyphicon glyphicon-remove text-danger\"></span></button>\n</td></script>");
  $templateCache.put("app/main/main.html","<navbar></navbar><section style=\"background-image: url(/assets/images/main/banner.png);\" class=\"spotlight\"><div class=\"spotlight__content\"></div></section><div class=\"main\"><div class=\"main__header\"><h2 class=\"main__header__title\">{{main.collection.name}}</h2><div class=\"main__header__description\">What\'s your style? Find your perfect bag from our selection of shoulder bags, satchels, totes and more.</div></div><div class=\"main__content\"><a href=\"#\" ng-click=\"main.showHideSortBy(!main.showSortBy)\"><h6 ng-class=\"{\'main__content__header--border-bottom\': !main.showSortBy}\" class=\"main__content__header\"><span>Sort By {{main.selectedSortBy.name}}</span><i aria-hidden=\"true\" class=\"fa fa-caret-down\"></i><ul ng-show=\"main.showSortBy\"><li ng-repeat=\"item in main.sortBy\" ng-click=\"main.setSortBy(item)\">{{item.name}}</li></ul></h6></a><div ng-class=\"{\'main__mask--hide\': !main.showSortBy}\" ng-click=\"main.showHideSortBy(false)\" class=\"main__mask\"></div><div class=\"main__content__grid\"><a ng-repeat=\"item in main.currItems track by $index\" href=\"/product/{{item._id}}\"><div ng-if=\"item.colors &amp;&amp; item.colors.length &gt; 0\" class=\"main__content__grid__item col-sm-4 col-md-3\"><img src=\"{{item.colors[0].images[0]}}\" alt=\"\"/><div class=\"main__content__grid__item__info\"><h5 class=\"main__content__grid__item__info__title\">{{item.name}}</h5><div class=\"main__content__grid__item__info__description\">{{item.description}}</div><div class=\"main__content__grid__item__info__price\">{{item.price | currency: \"\" : 0}} VND</div></div></div></a></div><div ng-click=\"main.loadMore()\" ng-if=\"main.pagination.page * main.pagination.pageSize &lt; main.pagination.totalHit\" class=\"btn main__content__loadmore\">See More</div></div></div><footer></footer>");
  $templateCache.put("app/main/spotlight.html","<section style=\"background-image: url(/assets/images/main/banner.png);\" class=\"spotlight\"><div class=\"spotlight__content\"></div></section>");}]);
