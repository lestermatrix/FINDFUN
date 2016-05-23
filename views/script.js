var app = angular.module('findfun',['ngRoute']);
//var mysql  = require('mysql');
//var app = angular.module('findfun',[]);


app.config(function($routeProvider){

  $routeProvider.when('/lista/estemomento',{
    templateUrl: 'views/estemomento.html',
  }).when ('/lista/listadia',{
    templateUrl: 'views/listadia.html',
  }).otherwise({
    redirectTo: '/'
  });

});




app.controller('controlador_lista',function($scope,$http,$timeout) {

  $scope.getList =function() {
      console.log("iniciando funcion getList");
      $http.post('/getestemomento').success(function(data,status,headers,config){
        $scope.lista = data;
        console.log(data[0].Nombre);
      }).error(function(data,status){
        alert("ERROR DE CONEXION");
      });
  }

  $scope.getListDay =function() {
      console.log("iniciando funcion getList");
      $http.post('/getlistadia').success(function(data,status,headers,config){
        $scope.lista = data;
        console.log(data[0].Nombre);
      }).error(function(data,status){
        alert("ERROR DE CONEXION");
      });
  }

})


app.directive('backImg', function(){
  console.log('usando directiva');
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                '-webkit-background-size': 'cover',//webkitt
                '-moz-background-size': 'cover',    //Mozilla
                '-o-background-size': 'cover',      //opera
                'background-size': 'cover',
                'background-repeat': 'no-repeat',


            });
        });
    };
});
