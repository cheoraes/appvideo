//create a module myApp
var lang = {
  code: 'en',
  Descripcion: 'English'
};

 
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

var langJSONObject = {
  'User': " Usuario",
  'Password': 'Clave',
  'Rememberme': 'Recuerdame',
  'Enter': 'Entra',
  'Pick a student': 'Escoge un estudiante',
  'Evaluation':'Evaluación',
  'Pictures':'Fotos',
  'Videos':'Videos',
  'Logout': 'Cerrar Sesión'
};


function translateText(langJSON) {
  // Recorremos todos los tags con atributo [data-text]
  $.map($("[data-text]"), function(tag) {
    // Asignamos la variable al item actual
    var self = $(tag);

    // Recogemos el valor del atributo
    var text = self.attr("data-text");

    // Miramos si el valor del atributo existe y es diferente a vacío
    if (typeof text !== "undefined" && text !== "") {
      // Asignamos el valor

      var string = typeof langJSON[text] !== "undefined" ? langJSON[text] : text;

      // Asignamos la variable al tag
      self.text(string);
    }
  });
}


//***********************
// ROUTING
//***********************

myApp.config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/home', {
      controller: 'HomeCtrl',
      templateUrl: 'templates/home.html'
    })
    .when('/about', {
      controller: 'AboutCtrl',
      templateUrl: 'templates/aboutus.html'
    })
    .when('/contact', {
      controller: 'ContactCtrl',
      templateUrl: 'templates/contact.html'
    })
    .when('/config', {
      controller: 'ConfigCtrl',
      templateUrl: 'templates/config.html'
    })
    .when('/students', {
      controller: 'StudentsCtrl',
      templateUrl: 'templates/students.html'
    })
    .when('/student_menu/:estudiante', {
      controller: 'StudentMenuCtrl',
      templateUrl: 'templates/student_menu.html'
    })
    .when('/media_grid/:params', {
      controller: 'MediaGridCtrl',
      templateUrl: 'templates/media_grid.html'
    })
    .when('/gallery/:item', {
      controller: 'GalleryCtrl',
      templateUrl: 'templates/gallery.html'
    })
     .when('/video/:params', {
      controller: 'VideoCtrl',
      templateUrl: 'templates/video.html'
    })
    .otherwise({
      redirectTo: '/home'
    });


});

myApp.directive('youtube',function($window){
   return {
    restrict: "E",

    scope: {
      height:   "@",
      width:    "@",
      videoid:  "@"  
    },

    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player(element.children()[0], {
           playerVars: {
            autoplay: 1,
            html5: 1,
           /* theme: "light",*/
            iv_load_policy: 3,
            showinfo: 0,
            controls: 1,
            modestbranding:1,
          },
         
         // height: scope.height,
         // width: scope.width,
          //  height: '100%',
            width: '100%',
          videoId: scope.videoid
        });
       
      };
    },  
  }
});
  
  
  //***********************
  // HOME CREDENCIALES
  //***********************
  myApp.controller('HomeCtrl', function($scope, $location, $http) {
    translateText(langJSONObject);
    console.log('CONSOLELOG');
    $scope.login = function() {
    console.log('login');
      $location.path('/students');
    }
  });


myApp.controller('VideoCtrl', function($scope, $location, $http, $routeParams) {

  $scope.ytid = JSON.parse($routeParams.params);

//$scope.estudiante = JSON.parse($routeParams.estudiante);
  translateText(langJSONObject);
  $scope.titulo="VideoS";

});



//***********************
// LISTADO DE ESTUDIANTES
//***********************
myApp.controller('StudentsCtrl', function($scope, $location) {
  translateText(langJSONObject);
  $scope.estudiantes = [{
    nombre: 'Susana',
    apellido: 'Salvador',
    id: 12
  }, {
    nombre: 'Marc',
    apellido: 'Muñoz',
    id: 14
  }, {
    nombre: 'Marc',
    apellido: 'Muñoz',
    id: 14
  }];
  $scope.goToStudentMenu = function(estudiante) {
    $location.path('/student_menu/' + JSON.stringify(estudiante));
  }
});

//***********************
// MENU ESTUDIANTE
//***********************
myApp.controller('StudentMenuCtrl', function($scope, $location, $routeParams) {

  $scope.estudiante = JSON.parse($routeParams.estudiante);

  translateText(langJSONObject);

  $scope.mostrar = function(opciones, opcion) {
    
    for (var i in $scope.opciones) {
      if (opcion == i) {
        $scope.opciones[i].show = !$scope.opciones[i].show;
      } else {
        $scope.opciones[i].show = false
      }
    }
  };

  $scope.ejecutarItem = function(item) {
  console.log(item);
    //console.log('ejecutar Item');
    var params = {estudiante:$scope.estudiante, item:item};
   //console.log(params);
    $location.path('/media_grid/' + JSON.stringify(params));
  }

  $scope.opciones = [{
    id: 1,
    titulo: 'Evaluacion',
    show: false,
    items: [{
      id: 3,
      titulo: 'Evaluacion Grupo 1'
    }, {
      id: 4,
      titulo: 'Evaluacion Grupo 2'
    }, {
      id: 5,
      titulo: 'Evaluacion Grupo 3'
    }]
  }, {
    id: 2,
    titulo: 'Fotos',
    show: false,
    items: [{
      id: 3,
      tipo: 'foto',
      titulo: 'Fotos Grupo 1'
    }, {
      id: 4,
      tipo: 'foto',
      titulo: 'Fotos Grupo 2'
    }, {
      id: 5,
      tipo: 'foto',
      titulo: 'Fotos Grupo 3'
    }]
  }, {
    id: 3,
    titulo: 'Videos',
    show: false,
    items: [{
      id: 3,
      tipo: 'video',
      titulo: 'Videos Grupo 1'
    }, {
      id: 4,
      tipo: 'video',
      titulo: 'Videos Grupo 2'
    }, {
      id: 5,
      tipo: 'video',
      titulo: 'Videos Grupo 3'
    }]
  }];

});


//***********************
// MEDIA GRID
//***********************

myApp.controller('MediaGridCtrl', function($scope, $routeParams, $location) {
console.log($routeParams);
  var params = JSON.parse($routeParams.params);
  $scope.estudiante = params.estudiante;
  $scope.item=params.item;
  
  
  $scope.message = "(',')---I am on MediaGridCtrl page---(',')";
  $scope.medias = [{
    id:1,
    formato: 'video',
    thumbnail: 'http://farm4.staticflickr.com/3362/3316238209_4af672598e_m.jpg',
    url: 'mlOiXMvMaZo',
    ytid:'aQd41nbQM-U'
  }, {
    id:2,
       formato: 'video',
       thumbnail: 'http://farm4.staticflickr.com/3362/3316238209_4af672598e_m.jpg',
       url: 'mlOiXMvMaZo',
       ytid:'mlOiXMvMaZo'
  }, {
    formato: 'imagen',
    thumbnail: 'img/logo.png',
    image: 'http://3.bp.blogspot.com/_y6m_gMddMHY/S9eyPVVAIYI/AAAAAAAACn8/XqfJOu7TyDY/S240/DVD+Snap+1%2316.jpg'
  }, {
    formato: 'imagen',
    thumbnail: 'img/logo.png',
    image: 'http://3.bp.blogspot.com/_y6m_gMddMHY/S9eyPVVAIYI/AAAAAAAACn8/XqfJOu7TyDY/S240/DVD+Snap+1%2316.jpg'
  }, {
    formato: 'imagen',
    thumbnail: 'img/logo.png',
    image: 'http://3.bp.blogspot.com/_y6m_gMddMHY/S9eyPVVAIYI/AAAAAAAACn8/XqfJOu7TyDY/S240/DVD+Snap+1%2316.jpg'
  }, {
    formato: 'imagen',
    thumbnail: 'img/logo.png',
    image: 'http://3.bp.blogspot.com/_y6m_gMddMHY/S9eyPVVAIYI/AAAAAAAACn8/XqfJOu7TyDY/S240/DVD+Snap+1%2316.jpg'
  }, {
    formato: 'imagen',
    thumbnail: 'img/logo.png',
    image: 'http://3.bp.blogspot.com/_y6m_gMddMHY/S9eyPVVAIYI/AAAAAAAACn8/XqfJOu7TyDY/S240/DVD+Snap+1%2316.jpg'
  }]

  $scope.gotoGalleryOn = function(indice) {
  if($scope.medias[indice].formato =='video'){
      console.log('video');
       console.log('/video/' + JSON.stringify($scope.medias[indice]));
      // $location.path('/video/' + JSON.stringify($scope.medias[indice]));
    $location.path('/video/'+ JSON.stringify($scope.medias[indice].ytid));
    }
  //  $location.path('/gallery/' + JSON.stringify($scope.medias[indice])); // +'/'+JSON.stringify($scope.media) +'/'+ JSON.stringify(indice));
  }
});





//***********************
// CONFIG
//***********************

myApp.controller('ConfigCtrl', function($scope) {
  translateText(langJSONObject);
  
  $scope.lang = lang;
  
  $scope.languages = [{"code":"en","Descripcion":"English"},{"code":"es","Descripcion":"Espa\u00f1ol"}];



  $scope.$watch('lang', function() {
    if (typeof $scope.lang =='string'){ 
      var langObject = JSON.parse($scope.lang);
      if( lang != langObject){
        console.log('cambio de idimoma y carga de nuevos literales')
        lang= langObject;
        //Coger el nuevo langJSONObject
        translateText(langJSONObject);
        
      } else {
        console.log('mantenemos idioma y literales');
      }
    }
    
  });
});


myApp.controller('AboutCtrl', function($scope) {
  $scope.message = "(',')---I am on About page---(',')";
});




myApp.controller('GalleryCtrl', function($scope, $routeParams, $location) {
  $scope.item = JSON.parse($routeParams.item);
  //  $scope.images = JSON.parse($routeParams.media);
  // $scope.indice = JSON.parse($routeParams.indice);
  $scope.message = "(',')---I am on Gallery page---(',')";
  $scope.images = [{
    image: 'https://c2.staticflickr.com/6/5135/5516993121_10f879e777_b.jpg'
  }, {
    image: 'https://c2.staticflickr.com/6/5057/5493576767_b71d1e71b6_b.jpg'
  }, {
    image: 'https://c2.staticflickr.com/6/5017/5493573511_748c1c86c3_b.jpg'
  }, {
    image: 'https://farm4.staticflickr.com/3861/14631739185_4e8d59b8b6.jpg'
  }, {
    image: 'https://farm3.staticflickr.com/2935/14445331407_6b565dce71.jpg'
  }, {
    image: 'https://farm4.staticflickr.com/3866/14628491121_97658bffc7.jpg'
  }, {
    image: 'https://farm3.staticflickr.com/2902/14631739625_c595bbd99c.jpg'
  }, {
    image: 'https://farm6.staticflickr.com/5471/14445119289_ae85e6f520.jpg'
  }, {
    image: 'https://farm6.staticflickr.com/5482/14628491991_2284e75e33.jpg'
  }];

});

myApp.controller('ContactCtrl', function($scope) {
  $scope.message = "(',')---I am on Contact page---(',')";
});



// DIRECTIVAS

myApp.directive('slider', function() {
  return {
    restrict: 'EA',
    scope: {
      images: '=images',
      group: '=group'
    },
    controller: function($scope) {
      $scope.group = $scope.group || 1;
      $scope.currentIndex = 0;
      $scope.direction = 'left';

      var init = function() {
        var images = [];
        var source = [];

        angular.copy($scope.images, source);

        for (var i = 0; i < source.length; i + $scope.group) {
          if (source[i]) {
            images.push(source.splice(i, $scope.group));
          }
        }
        $scope.setCurrent(0);
        $scope.slides = images;
      };

      $scope.$watch('group', init);


      $scope.setCurrent = function(index) {

        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
      };

      $scope.isCurrent = function(index) {
        return $scope.currentIndex === index;
      };

      $scope.next = function() {
        $scope.direction = 'left';

        $scope.currentIndex = $scope.currentIndex < $scope.slides.length - 1 ? ++$scope.currentIndex : 0;

      };

      $scope.prev = function() {
        // alert('preclic: ' + $scope.currentIndex);
        // alert('numero de fotos: ' + $scope.slides.length);
        $scope.direction = 'right';
        $scope.currentIndex = $scope.currentIndex > 0 ? --$scope.currentIndex : $scope.slides.length - 1;
        //    alert('postclic: ' + $scope.currentIndex);
      };
    },
    templateUrl: "slider.html",
    //    template: '<div class="slides group-{{group}}"><div ng-repeat="slide in slides"><div ng-show="isCurrent($index)" class="slide slide-animation"><div ng-repeat="item in slide" class="image"><img ng-src="{{item.image}}" /></div></div></div><div class="controls"><div class="navigation"><a ng-click="prev()" class="prev">< Prev</a><a ng-click="next()" class="next">Next ></a></div><ul class="pagination"><li ng-repeat="slide in slides" ng-click="setCurrent($index)"><span>{{$index+1}}</span></li></ul></div></div>',
    link: function(scope, element, attrs) {
      scope.$watch('currentIndex', function(value, previousValue) {
        // console.log(value, previousValue);

      });
    }
  };
});