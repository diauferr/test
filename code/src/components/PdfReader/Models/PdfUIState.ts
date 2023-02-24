import _ from 'lodash';

export class PdfUIState {
  static readonly Empty = new PdfUIState();

  private constructor(
    public showTitle = false,
    public contentVisible = true,
    public summaryVisible = false,
    public error = false,
    public showBottomNextContentButton = false,
    public showContentMenu = false,
    public showNextPrevButtons = false,
    public showPrintLoading = false
  ) {
    if (summaryVisible) {
      this.showBottomNextContentButton = false;
      this.showNextPrevButtons = false;
    } else {
      this.showNextPrevButtons = true;
    }

    if (error) {
      this.summaryVisible = false;
      this.contentVisible = false;
      this.showTitle = false;
      this.showBottomNextContentButton = false;
      this.showContentMenu = false;
      this.showPrintLoading = false;
    }
  }

  private fromObject = (obj: object) =>
    new PdfUIState(
      _.get(obj, 'showTitle', this.showTitle),
      _.get(obj, 'contentVisible', this.contentVisible),
      _.get(obj, 'summaryVisible', this.summaryVisible),
      _.get(obj, 'error', this.error),
      _.get(
        obj,
        'showBottomNextContentButton',
        this.showBottomNextContentButton
      ),
      _.get(obj, 'showContentMenu', this.showContentMenu),
      this.showNextPrevButtons,
      _.get(obj, 'showPrintLoading', this.showPrintLoading)
    );

  setTitleVisibility = (visible: boolean) =>
    this.fromObject({ showTitle: visible });

  setNextButtonVisibility = (visible: boolean) =>
    this.fromObject({ showBottomNextContentButton: visible });

  setContentMenuVisibility = (visible: boolean) =>
    this.fromObject({ showContentMenu: visible });

  setShowPrintLoading = (visible: boolean) =>
    this.fromObject({ showPrintLoading: visible });

  showContent = () =>
    this.fromObject({
      contentVisible: true,
      summaryVisible: false
    });

  showSummary = () =>
    this.fromObject({
      summaryVisible: true,
      showTitle: false,
      contentVisible: false
    });

  setError = () => this.fromObject({ error: true });
}
