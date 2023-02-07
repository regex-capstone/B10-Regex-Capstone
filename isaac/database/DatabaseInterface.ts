import type { IPage, IUser } from '../models/index';

export default interface Database {
  getPage(id: string): Promise<IPage>,
  // getUser(id: string): Promise<IUser>,

  // search(options?: any): Promise<IPage[]>,
}