import IPage from '../models/IPage';
import IUser from '../models/IUser';

export default interface Database {
  getPage(id: string): Promise<IPage>,
  // getUser(id: string): Promise<IUser>,

  // search(options?: any): Promise<IPage[]>,
}