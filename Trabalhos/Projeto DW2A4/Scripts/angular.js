let app = angular.module("App", ["ngRoute"])

// Controladores para executar funções assim que a página é carregada.
app.controller('UnidadeController', function ($scope) {
    $scope.incluirUnidades = function () {
        var unidadeSample = new Unidade()
        unidadeSample.incluirUnidade()
    }
})

app.controller('CardapioController', function ($scope) {
    $scope.incluirPratos = function () {
        var pratoSample = new Prato()
        pratoSample.incluirPrato()
    }
})

app.controller('CadastroController', function ($scope) {
    $scope.mostrarCadastro = function () {
        var cadastroSample = new Cadastro()
        cadastroSample.mostrarCadastro()
    }
})

// Provisor de rota, para mudar a página exibida de acordo com a página na barra de navegação que o usuário clicou.
app.config(function($routeProvider) {
    $routeProvider
        .when("/inicio", {
            templateUrl: "Templates/inicio.html"
        })
        .when("/cardapio", {
            templateUrl: "Templates/cardapio.html"
        })
        .when("/unidades", {
            templateUrl: "Templates/unidades.html"
        })
        .when("/historia", {
            templateUrl: "Templates/historia.html"
        })
        .when("/cadastro", {
            templateUrl: "Templates/cadastro.html"
        })

        .otherwise({redirectTo: "/inicio"})
})
