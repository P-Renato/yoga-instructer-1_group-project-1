import fs from "fs"

export function ReadDb() {
    return fs.readFileSync("database/data.json", "utf-8")
}

export function WriteDb(data) {
    return fs.writeFileSync("database/data.json", JSON.stringify(data), "utf-8")
}