declare global {
    interface Window {
        workbox: {
            messageSkipWaiting(): void;
            register(): void;
            addEventListener(name: string, callback: () => unknown): void;
        };
    }
}

const PwaUpdater = ({ msg }: { msg: string }) => {
    // window.Notification.requestPermission(function (status) {
    //     // status can be default, granted or denied
    //     console.log("Notification permission status:", status);
    // });

    // if (window.Notification.permission == "granted") {
    //     window.navigator.serviceWorker.getRegistration().then(function (reg) {
    //         reg?.showNotification(msg).then((s) => console.log("response from notification", s));
    //     });
    // }
    return <h2>persmission {window.Notification.permission}</h2>;
};

export default PwaUpdater;
