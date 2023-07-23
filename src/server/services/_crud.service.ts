export default abstract class CRUDService {
  abstract findAll(): any;

  abstract find(id: number): any;

  abstract create(): any;

  abstract update(id: number): any;

  abstract destroy(id: number): any;
}
