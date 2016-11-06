'use strict';

angular.module('angularBoilerApp').controller('MainCtrl', [ '$scope', 'Character', function($scope, character) {

    reset();
    
    $scope.reset = reset;
    $scope.cast = function(spellName){
        // TODO: will be replaced with factory
        if(spellName === 'attack'){
            console.log('Attack! ' + $scope.testPlayer.getAttackPower());
            var result = $scope.testPlayer.getAttackPower() * (1 - $scope.bossDummy.getArmor());
            $scope.bossDummy.damageTaken += result;
            if($scope.bossDummy.getHp() <= 0){
                $scope.bossIsDead = true;
            }
        }
    };
    
    function reset(){
        $scope.bossIsDead = false;
        $scope.testPlayer = character({
            name : 'Johanna',
            className: 'tank1'
        });
        
        $scope.bossDummy = character({
            name : 'Illidan',
            className: 'boss1'
        });
    }

} ]);
