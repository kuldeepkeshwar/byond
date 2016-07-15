/**
 * Created by gopaljee on 15/07/16.
 */


'use strict';

app.provider('pushNotification', function pushNotificationProvider($location) {
    var pushNotificationConfig = {};
    var push;

    this.setPushNotificationConfig = function(config) {
        pushNotificationConfig = config;

        push = PushNotification.init(config);

        PushNotification.hasPermission(function(data) {
            if (data.isEnabled) {
                console.log('isEnabled');
            }
        });

        push.on('registration', function(data) {
            console.log(data.registrationId);
        });
    };

    push.on('notification', function(data) {
        cb(data);
    });

    
});
