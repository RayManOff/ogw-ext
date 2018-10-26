class MessageServer {
    constructor() {
        chrome.runtime.onMessage.addListener((request, sender, respond) => {
            console.log(request);
            (async () => {
                const method = request.command;
                const result = await this[method](...request.params) || {};
                try {
                    respond(result);
                } catch (e) {
                    console.log(e);
                }
            })();

            return true;
        });
    }
}

class MessageClient {
    static request(command, args) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ command: command, params: Array.from(args) }, result => {
                resolve(result);
            });
        });
    }
}