import archiver from "archiver";
import { PassThrough } from "stream";

export function generateZip(files) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = new PassThrough();

  archive.pipe(stream);

  files.forEach(file => {
    archive.append(file.content, { name: file.name });
  });

  archive.finalize();
  return stream;
}
