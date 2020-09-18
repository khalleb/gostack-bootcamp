import IStorageProvider from "../models/IStorageProvider";

class DiskStorageProvider implements IStorageProvider {

  private storate: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storate.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storate.findIndex(
      storageFile => storageFile === file,
    )

    this.storate.splice(findIndex, 1);
  }
}

export default DiskStorageProvider;