import { IPersistor } from '../IPersistor';

export class StubAnnotationPersistor implements IPersistor {
  remove = () => {};

  save = async () => {};
}
