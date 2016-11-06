'use strict';

angular.module('angularBoilerApp')
    .factory('BaseStats', [ function() {
        var BASE_STATS = {
            tank1: {
                maxHp: 9000,
                attackPower: 500,
                armor: 0.4
            },
            boss1: {
                maxHp: 3000,
                attackPower: 500,
                armor: 0.3
            }
        };
        
        return function(className){
            return BASE_STATS[className];
        };
    }])
    .factory('CharacterUtils', ['BaseStats', function(baseStats) {
        return {
            getHp: function(character){
                // TODO: here will be calculatet current state of HP based on modifiers(buffs/debuffs);
                return baseStats(character.className).maxHp - character.damageTaken;
            },
            getAttackPower: function(character){
                // TODO: here will be calculatet current state of attack power based on modifiers(buffs/debuffs);
                return baseStats(character.className).attackPower;
            },
            getArmor: function(character){
                // TODO: here will be calculatet current state of armor based on modifiers(buffs/debuffs);
                return baseStats(character.className).armor;
            }
        };
    }])
    .factory('Character', ['CharacterUtils', function(characterUtils) {
        return function(options){
            //This is dynamic Character data, stored in Data Base
            var characterBean = {
                name: options.name,
                className: options.className,
                damageTaken: 0,
                modifiers: [], // collection of all buff / debuffs
            };
            angular.forEach(characterUtils, function(utilsMethod, utilsMethodName){
                characterBean[utilsMethodName] = function(){
                    return utilsMethod(characterBean);
                };
            });
            
            return characterBean;
        };
    } ]);
