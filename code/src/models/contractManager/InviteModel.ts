import { InviteStatus } from '../../enums/InviteStatusType';
import moment from 'moment';

export class InviteModel {
  static DateFormat = 'DD/MM/YYYY HH:mm';

  constructor(
    public id: string,
    public email: string,
    public status: InviteStatus,
    public date: any
  ) {
    this.date = moment(date).format(InviteModel.DateFormat);
  }
}
