class PopupMessageClient extends MessageClient {
    static short(url) {
        return this.request('short', url);
    }
}

class PopupInteract {
    constructor () {
        this.toCopyBotton = document.getElementById('to_copy');
        this.toShortBotton = document.getElementById('to_short');
        this.shortLinkNode = document.getElementById('short_link');
        this.longLinkNode = document.getElementById('long_link');
    }

    init() {
        let _this = this;
        this.toCopyBotton.onclick = () => {
            _this.copyShortLink();
        };
        this.toShortBotton.onclick = () => {
            let longLink = _this.longLinkNode.value;
            if (!longLink) {
                console.log('There is no long link');
                return;
            }
            _this.shortLongLink(longLink);
        };

        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            const currentTab = tabs[0];
            _this.shortLongLink(currentTab.url);
        });
    }

    copyShortLink() {
        if (window.getSelection) {
            let selection = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(this.shortLinkNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        try {
            document.execCommand('copy');
            console.log('Short link has been copied');
        } catch (err) {
            console.log('Cannot to copy short link');
        }
    }

    shortLongLink(url) {
        let _this = this;
        (async () => {
            const res = await PopupMessageClient.short([url]);
            _this.shortLinkNode.innerText = res.url_short;
        })();
    }
}

window.onload = () => {
    let popupInteract = new PopupInteract();
    popupInteract.init();
};
