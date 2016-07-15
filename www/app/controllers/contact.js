/**
 * Created by kuldeepkeshwar on 15/07/16.
 */

function onError(contactError) {
    alert('onError!');
};
function loadContacts(cb) {
    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields       = [navigator.contacts.fieldType.displayName,navigator.contacts.fieldType.phoneNumbers];
    navigator.contacts.find(fields, cb, onError, options);

}
app.controller('ContactController', ['$scope', function ($scope) {
    loadContacts(function (contacts) {
        //alert('got it'+JSON.stringify(contacts));
        $scope.contacts=contacts; //phoneNumbers[0].value
        $scope.$digest();
        //alert(2);
    });
}]);