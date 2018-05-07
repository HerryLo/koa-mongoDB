import jwt from 'jsonwebtoken'
import config from '../config/config'

class Api {
    constructor() {
        this.get = this.get.bind(this);
    }
    
    async get(ctx, next) {
        const { id, user } = ctx.state;
        if(id && user){
            const file = ctx.file;
        }
    }

}

export default new Api()