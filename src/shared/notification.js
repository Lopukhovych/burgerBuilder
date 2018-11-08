import {NotificationManager} from "react-notifications";

export const createNotification = (type, message, header = '') => {
    const notificationTime = 1000;
    const notificationErrorTime = 1200;

    switch (type) {
        case 'info':
            NotificationManager.info(message, header, notificationTime);
            break;
        case 'success':
            NotificationManager.success(message, header, notificationTime);
            break;
        case 'warning':
            NotificationManager.warning(message, header, notificationTime);
            break;
        case 'error':
            NotificationManager.error(message, header, notificationErrorTime);
            break;
        default:
            NotificationManager.info(message, header, notificationTime);
    }
};


