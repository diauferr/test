export class PeriodicInfoModel {
  constructor(
    public id: number,
    public sigla: string,
    public title: string,
    public image: string,
    public description: string,
    public cdd: string,
    public cdu: string,
    public issn: string,
    public periodicity: string,
    public doutrinas: number,
    public jurisprudencias: number,
    public expedientePdf: string,
    public normasPdf: string,
    public qualis: string,
    public type: string,
    public formattedDate: string
  ) {}
}
