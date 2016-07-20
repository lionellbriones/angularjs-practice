angular
    .module('disks', [])
    .controller('DiskController', DiskController)
    .controller('DiskEditController', DiskEditController)
    .service('DiskService', DiskService)
    .factory('DiskFactory', DiskFactory)
    .directive('diskDirective', diskDirective);


DiskController.$inject = ['$scope', 'DiskService'];
DiskEditController.$inject = ['$scope', 'DiskService'];
DiskService.$inject = ['DiskFactory'];
DiskFactory.$inject = ['$http'];

function DiskController($scope, DiskService){
    var vm = this;

    vm.disks = DiskService.disks;
}

function DiskEditController($scope, DiskService) {
    var vm = this;

    vm.disks = DiskService.disks;
    vm.addDisk = addDisk;
    vm.deleteDisk = deleteDisk;
    

    init();
    function init(){
        DiskService.getDisks();
    }

    function addDisk(){
        vm.disks.push({
            name: ''
        })
    }

    function deleteDisk(key){
        vm.disks.splice(key, 1);
    }
}

function DiskService(DiskFactory) {
    var self = this

    self.disks = [];
    self.getDisks = getDisks;

    function getDisks(){
        DiskFactory.getDisks().then(function(disks){
            angular.forEach(disks, function(disk) {
                self.disks.push(disk);
            });
            
        });
    }
}

function DiskFactory($http){
    return {
        getDisks: getDisks
    }
    
    function getDisks(){
        return $http({
            url: "disks.json"
        }).then( function(res){
            return res.data; 
        }, function(err){
            console.log(err);
        });
    }
}

function diskDirective() {
    return {
        template: '{{diskCtrl.disks | json}}'
    }
}