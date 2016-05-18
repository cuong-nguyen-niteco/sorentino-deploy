'use strict';

angular.module('sorentinoApp', ['sorentinoApp.auth', 'sorentinoApp.admin', 'sorentinoApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'validation.match', 'jkuri.gallery', 'ckeditor']).config(["$urlRouterProvider", "$locationProvider", "$stateProvider", function ($urlRouterProvider, $locationProvider, $stateProvider) {
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
    authenticate: true,
    params: { product: null }
  }).state('about-us', {
    url: '/about-us',
    templateUrl: 'app/about-us/about-us.html',
    controller: 'AboutUsController',
    controllerAs: 'auCtrl'
  }).state('contact-us', {
    url: '/contact-us',
    templateUrl: 'app/contact-us/contact-us.html',
    controller: 'ContactUsController',
    controllerAs: 'cuCtrl'
  }).state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    controllerAs: 'adminCtrl',
    authenticate: 'admin'
  }).state('settings', {
    url: '/admin/settings',
    templateUrl: 'app/admin/settings/settings.html',
    controller: 'SettingsController',
    controllerAs: 'vm',
    authenticate: true
  }).state('about-us-admin', {
    url: '/admin/about-us',
    templateUrl: 'app/admin/about-us/about-us.html',
    controller: 'AboutUsAdminController',
    controllerAs: 'auaCtrl',
    authenticate: true
  }).state('contact-us-admin', {
    url: '/admin/contact-us',
    templateUrl: 'app/admin/contact-us/contact-us.html',
    controller: 'ContactUsAdminController',
    controllerAs: 'cuaCtrl',
    authenticate: true
  });

  $locationProvider.html5Mode(true);
}]);
//# sourceMappingURL=app.js.map

'use strict';

angular.module('sorentinoApp.admin', ['sorentinoApp.auth', 'ui.router']);
//# sourceMappingURL=admin.module.js.map

'use strict';

angular.module('sorentinoApp.auth', ['sorentinoApp.constants', 'sorentinoApp.util', 'ngCookies', 'ui.router']).config(["$httpProvider", function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);
//# sourceMappingURL=auth.module.js.map

'use strict';

angular.module('sorentinoApp.util', []);
//# sourceMappingURL=util.module.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AboutUsController = function AboutUsController($http) {
  var _this = this;

  _classCallCheck(this, AboutUsController);

  this.$http = $http;
  this.aboutUs = {};

  this.$http.get('/api/setting/about-us').then(function (response) {
    _this.aboutUs = response.data.data;
  });
};
AboutUsController.$inject = ["$http"];

angular.module('sorentinoApp').controller('AboutUsController', AboutUsController);
//# sourceMappingURL=about-us.controller.js.map

'use strict';

angular.module('sorentinoApp').config(["$stateProvider", function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/account/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm',
    params: { referrer: null }
  }).state('logout', {
    url: '/logout?referrer',
    referrer: 'login',
    template: '',
    controller: ["$state", "Auth", function controller($state, Auth) {
      var referrer = $state.params.referrer || $state.current.referrer || 'login';
      Auth.logout();
      $state.go(referrer);
    }]
  }).state('signup', {
    url: '/signup',
    templateUrl: 'app/account/signup/signup.html',
    controller: 'SignupController',
    controllerAs: 'vm'
  });
}]).run(["$rootScope", function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
    if (next.name === 'logout' && current && current.name && !current.authenticate) {
      next.referrer = current.name;
    }
  });
}]);
//# sourceMappingURL=account.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
  LoginController.$inject = ["Auth", "$state", "$stateParams"];
  function LoginController(Auth, $state, $stateParams) {
    _classCallCheck(this, LoginController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.referrer = $stateParams.referrer;
  }

  _createClass(LoginController, [{
    key: 'login',
    value: function login(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Logged in, redirect to home
          if (_this.referrer) {
            _this.$state.go(_this.referrer);
          } else {
            _this.$state.go('admin');
          }
        }).catch(function (err) {
          _this.errors.other = err.message;
        });
      }
    }
  }]);

  return LoginController;
}();

angular.module('sorentinoApp').controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupController = function () {
  //end-non-standard

  SignupController.$inject = ["Auth", "$state"];
  function SignupController(Auth, $state) {
    _classCallCheck(this, SignupController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }
  //start-non-standard


  _createClass(SignupController, [{
    key: 'register',
    value: function register(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Account created, redirect to home
          _this.$state.go('main');
        }).catch(function (err) {
          err = err.data;
          _this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            _this.errors[field] = error.message;
          });
        });
      }
    }
  }]);

  return SignupController;
}();

angular.module('sorentinoApp').controller('SignupController', SignupController);
//# sourceMappingURL=signup.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AboutUsAdminController = function () {
  AboutUsAdminController.$inject = ["$http", "$state"];
  function AboutUsAdminController($http, $state) {
    var _this = this;

    _classCallCheck(this, AboutUsAdminController);

    this.$http = $http;
    this.$state = $state;
    this.editorOptions = {
      language: 'en',
      allowedContent: true,
      entities: false
    };

    this.aboutUs = {};
    this.message = "";

    this.$http.get('/api/setting/about-us').then(function (response) {
      _this.aboutUs = response.data.data;
    });
  }

  _createClass(AboutUsAdminController, [{
    key: 'submit',
    value: function submit() {
      var _this2 = this;

      this.$http.post('/api/setting/edit', { setting: this.aboutUs }).then(function (response) {
        if (response.data.err) {
          _this2.message = "Update Error!";
        } else {
          _this2.message = "Update Successfully!";
        }
      });
    }
  }]);

  return AboutUsAdminController;
}();

angular.module('sorentinoApp').controller('AboutUsAdminController', AboutUsAdminController);
//# sourceMappingURL=about-us-admin.controller.js.map

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
        var temp = response.data.data;
        temp.sort(function (a, b) {
          return a.priority - b.priority;
        });

        _this.products = temp;
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

var ContactUsAdminController = function () {
  ContactUsAdminController.$inject = ["$http", "$state"];
  function ContactUsAdminController($http, $state) {
    var _this = this;

    _classCallCheck(this, ContactUsAdminController);

    this.$http = $http;
    this.$state = $state;
    this.editorOptions = {
      language: 'en',
      allowedContent: true,
      entities: false
    };

    this.contactUs = {};
    this.message = "";

    this.$http.get('/api/setting/contact-us').then(function (response) {
      _this.contactUs = response.data.data;
    });
  }

  _createClass(ContactUsAdminController, [{
    key: 'submit',
    value: function submit() {
      var _this2 = this;

      this.$http.post('/api/setting/edit', { setting: this.contactUs }).then(function (response) {
        if (response.data.err) {
          _this2.message = "Update Error!";
        } else {
          _this2.message = "Update Successfully!";
        }
      });
    }
  }]);

  return ContactUsAdminController;
}();

angular.module('sorentinoApp').controller('ContactUsAdminController', ContactUsAdminController);
//# sourceMappingURL=contact-us-admin.controller.js.map

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
      this.title = this.isEditingMode ? "Update" : "Create New";
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

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = function () {
  SettingsController.$inject = ["Auth"];
  function SettingsController(Auth) {
    _classCallCheck(this, SettingsController);

    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  }

  _createClass(SettingsController, [{
    key: 'changePassword',
    value: function changePassword(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.changePassword(this.user.oldPassword, this.user.newPassword).then(function () {
          _this.message = 'Password successfully changed.';
        }).catch(function () {
          form.password.$setValidity('mongoose', false);
          _this.errors.other = 'Incorrect password';
          _this.message = '';
        });
      }
    }
  }]);

  return SettingsController;
}();

angular.module('sorentinoApp').controller('SettingsController', SettingsController);
//# sourceMappingURL=settings.controller.js.map

"use strict";

(function (angular, undefined) {
	angular.module("sorentinoApp.constants", []).constant("appConfig", {
		"userRoles": ["guest", "user", "admin"]
	});
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContactUsController = function ContactUsController($http) {
  var _this = this;

  _classCallCheck(this, ContactUsController);

  this.$http = $http;
  this.contactUs = {};

  this.$http.get('/api/setting/contact-us').then(function (response) {
    _this.contactUs = response.data.data;
  });
};
ContactUsController.$inject = ["$http"];

angular.module('sorentinoApp').controller('ContactUsController', ContactUsController);
//# sourceMappingURL=contact-us.controller.js.map

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
      this.banner = "";
      this.description = "";

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
        pageSize: 48,
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
        _this.items.sort(function (a, b) {
          return a.priority - b.priority;
        });
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

      this.$http.get('/api/constant').then(function (response) {
        _this.banner = response.data.home.banner;
        _this.description = response.data.home.description;
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

(function () {

  AuthService.$inject = ["$location", "$http", "$cookies", "$q", "appConfig", "Util", "User"];
  function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var userRoles = appConfig.userRoles || [];

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = User.get();
    }

    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */

      login: function login(_ref, callback) {
        var email = _ref.email;
        var password = _ref.password;

        return $http.post('/auth/local', {
          email: email,
          password: password
        }).then(function (res) {
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        }).then(function (user) {
          safeCb(callback)(null, user);
          return user;
        }).catch(function (err) {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
      },


      /**
       * Delete access token and user info
       */
      logout: function logout() {
        $cookies.remove('token');
        currentUser = {};
      },


      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function createUser(user, callback) {
        return User.save(user, function (data) {
          $cookies.put('token', data.token);
          currentUser = User.get();
          return safeCb(callback)(null, user);
        }, function (err) {
          Auth.logout();
          return safeCb(callback)(err);
        }).$promise;
      },


      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function changePassword(oldPassword, newPassword, callback) {
        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function () {
          return safeCb(callback)(null);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },


      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function getCurrentUser(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;
        return $q.when(value).then(function (user) {
          safeCb(callback)(user);
          return user;
        }, function () {
          safeCb(callback)({});
          return {};
        });
      },


      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function isLoggedIn(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var is = user.hasOwnProperty('role');
          safeCb(callback)(is);
          return is;
        });
      },


      /**
       * Check if a user has a specified role or higher
       *   (synchronous|asynchronous)
       *
       * @param  {String}     role     - the role to check against
       * @param  {Function|*} callback - optional, function(has)
       * @return {Bool|Promise}
       */
      hasRole: function hasRole(role, callback) {
        var hasRole = function hasRole(r, h) {
          return userRoles.indexOf(r) >= userRoles.indexOf(h);
        };

        if (arguments.length < 2) {
          return hasRole(currentUser.role, role);
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var has = user.hasOwnProperty('role') ? hasRole(user.role, role) : false;
          safeCb(callback)(has);
          return has;
        });
      },


      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function isAdmin() {
        return Auth.hasRole.apply(Auth, [].concat.apply(['admin'], arguments));
      },


      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function getToken() {
        return $cookies.get('token');
      }
    };

    return Auth;
  }

  angular.module('sorentinoApp.auth').factory('Auth', AuthService);
})();
//# sourceMappingURL=auth.service.js.map

'use strict';

(function () {

  authInterceptor.$inject = ["$rootScope", "$q", "$cookies", "$injector", "Util"];
  function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
    var state;
    return {
      // Add authorization token to headers

      request: function request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },


      // Intercept 401s and redirect you to login
      responseError: function responseError(response) {
        if (response.status === 401) {
          console.log($injector.get('$state'));
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('sorentinoApp.auth').factory('authInterceptor', authInterceptor);
})();
//# sourceMappingURL=interceptor.service.js.map

'use strict';

(function () {

  angular.module('sorentinoApp.auth').run(["$rootScope", "$state", "Auth", function ($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (!next.authenticate) {
        return;
      }

      if (typeof next.authenticate === 'string') {
        Auth.hasRole(next.authenticate, _.noop).then(function (has) {
          if (has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(function (is) {
            if (is) {
              $state.go(next.name);
            } else {
              $state.go('login', { referrer: next.name });
            }
          });
        });
      } else {
        Auth.isLoggedIn(_.noop).then(function (is) {
          if (is) {
            return;
          }

          event.preventDefault();
          $state.go('login', { referrer: next.name });
        });
      }
    });
  }]);
})();
//# sourceMappingURL=router.decorator.js.map

'use strict';

(function () {

  UserResource.$inject = ["$resource"];
  function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('sorentinoApp.auth').factory('User', UserResource);
})();
//# sourceMappingURL=user.service.js.map

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

/**
 * Removes server error when user updates input
 */

angular.module('sorentinoApp').directive('mongooseError', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function link(scope, element, attrs, ngModel) {
      element.on('keydown', function () {
        return ngModel.$setValidity('mongoose', true);
      });
    }
  };
});
//# sourceMappingURL=mongoose-error.directive.js.map

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

      this.$http.get('/api/constant').then(function (response) {
        _this.menu = response.data.menu;
        _this.$http.get('/api/constant/collection').then(function (response) {
          for (var i = 0; i < _this.menu.left.length; i++) {
            if (_this.menu.left[i].name.toLowerCase() === "collections") {
              _this.menu.left[i].items = response.data.collections;
              break;
            }
          }

          for (var _i = 0; _i < _this.menu.right.length; _i++) {
            if (_this.menu.right[_i].name.toLowerCase() === "collections") {
              _this.menu.right[_i].items = response.data.collections;
              break;
            }
          }
        });
      });
    }
  }, {
    key: 'isAcvite',
    value: function isAcvite(name) {}
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

angular.module("sorentinoApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/about-us/about-us.html","<navbar></navbar><div class=\"about-us\"><div class=\"container\"><div class=\"row\"><h1 class=\"about-us__title\">About Us</h1><div ng-bind-html=\"auCtrl.aboutUs.value\" class=\"about-us__content\"></div></div></div></div><footer></footer>");
  $templateCache.put("app/admin/_sidebar.html","<div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/settings\">Change Password</a><a href=\"/admin/about-us\">About Us</a><a href=\"/admin/contact-us\">Contact Us</a><div class=\"sidebar--bottom\"></div><hr/><a href=\"/\">Back To Home</a><a href=\"/logout\">Logout</a></div>");
  $templateCache.put("app/admin/admin.html","<section class=\"admin\"><div class=\"container\"><h2 class=\"admin__title\">All Products</h2><div class=\"col-xs-2\"><div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/settings\">Change Password</a><a href=\"/admin/about-us\">About Us</a><a href=\"/admin/contact-us\">Contact Us</a><div class=\"sidebar--bottom\"></div><hr/><a href=\"/\">Back To Home</a><a href=\"/logout\">Logout</a></div></div><div class=\"admin__content col-xs-9\"><div class=\"admin__content__menu row\"><a href=\"#\" ng-click=\"adminCtrl.onCreate()\"><div class=\"btn btn-success\">Create New</div></a></div><div class=\"admin__content__table row\"><table class=\"table table-bordered table-striped\"><thead><tr><th>Name</th><th>Price</th><th>Description</th><th>Collections</th><th>Colors</th><th>Priority</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"product in adminCtrl.products\" ng-if=\"!product.hide\"><td><strong>{{product.name}}</strong></td><td>{{product.price}}</td><td>{{product.description}}</td><td>{{product.collections}}</td><td><div ng-repeat=\"color in product.colors track by $index\" ng-style=\"{\'background-color\': color.code}\" title=\"{{color.name}}\" class=\"admin__color-square\"></div></td><td>{{product.priority}}</td><td><button ng-click=\"adminCtrl.onEdit(product)\" title=\"Edit\"><span class=\"glyphicon glyphicon-edit text-warning\"></span></button><button ng-click=\"adminCtrl.onDelete(product)\" title=\"Delete\"><span class=\"glyphicon glyphicon-trash text-danger\"></span></button></td></tr></tbody></table></div></div></div></section>");
  $templateCache.put("app/admin/create-product.html","<div class=\"product-form\"><div class=\"container\"><h2 class=\"admin__title\">{{cpCtrl.title}} Product</h2><div class=\"col-xs-2\"><div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/settings\">Change Password</a><a href=\"/admin/about-us\">About Us</a><a href=\"/admin/contact-us\">Contact Us</a><div class=\"sidebar--bottom\"></div><hr/><a href=\"/\">Back To Home</a><a href=\"/logout\">Logout</a></div></div><form class=\"col-xs-10\"><div class=\"form-group\"><label>Name</label><input required=\"required\" ng-model=\"cpCtrl.product.name\" class=\"form-control\"/></div><div class=\"form-group\"><label>Price</label><input type=\"number\" required=\"required\" placeholder=\"\" ng-model=\"cpCtrl.product.price\" class=\"form-control\"/></div><div class=\"form-group\"><label>Description</label><input required=\"required\" placeholder=\"\" ng-model=\"cpCtrl.product.description\" class=\"form-control\"/></div><div class=\"form-group\"><label>Priority</label><input type=\"number\" required=\"required\" placeholder=\"\" ng-model=\"cpCtrl.product.priority\" class=\"form-control\"/></div><div class=\"form-group\"><label class=\"product-form--block\">Collections</label><div ng-repeat=\"item in cpCtrl.collections track by $index\" class=\"product-form__checkbox\"><label class=\"checkbox-inline\">{{item.name}}<input type=\"checkbox\" ng-model=\"cpCtrl.collectionModel[item.id]\" ng-true-value=\"{{item.id}}\"/></label></div></div><div class=\"form-group\"><label>Colors</label><div class=\"product-form__buttons\"><button ng-click=\"cpCtrl.addColor()\"><span class=\"glyphicon glyphicon-plus text-success\">Add</span></button><span class=\"product-form__buttons--right\">Image Root: <strong>{{cpCtrl.imageRoot}}</strong></span></div><table class=\"table table-striped table-bordered\"><thead><tr><th class=\"col-md-3\">Name</th><th class=\"col-md-2\">Code</th><th class=\"col-md-5\">Images</th><th class=\"col-md-2\"></th></tr></thead><tbody><tr ng-repeat=\"color in cpCtrl.colors track by $index\" ng-include=\"cpCtrl.getTemplate(color)\"></tr></tbody></table></div><div class=\"form-group\"><label>Specifications</label><div class=\"product-form__sub-label\"><label>Description</label><a href=\"#\" ng-click=\"cpCtrl.specDescShow = !cpCtrl.specDescShow;\">{{cpCtrl.specDescShow ? \"Hide\" : \"Show\"}}</a></div><div ng-show=\"cpCtrl.specDescShow\"><div ckeditor=\"cpCtrl.editorOptions\" ng-model=\"cpCtrl.specDesc\" class=\"form-control\"></div></div><div class=\"product-form__sub-label\"><label>Details</label><a href=\"#\" ng-click=\"cpCtrl.specDetailShow = !cpCtrl.specDetailShow;\">{{cpCtrl.specDetailShow ? \"Hide\" : \"Show\"}}</a></div><div ng-show=\"cpCtrl.specDetailShow\"><div ckeditor=\"cpCtrl.editorOptions\" ng-model=\"cpCtrl.specDetail\" class=\"form-control\"></div></div><div class=\"product-form__sub-label\"><label>Material</label><a href=\"#\" ng-click=\"cpCtrl.specMatShow = !cpCtrl.specMatShow;\">{{cpCtrl.specMatShow ? \"Hide\" : \"Show\"}}</a></div><div ng-show=\"cpCtrl.specMatShow\"><div ckeditor=\"cpCtrl.editorOptions\" ng-model=\"cpCtrl.specMat\" class=\"form-control\"></div></div></div><div class=\"form-group\"><button type=\"submit\" ng-click=\"cpCtrl.submitProduct()\" class=\"btn btn-primary\">Submit</button></div></form></div></div><script id=\"display\" type=\"text/ng-template\"><td>{{color.name}}</td>\n<td>{{color.code}}<div class=\"product-form__square\" ng-style=\"{\'background-color\' : color.code}\"></div></td>\n<td>{{color.imageDisplay}}</td>\n<td>\n  <button ng-click=\"cpCtrl.editColor(color)\"><span class=\"glyphicon glyphicon-edit text-warning\"></span></button>\n  <button ng-click=\"cpCtrl.deleteColor(color)\"><span class=\"glyphicon glyphicon-trash text-danger\"></span></button>\n</td></script><script id=\"edit\" type=\"text/ng-template\"><td><input type=\"text\" ng-model=\"cpCtrl.selectedColor.name\" /></td>\n<td><input type=\"text\" ng-model=\"cpCtrl.selectedColor.code\" /></td>\n<td><input type=\"text\" ng-model=\"cpCtrl.selectedColor.imageDisplay\" /></td>\n<td>\n  <button ng-click=\"cpCtrl.saveColor($index)\"><span class=\"glyphicon glyphicon-ok text-success\"></span></button>\n  <button ng-click=\"cpCtrl.reset()\"><span class=\"glyphicon glyphicon-remove text-danger\"></span></button>\n</td></script>");
  $templateCache.put("app/contact-us/contact-us.html","<navbar></navbar><div class=\"contact-us\"><div class=\"container\"><div class=\"row\"><h1 class=\"contact-us__title\">Contact Us</h1><div ng-bind-html=\"cuCtrl.contactUs.value\" class=\"contact-us__content\"></div></div></div></div><footer></footer>");
  $templateCache.put("app/main/main.html","<navbar></navbar><section class=\"spotlight\"><img ng-src=\"{{main.banner}}\" alt=\"Banner\"/></section><div class=\"main\"><div class=\"main__header\"><h2 class=\"main__header__title\">{{main.collection.name}}</h2><div class=\"main__header__description\">{{main.description}}</div></div><div class=\"main__content\"><a href=\"#\" ng-click=\"main.showHideSortBy(!main.showSortBy)\"><h6 ng-class=\"{\'main__content__header--border-bottom\': !main.showSortBy}\" class=\"main__content__header\"><span>Sort By {{main.selectedSortBy.name}}</span><i aria-hidden=\"true\" class=\"fa fa-caret-down\"></i><ul ng-show=\"main.showSortBy\"><li ng-repeat=\"item in main.sortBy\" ng-click=\"main.setSortBy(item)\">{{item.name}}</li></ul></h6></a><div ng-class=\"{\'main__mask--hide\': !main.showSortBy}\" ng-click=\"main.showHideSortBy(false)\" class=\"main__mask\"></div><div class=\"main__content__grid\"><a ng-repeat=\"item in main.currItems track by $index\" href=\"/product/{{item._id}}\"><div ng-if=\"item.colors &amp;&amp; item.colors.length &gt; 0\" class=\"main__content__grid__item col-xs-6 col-sm-4\"><img src=\"{{item.colors[0].images[0]}}\" alt=\"\"/><div class=\"main__content__grid__item__info\"><h5 class=\"main__content__grid__item__info__title\">{{item.name}}</h5><div class=\"main__content__grid__item__info__description\">{{item.description}}</div><div class=\"main__content__grid__item__info__price\">{{item.price | currency: \"\" : 0}} VND</div></div><div class=\"main__content__grid__item__info-mobile\"><h5 class=\"main__content__grid__item__info-mobile__title\">{{item.name}}</h5><div class=\"main__content__grid__item__info-mobile__price\">{{item.price | currency: \"\" : 0}} VND</div></div></div></a></div><div ng-click=\"main.loadMore()\" ng-if=\"main.pagination.page * main.pagination.pageSize &lt; main.pagination.totalHit\" class=\"btn main__content__loadmore\">See More</div></div></div><footer></footer>");
  $templateCache.put("app/main/spotlight.html","<section class=\"spotlight\"><img ng-src=\"{{main.banner}}\" alt=\"Banner\"/></section>");
  $templateCache.put("app/product/product.html","<navbar></navbar><div class=\"product\"><div class=\"product__main col-sm-7\"><ng-gallery images=\"prodCtrl.imageGalerry\" thumbs-num=\"1\"></ng-gallery><div class=\"product__main__list\"><div class=\"row\"><a href=\"#\" ng-repeat=\"item in prodCtrl.color.images track by $index\" ng-click=\"prodCtrl.setMainImage(item)\"><img src=\"{{item}}\" class=\"col-xs-2\"/></a></div></div></div><div class=\"product__info col-sm-5\"><h2 class=\"product__info__title\">{{prodCtrl.product.name}}</h2><p class=\"product__info__title\">{{prodCtrl.product.description}}</p><p class=\"product__info__title\">{{prodCtrl.product.price | currency: \"\" : 0}} VND</p><div class=\"product__info__color--container\"><p class=\"product__info__color__title\">More Colors:</p><a ng-repeat=\"color in prodCtrl.product.colors\" ng-click=\"prodCtrl.changeColor(color)\" ng-style=\"{\'background-color\': color.code}\" href=\"#\" ng-class=\"{\'product__info__color--active\': prodCtrl.color.code == color.code}\" ng-mouseover=\"prodCtrl.currColorName = color.name\" ng-mouseleave=\"prodCtrl.currColorName = prodCtrl.color.name\" class=\"product__info__color product__info__color--select\"></a><div class=\"product__info__color__name\">{{prodCtrl.currColorName}}</div></div><hr/><div class=\"product__info__spec\"><ul class=\"product__info__spec__menu\"><li ng-class=\"{\'product__info__spec__menu__item--select\' : prodCtrl.specType == 1}\" class=\"product__info__spec__menu__item\"><a href=\"#\" ng-click=\"prodCtrl.setSpec(prodCtrl.product.spec.description, 1)\">Description</a></li><li ng-class=\"{\'product__info__spec__menu__item--select\' : prodCtrl.specType == 2}\" class=\"product__info__spec__menu__item\"><a href=\"#\" ng-click=\"prodCtrl.setSpec(prodCtrl.product.spec.details, 2)\">Details</a></li><li ng-class=\"{\'product__info__spec__menu__item--select\' : prodCtrl.specType == 3}\" class=\"product__info__spec__menu__item\"><a href=\"#\" ng-click=\"prodCtrl.setSpec(prodCtrl.product.spec.material, 3)\">Material</a></li></ul><hr/><div ng-bind-html=\"prodCtrl.spec\" class=\"product__info__spec__description\"></div></div></div><div class=\"col-xs-12\"><div class=\"grid-container\"><section class=\"two-grid\"><div class=\"container-fluid\"><div style=\"background: #154867\" class=\"row two-grid__row\"><div class=\"two-grid__cell two-grid__cell--text col-xs-12 col-sm-6 col-md-6 col-lg-6 no-gutter\"><p class=\"two-grid__cell-body\"><h1 class=\"two-grid__cell-body__title\">Title something</h1><a href=\"#\" class=\"two-grid__cell-body__link\">View Bags</a></p></div><div class=\"two-grid__cell two-grid__cell--image two-grid__cell--image-right col-xs-12 col-sm-6 col-md-6 col-lg-6 no-gutter\"><img alt=\"\" src=\"/assets/images/banners/1.jpg\"/></div></div><div style=\"background: #49201C\" class=\"row two-grid__row\"><div class=\"two-grid__cell two-grid__cell--text col-xs-12 col-sm-6 col-md-6 col-lg-6 no-gutter\"><p class=\"two-grid__cell-body\"><h1 class=\"two-grid__cell-body__title\">Title something</h1><a href=\"#\" class=\"two-grid__cell-body__link\">View Bags</a></p></div><div class=\"two-grid__cell two-grid__cell--image two-grid__cell--image-right col-xs-12 col-sm-6 col-md-6 col-lg-6 no-gutter\"><img alt=\"\" src=\"/assets/images/banners/2.jpg\"/></div></div></div></section></div></div></div><footer></footer>");
  $templateCache.put("components/footer/footer.html","<div class=\"container\"><div class=\"footer\"><div class=\"footer__copyright\">©<a href=\"/\">&nbsp;Sorentino</a>&nbsp;- Túi xách da thật cao cấp được sản xuất tại Việt Nam</div></div></div>");
  $templateCache.put("components/navbar/navbar.html","<div class=\"nav-bar__first-line\"><div class=\"nav-bar__first-line__logo\"><h2 class=\"nav-bar__first-line__logo__name\">Sorentino</h2><div class=\"nav-bar__first-line__logo__menu nav-bar__first-line__logo__menu--left\"><ul><li ng-repeat=\"item in nav.menu.left track by $index\"><a href=\"{{item.link}}\"><span>{{item.name}}</span></a><div ng-class=\"{\'nav-bar__sub--show\': item.items &amp;&amp; item.items.length &gt; 0}\" class=\"nav-bar__sub\"><ul ng-if=\"item.items &amp;&amp; item.items.length &gt; 0\"><li ng-repeat=\"subItem in item.items track by $index\"><a href=\"/collection/{{subItem.id}}\"><span>{{subItem.name}}</span></a></li></ul></div></li></ul></div><div class=\"nav-bar__first-line__logo__menu nav-bar__first-line__logo__menu--right\"><ul><li ng-repeat=\"item in nav.menu.right track by $index\"><a href=\"{{item.link}}\"><span>{{item.name}}</span></a><div ng-class=\"{\'nav-bar__sub--show\': item.items &amp;&amp; item.items.length &gt; 0}\" class=\"nav-bar__sub\"><ul ng-if=\"item.items &amp;&amp; item.items.length &gt; 0\"><li ng-repeat=\"subItem in item.items track by $index\"><a href=\"/collection/{{subItem.id}}\"><span>{{subItem.name}}</span></a></li></ul></div></li></ul></div></div><h2 class=\"nav-bar__first-line__right-logo\">Sorentino</h2></div><div class=\"nav-bar__second-line\"><ul><li ng-repeat=\"item in nav.menu.left.concat(nav.menu.right) track by $index\"><a href=\"{{item.link}}\"><span ng-class=\"{\'nav-bar--active\': isActive(item.name)}\">{{item.name}}</span></a><div ng-class=\"{\'nav-bar__sub--show\': item.items &amp;&amp; item.items.length &gt; 0}\" class=\"nav-bar__sub\"><ul ng-if=\"item.items &amp;&amp; item.items.length &gt; 0\"><li ng-repeat=\"subItem in item.items track by $index\"><a href=\"/collection/{{subItem.id}}\"><span>{{subItem.name}}</span></a></li></ul></div></li></ul></div>");
  $templateCache.put("app/account/login/login.html","<div class=\"container\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Login</h1></div><div class=\"col-sm-12\"><form name=\"form\" ng-submit=\"vm.login(form)\" novalidate=\"\" class=\"form\"><div class=\"form-group\"><label>Email</label><input type=\"email\" name=\"email\" ng-model=\"vm.user.email\" class=\"form-control\"/></div><div class=\"form-group\"><label>Password</label><input type=\"password\" name=\"password\" ng-model=\"vm.user.password\" class=\"form-control\"/></div><div class=\"form-group has-error\"><p ng-show=\"form.email.$error.required &amp;&amp; form.password.$error.required &amp;&amp; vm.submitted\" class=\"help-block\">Please enter your email and password.</p><p class=\"help-block\">{{ vm.errors.other }}</p></div><div><button type=\"submit\" class=\"btn btn-success btn-lg btn-danger\">Login</button></div></form></div></div></div>");
  $templateCache.put("app/account/signup/signup.html","<div class=\"container\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Sign up</h1></div><div class=\"col-sm-12\"><form name=\"form\" ng-submit=\"vm.register(form)\" novalidate=\"\" class=\"form\"><div ng-class=\"{ &quot;has-success&quot;: form.name.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.name.$invalid &amp;&amp; vm.submitted }\" class=\"form-group\"><label>Name</label><input type=\"text\" name=\"name\" ng-model=\"vm.user.name\" required=\"\" class=\"form-control\"/><p ng-show=\"form.name.$error.required &amp;&amp; vm.submitted\" class=\"help-block\">A name is required</p></div><div ng-class=\"{ &quot;has-success&quot;: form.email.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.email.$invalid &amp;&amp; vm.submitted }\" class=\"form-group\"><label>Email</label><input type=\"email\" name=\"email\" ng-model=\"vm.user.email\" required=\"\" mongoose-error=\"\" class=\"form-control\"/><p ng-show=\"form.email.$error.email &amp;&amp; vm.submitted\" class=\"help-block\">Doesn\'t look like a valid email.</p><p ng-show=\"form.email.$error.required &amp;&amp; vm.submitted\" class=\"help-block\">What\'s your email address?</p><p ng-show=\"form.email.$error.mongoose\" class=\"help-block\">{{ vm.errors.email }}</p></div><div ng-class=\"{ &quot;has-success&quot;: form.password.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.password.$invalid &amp;&amp; vm.submitted }\" class=\"form-group\"><label>Password</label><input type=\"password\" name=\"password\" ng-model=\"vm.user.password\" mongoose-error=\"\" ng-minlength=\"3\" required=\"\" class=\"form-control\"/><p ng-show=\"(form.password.$error.minlength || form.password.$error.required) &amp;&amp; vm.submitted\" class=\"help-block\">Password must be at least 3 characters.</p><p ng-show=\"form.password.$error.mongoose\" class=\"help-block\">{{ vm.errors.password }}</p></div><div ng-class=\"{ &quot;has-success&quot;: form.confirmPassword.$valid &amp;&amp; vm.submitted,        &quot;has-error&quot;: form.confirmPassword.$invalid &amp;&amp; vm.submitted }\" class=\"form-group\"><label>Confirm Password</label><input type=\"password\" name=\"confirmPassword\" ng-model=\"vm.user.confirmPassword\" match=\"vm.user.password\" ng-minlength=\"3\" required=\"\" class=\"form-control\"/><p ng-show=\"form.confirmPassword.$error.match &amp;&amp; vm.submitted\" class=\"help-block\">Passwords must match.</p></div><div><button type=\"submit\" class=\"btn btn-inverse btn-lg btn-register\">Sign up</button> <a ui-sref=\"login\" class=\"btn btn-default btn-lg btn-login\">Login</a></div><hr/><div class=\"row\"><div class=\"col-sm-4 col-md-3\"><oauth-buttons classes=\"btn-block\"></oauth-buttons></div></div></form></div></div><hr/></div>");
  $templateCache.put("app/admin/about-us/about-us.html","<div class=\"container\"><div class=\"row\"><h2 class=\"admin__title\">Change About Us</h2><div class=\"col-xs-2\"><div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/settings\">Change Password</a><a href=\"/admin/about-us\">About Us</a><a href=\"/admin/contact-us\">Contact Us</a><div class=\"sidebar--bottom\"></div><hr/><a href=\"/\">Back To Home</a><a href=\"/logout\">Logout</a></div></div><div class=\"col-sm-10\"><div class=\"form-group\"><div ckeditor=\"auaCtrl.editorOptions\" ng-model=\"auaCtrl.aboutUs.value\" class=\"form-control\"></div></div><div class=\"form-group admin__about-us\"><h3 class=\"admin__about-us__title\">Preview</h3><div ng-bind-html=\"auaCtrl.aboutUs.value\" class=\"admin__about-us__preview\"></div></div><div class=\"form-group\"><hr/><p class=\"help-block\">{{auaCtrl.message}}</p><div ng-click=\"auaCtrl.submit()\" class=\"btn btn-primary\">Submit</div></div></div></div></div>");
  $templateCache.put("app/admin/contact-us/contact-us.html","<div class=\"container\"><div class=\"row\"><h2 class=\"admin__title\">Change Contact Us</h2><div class=\"col-xs-2\"><div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/settings\">Change Password</a><a href=\"/admin/about-us\">About Us</a><a href=\"/admin/contact-us\">Contact Us</a><div class=\"sidebar--bottom\"></div><hr/><a href=\"/\">Back To Home</a><a href=\"/logout\">Logout</a></div></div><div class=\"col-sm-10\"><div class=\"form-group\"><div ckeditor=\"cuaCtrl.editorOptions\" ng-model=\"cuaCtrl.contactUs.value\" class=\"form-control\"></div></div><div class=\"form-group admin__about-us\"><h3 class=\"admin__about-us__title\">Preview</h3><div ng-bind-html=\"cuaCtrl.contactUs.value\" class=\"admin__about-us__preview\"></div></div><div class=\"form-group\"><hr/><p class=\"help-block\">{{cuaCtrl.message}}</p><div ng-click=\"cuaCtrl.submit()\" class=\"btn btn-primary\">Submit</div></div></div></div></div>");
  $templateCache.put("app/admin/settings/settings.html","<div class=\"container\"><div class=\"row\"><h2 class=\"admin__title\">Change Password</h2><div class=\"col-xs-2\"><div class=\"sidebar\"><a href=\"/admin\">All Products</a><a href=\"/admin/settings\">Change Password</a><a href=\"/admin/about-us\">About Us</a><a href=\"/admin/contact-us\">Contact Us</a><div class=\"sidebar--bottom\"></div><hr/><a href=\"/\">Back To Home</a><a href=\"/logout\">Logout</a></div></div><div class=\"col-sm-10\"><form name=\"form\" ng-submit=\"vm.changePassword(form)\" novalidate=\"\" class=\"form\"><div class=\"form-group\"><label>Current Password</label><input type=\"password\" name=\"password\" ng-model=\"vm.user.oldPassword\" mongoose-error=\"\" class=\"form-control\"/><p ng-show=\"form.password.$error.mongoose\" class=\"help-block\">{{ vm.errors.other }}</p></div><div class=\"form-group\"><label>New Password</label><input type=\"password\" name=\"newPassword\" ng-model=\"vm.user.newPassword\" ng-minlength=\"3\" required=\"\" class=\"form-control\"/><p ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) &amp;&amp; (form.newPassword.$dirty || vm.submitted)\" class=\"help-block\">Password must be at least 3 characters.</p></div><div class=\"form-group\"><label>Confirm New Password</label><input type=\"password\" name=\"confirmPassword\" ng-model=\"vm.user.confirmPassword\" match=\"vm.user.newPassword\" ng-minlength=\"3\" required=\"\" class=\"form-control\"/><p ng-show=\"fvm.orm.confirmPassword.$error.match &amp;&amp; vm.submitted\" class=\"help-block\">Passwords must match.</p></div><p style=\"color:red;\" class=\"help-block\"> {{ vm.message }}</p><button type=\"submit\" class=\"btn btn-lg btn-primary\">Save changes</button></form></div></div></div>");
  $templateCache.put("app/mixins/common-grid/_common-grid.html","");}]);
