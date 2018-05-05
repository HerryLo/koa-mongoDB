import jwt from 'jsonwebtoken'
import config from '../config/config'

class Api {
    constructor() {
        this.get = this.get.bind(this);
    }
    
    async get(ctx, next) {
        const state = ctx.state;
        if (state.id) {
            ctx.body = {
                id: state.id,
                user: state.user
            };
        } else {
            ctx.body = {
                state
            };
        }
    }

}

export default new Api()