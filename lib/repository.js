import fs from "node:fs/promises"

class Repository {
    #dir
    constructor(dir) {
        this.#dir = dir
    }

    async read() {
        let data = await fs.readFile(this.#dir, 'utf8')
        if (data) {
            data = JSON.parse(data)
        } else {
            data = []
        }
        return data
    }

    async write(data) {
        fs.writeFile(this.#dir, JSON.stringify(data, null, 2))
    }

    async writeNewData(data) {
        const allData = await this.read()
        allData.push(data)
        await this.write(allData)
    }
}

export { Repository }