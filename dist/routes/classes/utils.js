"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinSubclasses = joinSubclasses;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// If using CommonJS, __dirname is available natively
function joinSubclasses(className) {
    const subclassesDir = path_1.default.join(__dirname, "..", "subclasses", className.toLowerCase());
    console.log(' subclassesDir:', subclassesDir);
    console.log(" fs.existsSync(subclassesDir):", fs_1.default.existsSync(subclassesDir));
    if (!fs_1.default.existsSync(subclassesDir)) {
        return [];
    }
    //  subclassesDir: /Users/ngarrow/Development/NGTech/projects/daggerheart-api/dist/subclasses/bard
    console.log(" subclassesDir:", subclassesDir);
    const files = fs_1.default.readdirSync(subclassesDir);
    console.log(" files:", files?.length);
    const subclasses = [];
    files.forEach((file) => {
        const filePath = path_1.default.join(subclassesDir, file);
        if (fs_1.default.statSync(filePath).isFile() && file.endsWith(".json")) {
            const subclass = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            if (subclass.classId &&
                subclass.classId.toLowerCase() === className.toLowerCase()) {
                subclasses.push(subclass);
            }
        }
    });
    return subclasses;
}
