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
angular.module('myApp').controller('MainController', ['$scope','contacts','$state','deals', function ($scope,contactService,$state,dealService) {
    $scope.page={
        slides:[{active:true},{active:false},{active:false}]
    };
    if($state.params.type){//0=first , 1=deal page
        $scope.page.slides[0].active=false;
        $scope.page.slides[2].active=true;
    }

    //deals page
    $scope.what='booze';
    $scope.when='morning';
    $scope.deals=[];
    $scope.page.next=function (index) {
        if(index==3){
            $state.go('as');// make call to rahul get thnx id and route to payments
        }
        $scope.page.slides.forEach(function (slide) {
            slide.active=false;
        });
        if(index==2){
            dealService.getDeals($scope.what,$scope.when).then(function (deals) {
                $scope.page.slides[index].active=true;
                $scope.deals=deals;
            })
        }else{
            $scope.page.slides[index].active=true;
        }
    };
    $scope.contactPage={
        minfriends:''
    };
    $scope.allDisabled=true;
    $scope.cashback=0;
    $scope.friends=[];

    $scope.contacts=[];//[{displayName:'Test',phoneNumbers:[{value:12345678}]},{displayName:'Test2',phoneNumbers:[{value:123456728}]}];
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

}]);
