export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public phone: string,
        public gender: string,
        private _token: string,
        private tokenExpirationDate: Date
    ) {}
     get token() {
        if (!this.tokenExpirationDate || this.tokenExpirationDate < new Date()) {
            return null;
        }
        return this._token;
     }

     get tokenDuration() {
        if(!this.token) {
            return 0;
        }
        // return 2000;
        return this.tokenExpirationDate.getTime() - new Date().getTime();
     }
}
