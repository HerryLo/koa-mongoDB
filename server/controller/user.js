import UserModel from '../model/UserModel'

class User {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(ctx, next) {
        ctx.body = 'hello Koa';
    }

    async register(ctx, next) {
        const { user, password, photo } = ctx.request.body;
        try {
            const result = await UserModel.findUser({ user: user });
            if (result[0]) {
                ctx.body = {
                    code: 1,
                    desc: '用户名已存在',
                    data: {}
                }
            } else {
                ctx.body = {
                    code: 0,
                    desc: '注册成功',
                    data: {
                        user: user,
                        photo: photo
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

}

export default new User()