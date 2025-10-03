import { v4 } from 'uuid'

class UserEntity {
    constructor(name, email, password, role) {
        this.id = v4();
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export { UserEntity }