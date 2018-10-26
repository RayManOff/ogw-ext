class BackgroundServer extends MessageServer {
    constructor() {
        super();
        this.service = 'http://ogw.ru/';
    }

    async short(url) {
        let response = await fetch(this.service + '~create?_json=1', {
            method: 'post',
            body: 'url=' + url,
        });

        const result = await response.json();
        if (result.status === true) {
            return {
                status : true,
                url_long: url,
                url_short: this.service + result.data.shlink.short
            }
        } else {
            return {
                status : false,
                url_long: url,
                url_short: ''
            }
        }
    }
}

new BackgroundServer();