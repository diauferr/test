export interface IPersistor {
  remove(annotations: any);
  save(instantJSON: string, selectedText: string);
}
