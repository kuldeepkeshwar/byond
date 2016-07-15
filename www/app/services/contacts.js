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
angular.module('myApp').service('contacts',function () {
   this.readContact=function (cb) {
       loadContacts(cb);
   };
});