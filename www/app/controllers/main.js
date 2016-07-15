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
app.controller('MainController', ['$scope','contacts', function ($scope,contactService) {
    $scope.minfriends='';
    $scope.allDisabled=true;
    $scope.cashback=0;
    $scope.friends=[];
    $scope.contacts=[];//[{displayName:'Test',phoneNumbers:[{value:12345678}]}];
    contactService.readContact(function (contacts) {
         $scope.contacts=contacts;
         $scope.$digest();
     });
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
      if(!$scope.minfriends){
          $scope.allDisabled=false;
          $scope.cashback=getCashBack($scope.minfriends);
      }else{
          $scope.allDisabled=true;
          $scope.cashback=0;
      }  
    };
}]);
