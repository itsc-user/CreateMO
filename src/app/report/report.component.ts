import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Buffer } from 'buffer';
import {
  CoreBase,
  IMIRequest,
  IMIResponse,
  MIRecord,
  IIonApiRequest,
  IIonApiResponse,
} from '@infor-up/m3-odin';
import {
  MIService,
  UserService,
  ApplicationService,
  IonApiService,
} from '@infor-up/m3-odin-angular';
import {
  SohoDataGridComponent,
  SohoMessageRef,
  SohoMessageService,
  SohoModalDialogService,
  SohoToastService,
} from 'ids-enterprise-ng';
import { InteractionService } from '../interaction.service';
import { DatePipe } from '@angular/common';

import { DataService } from '../data.service';
import { GlobalStore } from '../../store/global-store';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [DatePipe],
})
export class ReportComponent extends CoreBase implements OnInit {
  iFACI: any;
  iUCA3: any;
  iORQA: any;
  iRVQA: any;
  nORQA: any;
  iISSUED: any;
  newMO: number;
  iRSRVED: any;
  iRECEVD: any;
  oRNQT: string;
  nRNQA: any;
  reversebom = false;
  standardbom = false;
  cUCA3(event: any) {}

  lFACI: string;
  lWHLO: string;
  wWHLO: any;
  wFACI: any;
  dUDN4: number;
  isReadOnly = false;

  drillback_PO() {
    this.applicationService.launch(
      'bookmark?program=PPS200&startPanel=B&includeStartPanel=True&tableName=MPHEAD&sortingOrder=1&source=MForms&view=STD0101&requirePanel=True&keys=IACONO%2C400%2CIAPUNO%2C2200000076&fields=WFSLCT%2C%2520%2CWTSLCT%2C%2520%2CWFSLC2%2C%2520%2CWTSLC2%2C%2520%2CWFSLC3%2C%2520%2CWTSLC3%2C%2520%2CW1OBKV%2C' +
        this.iPO +
        '%2CW2OBKV%2C%2520&LogicalId=lid://infor.m3.m3'
    );
  }
  iPO: any;

  oUCA6: any;
  iUDN3: any;
  iUDN5: any;
  iUDN4: any;
  showPO = false;

  oUCA4: string;
  iSUNM: any;
  iSUNO: string;
  iUMS: any;
  respFR001: IMIResponse;
  oMSGN: number;
  respFR002: IMIResponse;
  respFR003: IMIResponse;
  respFR004: IMIResponse;
  oPUNO: any;

  oUCA5: any;
  iUCA6: any;

  iUCA5: any;

  iPUNO: string;
  qUCA3: any;

  qBANO: any;

  newlotno: string;
  qMSEQ: any;
  respGR0021a: unknown;
  respGR001Z: IMIResponse;
  oCombined: string;
  MMITDS: any;
  qCAMU: any;

  lotexists = false;
  acamu = false;

  processing = false;

  alerts: any[] = [];
  ALLOK: any;
  xBANO: any;
  attra: any[] = [];
  attrb: any[] = [];
  samea: boolean;

  xATNR: any;
  iPLGR: any;
  iWCLN: any;
  sWCLN: any;
  currentCompany: any;
  currentDivision: any;

  iTWSL: string;
  iPRNO: any;
  iMFNO: any;
  iRPQA: any;
  iWHSL: any;
  FACI: string;
  respGR001: IMIResponse;
  respGR002: IMIResponse;
  respGR003: IMIResponse;
  WHLO: any;
  respGR004: IMIResponse;
  respGR005: IMIResponse;
  respGR006: IMIResponse;
  respGR0021: IMIResponse;

  reqstock: number;
  posstock = false;
  negstock = false;

  oAVAP: any;

  linkedMO = true;
  linkedLot = false;
  negative = false;

  cBANO(event: any) {}

  sWHST: any;
  sWHHS: any;

  dialog?: SohoMessageRef;
  sWMST: any;
  qMTNO: any;
  qCNQT: any;
  itemsbano: any[] = [];

  openError02(errormessage) {
    const buttons = [
      {
        text: 'Close',
        click: (_e: any, modal: any) => {
          modal.close(true);
          (this.dialog as any) = null;
        },
        isDefault: true,
      },
    ];

    this.dialog = this.messageService
      .error()
      .title('<span>Info</span>')
      .message(errormessage)
      .buttons(buttons)
      .beforeOpen(() => {
        console.log('before open');
        return true;
      })
      .beforeClose(() => {
        console.log('before close');
        return true;
      })
      .open();
  }

  iCFI1: any;
  iCFI2: any;
  workcenter: any;
  iCFI1a: any;
  faci: string;

  unconnected: boolean;
  oCUCL: any;
  oRORN: any;
  oMAQA: any;
  oRVQA: any;
  oORQA: any;
  qPRNO: any;
  qITDS: any;
  oAVAL: any;

  placeholder: ViewContainerRef;
  oBANO: any;
  sITDS: any;

  @ViewChild('ReportDatagrid') datagrid: SohoDataGridComponent;

  datagridOptions: SohoDataGridOptions;
  items: any[] = [];
  detailItem: any;
  hasSelected: boolean;
  isBusy = false;
  isDetailBusy = false;
  sum: number;
  reportstatus: string;

  private maxRecords = 10000;
  private pageSize = 20;

  private DWDTfrom = '00000000';
  private DWDTto = '99999999';
  private PLDTfrom = '00000000';
  private PLDTto = '99999999';
  private PUDTfrom = '00000000';
  private PUDTto = '99999999';

  input01: string;
  items001: any[] = [];
  items002: any[] = [];
  poresult: any[] = [];
  poresult15: any[] = [];
  poresult20: any[] = [];
  poresult40: any[] = [];
  poresult75: any[] = [];
  poresult85: any[] = [];
  selitem: any;
  iPNLI: any;
  iPONO: any;
  status01s: string;
  status02s: string;
  poresult20L: any[];
  poresult40L: any[];
  poresult75L: any[];
  poresult85L: any[];
  items004: any[] = [];
  poresult2: any[];
  items005: any[] = [];
  poresult3: any[];
  season: string;
  supplier01: string;
  planfrom: string;
  planto: string;
  reqfrom: string;
  reqto: string;
  planfromO: string;
  plantoO: string;
  reqfromO: string;
  reqtoO: string;
  items006: any[] = [];
  poresult4: any[] = [];

  myDate = new Date();
  curdate01: string;
  curtime01: string;
  curtimestamp: string;
  today: number = Date.now();
  curdatexx1: number;
  curdatel: string;
  curdatem: string;

  api001: string;
  api002: string;
  api003: string;
  api004: string;
  api005: string;
  ordfromO: string;
  ordfrom: any;
  ordto: string;
  ordtoO: string;
  items100: any[] = [];
  items001F: any[] = [];
  items002F: any[] = [];
  items003F: any[] = [];
  items004F: any[] = [];
  items005F: any[] = [];
  poresult2f: any[] = [];
  poresult3f: any[] = [];
  poresult4f: any[] = [];
  poresultf: any[] = [];
  items001FG: any = [];
  items002FG: any = [];
  items003FG: any = [];
  items004FG: any = [];
  items005FG: any = [];
  items001T: any = [];
  Items001T: any[];
  text: string;
  puno: any;
  pnli: any;
  potext01: string;
  potextarr: any = [];
  phead: any;
  pline: any;
  poheadT: any;
  polinT: any;
  potextarr1: any = [];
  curcono: string;
  fromord: number;
  toord: number;
  ordfromN: number;
  ordtoN: number;
  index: any;
  queryid: number;
  queryId: any;
  querystatus: string;
  curstatus: string;
  currows: string;
  puno1: string;
  PUNO1: string;
  result001: any = [];
  resultset: any = [];
  body01: any;
  polines: any = [];
  subr01: string;
  items001x01: any = [];
  iREPN: any;
  iWHLO: any;
  iCUNO: any;
  nvalue: any;
  nta3: any;
  count: number;
  TX15: any;
  STKY: any;
  AITM: any;

  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:variable-name
  constructor(
    private toastService: SohoToastService,
    private dataService: DataService,
    private ionApiService: IonApiService,
    private datePipe: DatePipe,
    private globalStore: GlobalStore,
    private _interactionService: InteractionService,
    private modalService: SohoModalDialogService,
    private miService: MIService,
    private userService: UserService,
    private messageService: SohoMessageService,
    private applicationService: ApplicationService
  ) {
    super('ReportComponent');
  }


async ngOnInit() {
  this.items001x01 = [];

  this.iFACI = localStorage.getItem('D001');
  this.iMFNO = localStorage.getItem('D002');
  this.iPRNO = localStorage.getItem('D003');

  // Force integer (no decimals)
  this.iORQA = Math.floor(parseFloat(localStorage.getItem('D004') || '0')).toString();
  this.iRVQA = Math.floor(parseFloat(localStorage.getItem('D005') || '0')).toString();
  this.oRNQT = localStorage.getItem('D015');

  console.log('dess ' + this.oRNQT);

  this.globalStore.setFACI(this.FACI);

  // Convert values safely (now integer)
  const orqa = parseFloat(this.iORQA) || 0;   // already no decimals
  const rvqa = parseFloat(this.iRVQA) || 0;

  const diff = Math.floor(orqa - rvqa);

  // If D015 has a valid number → override nORQA
  if (this.oRNQT && !isNaN(parseFloat(this.oRNQT))) {
    this.nORQA = Math.floor(parseFloat(this.oRNQT));
    this.reversebom = true;
    this.standardbom = false;
  } else {
    this.reversebom = false;
    this.standardbom = true;
    this.nORQA = diff;
  }

  // Remaining qty also without decimals
  this.nRNQA = Math.floor(parseFloat(this.oRNQT) || 0);
}



  clearReport() {
    this.datagrid
      ? (this.datagrid.dataset = [])
      : (this.datagridOptions.dataset = []);
  }

  updateGridData() {
    this.datagrid
      ? (this.datagrid.dataset = this.itemsbano)
      : (this.datagridOptions.dataset = this.itemsbano);
    this.setBusy(false);
  }

  onSelected(args: any[], isSingleSelect?: boolean) {
    if (this.isBusy) {
      return;
    }

    const newCount = args.length;
    const selected = args && newCount === 1 ? args[0].data : null;
    this.hasSelected = !!selected;
    if (this.hasSelected) {
      console.log(selected.F1A030);

      this.iREPN = selected.REPN;
      this.iWHLO = selected.WHLO;
      this.AITM = selected.AITM;

      localStorage.setItem('D004', '');
      localStorage.setItem('D004', this.AITM);

      console.log(this.iREPN);
      console.log(this.iWHLO);
    }
  }

  private setBusy(isBusy: boolean, isDetail?: boolean) {
    isDetail ? (this.isDetailBusy = isBusy) : (this.isBusy = isBusy);
  }

  private handleError(message: string, error?: any) {
    this.logError(message, error ? '- Error: ' + JSON.stringify(error) : '');
    const buttons = [
      {
        text: 'Ok',
        click: (e, modal) => {
          modal.close();
        },
      },
    ];
    this.messageService
      .error()
      .title('An error occured')
      .message(
        message + '. More details might be available in the browser console.'
      )
      .buttons(buttons)
      .open();
  }
}
