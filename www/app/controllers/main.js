/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var cashbackOptions={
    0:0,
    2:5,
    3:8,
    4:10,5:12,6:15,7:20
}
function getCashBack(n){
    if(n>=2 && n<=7 ){
        return cashbackOptions[n];
    }else if(n>7){
        return cashbackOptions[7];
    }else {
        return cashbackOptions[0];
    }
}
angular.module('myApp').controller('MainController', ['$scope','contacts','WhatService', function ($scope,contactService,WhatService) {
    $scope.contactPage={
        minfriends:''
    };
    $scope.allDisabled=true;
    $scope.cashback=0;
    $scope.friends=[];
    $scope.contacts=[];
    $scope.contacts=[];
    $scope.whatData=[];
    $scope.selectedIndex='';
    $scope.what='';
    $scope.when='';
    [{displayName:'Test',phoneNumbers:[{value:12345678}]},{displayName:'Test2',phoneNumbers:[{value:123456728}]}];
    contactService.readContact(function (contacts) {
         $scope.contacts=contacts;
         $scope.$digest();
     });
    (function getWhatData(){
       WhatService.getWhatAndWhen().then(function(resp){
           $scope.whatData=resp;
           $scope.whatData.forEach(function(element, index){
               element.status=false;

           });
       },function(error){
       })
    })();
    $scope.optionSelected=function(elIndex){
        $scope.whatData.forEach(function(element, index){
            if(index!=elIndex){
                element.status=false;
            }
            else {
                element.status=true;
            }

        });
        $scope.what='';
        $scope.when='';
    };
    $scope.updateMoment=function(index,data,moment){
        $scope.selectedIndex=index;
        $scope.what=data.what;
        $scope.when=moment;
    };
    $scope.selectFriends=function (contact) {
        if(contact.checked){
            $scope.friends.push(contact);
        }else{
            var index=$scope.friends.indexOf(contact);
            if(index>-1){
                $scope.friends.splice(index,1);
            }
        }
    };
    $scope.declareMinFriend=function () {
      if($scope.contactPage.minfriends){
          $scope.allDisabled=false;
          $scope.cashback=getCashBack($scope.contactPage.minfriends);
          // if($scope.minfriends!=$scope.contacts.length){
          //  //TODO
          // }
      }else{
          $scope.allDisabled=true;
          $scope.cashback=0;
          $scope.contacts.forEach(function (c) {
              c.checked=false;
          });
      }
    };
    $scope.isMarked=function(moment,data){
        if(data.what==$scope.what){
            if(moment==$scope.when){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}]);
