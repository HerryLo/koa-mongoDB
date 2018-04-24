class Api {
    constructor(){
        this.get = this.get.bind(this);
    }

    async get(ctx, next){
        ctx.body = '123'
    }
    
}

export default new Api()