/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var cashbackOptions={
    0:0,
    2:5,
    3:8,
    4:10,5:12,6:15,7:20
};
function getCashBack(n){
    if(n>=2 && n<=7 ){
        return cashbackOptions[n];
    }else if(n>7){
        return cashbackOptions[7];
    }else {
        return cashbackOptions[0];
    }
}
angular.module('myApp').controller('MainController', ['$scope','contacts','$state','deals','WhatService', '$timeout','$rootScope',
    function ($scope,contactService,$state,dealService,WhatService,$timeout,$rootScope) {
        $scope.dealsPage={searchkey:"",price:''};

    $scope.page={
        slides:[{active:true},{active:false},{active:false}]
    };
    if($state.params.type){//0=first , 1=deal page
        $scope.page.slides[0].active=false;
        $scope.page.slides[2].active=true;
    }


    if($state.params.eventId){
        deals.getDealsDataByEvent($state.params.eventId).then(function (response) {
            $scope.deals = response.deals;
            $scope.deals.forEach(function(deal) {
                deal.selected = true;
            });
        });
    }

    //deals page
    $scope.deals=[];
    $scope.page.next=function (index) {
        if(index==3){

            var _data={
                budget:$scope.dealsPage.price||1000,
                what:$scope.what,
                when:$scope.when,
                cusotmerId:$rootScope.customerId,
                customerName:$rootScope.customerName,
                customerPhone:$rootScope.phoneNumber,
                dealsVos:$scope.deals.filter(function (deal) {
                    return deal.selected;
                }),
                with:$scope.friends.map(function (f) {
                    return {name:f.displayName,phoneNumber:f.phoneNumbers[0].value}
                })
            };
            dealService.createEvent(_data).then(function (data) {
                $state.go('payment',{txnId:data.payload.txnid,amount:data.payload.amount});// route to payments
            });

        }
        $scope.page.slides.forEach(function (slide) {
            slide.active=false;
        });
        if(index==2){
            dealService.getDeals($scope.what,$scope.when).then(function (deals) {
                $scope.page.slides[index].active=true;
                $scope.deals=deals;
            })
        }else if($scope.page.slides[index]){
            $scope.page.slides[index].active=true;
        }
    };
    $scope.contactPage={
        minfriends:''
    };
    $scope.allDisabled=true;
    $scope.cashback=0;
    $scope.friends=[];

    $scope.contacts=[];//[{checked:false,displayName:'Test',phoneNumbers:[{value:12345678}]},{checked:false,displayName:'Test2',phoneNumbers:[{value:123456728}]}];

    $scope.whatData=[];
    $scope.selectedIndex='';
    $scope.what='';
    $scope.when='';
    contactService.readContact(function (contacts) {
        $timeout(function () {
            contacts.forEach(function (c) {
                c.checked=false;
            });
            $scope.contacts=contacts;
        },0);
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
        contact.checked=!contact.checked;
        if(contact.checked){
            $scope.friends.push(contact);
        }else{
            var index=$scope.friends.indexOf(contact);
            if(index>-1){
                $scope.friends.splice(index,1);
            }
        }
        $scope.cashback=getCashBack($scope.friends.length);
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
    };
        $scope.fetchSuggestions= function(searchkey){
            console.log("called",searchkey.length);
            var data =[];

            if(searchkey.length>=3){
                console.log("here");
                dealService.getSuggestions($scope.what,$scope.when,searchkey).then(function(resp){
                    console.log($scope.what,$scope.when,searchkey,resp);
                    $scope.suggestions=resp;
                },function(error){
                });
            }
            else{
                $scope.suggestions=[];
            }

        };
        $scope.selectLocation=function(sug){
            $scope.suggestions=[];
            $scope.dealsPage.searchkey=sug.location;
            dealService.getDeals($scope.what,$scope.when,$scope.dealsPage.price,sug.deals).then(function(resp){
                $scope.deals=resp;
            });
            $scope.deals.forEach(function(element, index){
                element.selected=false;

            });
        };

    $scope.selectDeal=function (deal) {
        deal.selected=true;
    }
}]);
