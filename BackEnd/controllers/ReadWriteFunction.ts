import fs from "fs"


export function ReadDb() {
    return fs.readFileSync("database/data.json", "utf-8")
}

interface DatabaseData {
    // Define the shape of your data here, for example:
    // id: number;
    // name: string;
    // Add more fields as needed
    [key: string]: any;
}

export function WriteDb(data: DatabaseData): void {
    return fs.writeFileSync("database/data.json", JSON.stringify(data), "utf-8");
}