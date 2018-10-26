class PopupMessageClient extends MessageClient {
    static short(url) {
        return this.request('short', url);
    }
}

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const currentTab = tabs[0];
    (async () => {
        const res = await PopupMessageClient.short([currentTab.url]);
        document.getElementById('short_link').innerText = res.url_short;
    })();
});

