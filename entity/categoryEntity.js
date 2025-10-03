import { v4 } from 'uuid'

class CategoryEntity {
    constructor(name, description) {
        this.id = v4()
        this.name = name;
        this.description = description;
    }
}

export { CategoryEntity }