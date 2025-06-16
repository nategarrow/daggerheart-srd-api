import fs from "fs";
import path from "path";

// If using CommonJS, __dirname is available natively
export function joinSubclasses(className: string): Subclass[] {
  const subclassesDir = path.join(
    __dirname,
    "..",
    "subclasses",
    className.toLowerCase()
  );
  console.log(" subclassesDir:", subclassesDir);

  console.log(" fs.existsSync(subclassesDir):", fs.existsSync(subclassesDir));
  if (!fs.existsSync(subclassesDir)) {
    return [];
  }

  //  subclassesDir: /Users/ngarrow/Development/NGTech/projects/daggerheart-api/dist/routes/subclasses/bard
  
  console.log(" subclassesDir:", subclassesDir);

  const files = fs.readdirSync(subclassesDir);
  console.log(" files:", files?.length);
  const subclasses: Subclass[] = [];

  files.forEach((file) => {
    const filePath = path.join(subclassesDir, file);

    if (fs.statSync(filePath).isFile() && file.endsWith(".json")) {
      const subclass = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (
        subclass.classId &&
        subclass.classId.toLowerCase() === className.toLowerCase()
      ) {
        subclasses.push(subclass);
      }
    }
  });

  return subclasses;
}
