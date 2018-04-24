class User {
    constructor(){
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(ctx, next){
        ctx.body = 'hello Koa';
    }

    async register(ctx, next){
        ctx.body = {
            test: 'json'
          }
    }
    
}

export default new User()