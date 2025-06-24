import fs from "fs";
import path from "path";

import domains from "../domains/index.json";

export function joinSubclasses(className: string): Subclass[] {
  const subclassesDir = path.join(
    __dirname,
    "..",
    "subclasses",
    className.toLowerCase()
  );

  if (!fs.existsSync(subclassesDir)) {
    return [];
  }

  const files = fs.readdirSync(subclassesDir);
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

export function joinDomains(domainIds: string[]): Domain[] {
  const { domain } = domains;

  const domainList: Domain[] = domainIds.reduce((acc, dmn) => {
    const domainData = domain.find((d) => d.id === dmn);
    if (domainData) {
      acc.push(domainData);
    }
    return acc;
  }, [] as Domain[]);

  return domainList;
}

