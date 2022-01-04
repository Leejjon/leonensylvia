export const getHost = () => {
    let host = window.location.protocol + "//" + window.location.hostname;

    if (window.location.hostname === 'localhost' || window.location.hostname === '192.168.2.18') {
        host += ":8080";
    }
    return host;
};
