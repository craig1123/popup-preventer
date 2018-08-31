var domains = {
    "www.businessinsider.com": 'tp-modal',
    "www.sltrib.com": 'tp-modal',
    "www.nytimes.com": 'clearCookies',
};
var domainMessage = domains[document.location.host];

if (domainMessage) {
    var timesRun = 0;
    var interval = setInterval(function(){
        timesRun += 1;
        if (timesRun === 10) {
            clearInterval(interval);
        } else {
            checkPopup();
        }
    }, 2000);
}

function checkPopup() {
    if (domainMessage === 'tp-modal' && document.activeElement === document.body) {
        var tpModal = document.getElementsByClassName('tp-modal')[0];
        if (tpModal) {
            clearInterval(interval);
            var tpActive = document.getElementsByClassName('tp-backdrop tp-active')[0];
            tpModal.parentNode.removeChild(tpModal);
            tpActive.parentNode.removeChild(tpActive);
            document.body.classList.remove('tp-modal-open');
            window.scrollTo(0,0);
        }
    } else if (domainMessage === 'clearCookies') {
        clearInterval(interval);
        var sendDomain = {
            "www.nytimes.com": ".nytimes.com",
        };
        chrome.runtime.sendMessage({ type: domainMessage, domain: sendDomain[document.location.host] });
    }
}