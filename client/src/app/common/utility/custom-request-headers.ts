export class CustomRequestHeaders {

    private header: HeaderObject[] = [];

    get(key) {
        const singleHeader = this.header.filter(single => single.key === key);
        if (singleHeader && singleHeader.length > 0) {
            return singleHeader[0].value;
        }
        return null;
    }

    set(key, value) {
        if (key && value) {
            const singleHeader = new HeaderObject();
            singleHeader.key = key;
            singleHeader.value = value;
            this.header.push(singleHeader);
        }
    }

    keys() {
        const keys = [];
        this.header.forEach(singleHeader => {
            keys.push(singleHeader.key);
        });
        return keys;
    }

    isEmpty() {
        return this.header.length === 0;
    }
}

class HeaderObject {
    key: string;
    value: string;
}
