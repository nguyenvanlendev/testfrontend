interface IStyle {
  borderRadius?: Property.BorderRadius<string | number>;
  height?: Property.Height<string | number>;
  width?: Property.Width<string | number>;
  padding?: Property.Padding<string | number>;
  className?: string;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  color?: string;
}

interface IModalOTP {
  title?: any;
  text?: any;
  phone?: any;
  isOpen?: any;
  setIsOpen?: any;
  type?: any;
  name?: any;
  email?: any;
  validate?: any;
  isLoggedIn?: any;
  setErrorField?: any;
  hasErr?: any;
  dummy?: any;
  isValidatedPhone?: any;
  isValidatedEmail?: any;
  setIsVerifingPhone?: any;
  setIsVerifingEmail?: any;
}

interface IAvatar extends IStyle {
  image?: string | null;
  className?: string;
  height?: number | string;
  width?: number | string;
  borderRadius?: number;
  marginRight?: number;
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  hasBorder?: boolean;
  secondImage?: string;
  isCursor?: boolean;
  filter?: string;
}

interface IButton extends IStyle {
  className?: string;
  borderRadius?: Property.BorderRadius<string | number>;
  height?: Property.Height<string | number>;
  width?: Property.Width<string | number>;
  padding?: Property.Padding<string | number>;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isBlur?: boolean;
  children?: any;
  isDisable?: boolean;
}

interface IPrimaryButton extends React.CSSProperties {
  shape?: 'circle';
  size?: 'xs' | 'sm' | 'md' | 'xmd' | 'xxmd' | 'm' | 'xl' | 'l';
  bgColor?: 'blue' | 'yellow' | 'dark-yellow' | 'transparent' | 'red' | 'real-trans' | 'glass';
  // textColor?: 'black' | 'white' | 'transparent';
  className?: string;
  disabled?: boolean;
  hideBorder?: boolean;
  checkedIcon?: boolean;
  wrongIcon?: boolean;
  styleExam?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: any;
}

interface IInput extends IStyle {
  styleLabel?: any;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  validation?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onFocus?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type?: 'text' | 'password' | 'number' | 'decimal';
  pattern?: string;
  background?: Property.Background<string | number> | undefined;
  backgroundDisable?: Property.Background<string | number> | undefined;
  id?: any;
  classNameContainer?: string;
  classNameInput?: string;
  error?: any;
  hasSearch?: boolean;
  disabled?: boolean;
  autoComplete?: 'off' | 'on';
  flex?: any;
  firstSubmitted?: boolean;
  validateRequested?: boolean;
  isShowEge?: boolean;
  subIcon?: any;
  classNameIcon?: any;
  isWhiteEye?: boolean;
  isLockSpace?: boolean;
  hasErr?: any;
  isUpperCase?: boolean;
  isDisable?: boolean;
  maxLength?: number;
  minLength?: number;
  dummy?: any;
  maxWidth?: number;
  paddingLeft?: any;
  required?: boolean;
  forceUpdateValue?: any;
  propGetValForceUpdate?: any;
  notOnChangeWhenForceUpdate?: boolean;
  colorLabel?: any;
  colorText?: any;
  fontWeightLabel?: any;
  onKeyPress?: any;

  classNameLabel?: any;
  onkeypress?: any;
  isLabel?: any;
  HTMLFor?: any;
  autoFocus?: any;
  subLabel?: any;
  setError?: any;
  setValid?: any;
  successFlag?: any;
  typeAdmission?: any;
  isClear?: any;
  setName?: any;
  isNumber?: boolean;
}

interface IInputReset {
  label?: string;
  placeholder?: string;
  onChange?: any;
  type?: 'text' | 'password';
  validation?: string;
  error?: any;
  background?: Property.Background<string | number> | undefined;
  marginBottom?: number;
  firstSubmitted?: boolean;
  onBlur?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  id?: any;
  isDisable?: boolean;
  maxLength?: number;
  maxWidth?: string;
  value?: string;
  onFocus?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  colorLabel?: any;
  fontWeightLabel?: any;
  isReset?: boolean;
}

interface ITextArea {
  className?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  id?: any;
  isDisable?: boolean;
  maxLength?: number;
  maxWidth?: string;
  disabled?: boolean;
	error?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onFocus?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

interface IConfirmModal {
  className?: string;
  isOpen?: boolean;
  setIsOpen?: any;
  children?: any;
}

interface ILoader {
  className?: string;
  color?: string;
  marginTop?: number;
  height?: number;
  isSmall?: boolean;
  marginRight?: number;
  classNameContent?: any;
}

interface IModal extends IStyle {
  isOpen?: boolean | string;
  className?: string;
  classNameContent?: string;
  setIsOpen?: any;
  backgroundColorOverlay?: any;
  color?: Property.Color | undefined;
  title?: string;
  hasHeader?: boolean;
  maxWidth?: string;
  margin?: string;
  topLeftModal?: boolean;
  offClickOutside?: boolean;
  children?: any;
  text?: string;
  clickOutside?: any;
  onClose?: any;
}

interface IModalPopUp extends IModal {
  yellowCloseButton?: boolean;
  isGiftBannerFromForm?: boolean;
  include6thGift?: boolean;
  ssn?: string;
  couponToco?: string;
}

interface ISidebar {
  background?: string;
  backdropFilter?: string;
  className?: string;
  position?: string;
  isFromLogin?: boolean;
}

interface IDropdownMenu {
  options: Array<{ value: number | undefined; label: string | undefined }>;
  onChange: (event: React.FormEvent<HTMLDivElement>) => void;
  backgroundColorIcon?: string;
  placeholder?: string;
  className?: string;
  isOver?: boolean;
  optionPowerGrade: Array<IGradePower>;
  isConvertIdToIndex?: boolean;
  indexOption?: number;
}

interface ICard extends React.CSSProperties {
  width?: String | number;
  imgCard: string;
  title?: string;
  subTitle?: string;
  className?: string;
  onClick?: any;
}

interface IDropdownSelect {
  data?: Array<IItem>;
  label?: string;
  placeholder: string;
  onChange?: any;
  value?: any;
  error?: string;
  isDependValueOutside?: boolean;
  initialValue?: any;
  className?: string;
  classNameInput?: string;
  classNamePlaceholder?: string;
  isNotAllowedEdit?: boolean;
  iconRight?: any;
  sublabel?: any;
  id?: any;
}

interface IInfiniteScroll {
  className?: string;
  dataLength: number;
  next: any;
  hasMore: boolean;
  loader?: JSX.Element;
  scrollThreshold?: string | number;
  scrollableTarget?: string;
  height?: any;
  children?: any;
}

interface IModal {
  isShow?: boolean | string;
  className?: string;
  setIsShow?: any;
  backgroundColorOverlay?: string;
  classNameContainer?: string;
  isHiddenClickOutside?: boolean;
  resetField?: () => void;
  handleDiscard?: any;
}

interface IModalCommon {
  isShow?: boolean | string;
  setIsShow?: any;
  type?: number;
  size?: 'L' | 'S';
  children?: any;
  className?: any;
  onSubmit?: any;
  setSubmit?: any;
  handleReveiveInfo?: any;
  isDisc?: boolean;
}

interface IModalConfirm extends IModal {
  onConfirm?: () => void;
  onCancel?: () => void;
  content?: string;
  color?: 'blue' | 'red' | 'transparent' | 'form-blue';
  title?: string;
  oneBtn?: boolean;
  isSingleButtonConfirm?: boolean;
  buttonCaption?: string;
  iconSuccess?: boolean;
  classNameContainer?: any;
  allowClickOutside?: boolean;
  isOnlyConfirm?: boolean;
  closeButton?: boolean;
  buttonClassName?: string;
  isSingleButtonConfirm?: boolean;
  buttonCaption?: string;
  iconSuccess?: boolean;
  buttonSize?: string;
  opacity?: number;
  directSubmitTheme?: boolean;
  directSubmitConfirmationTheme?: boolean;
  isError?: boolean;
}
interface IQuestionDetail {
  question?: string;
  index: number;
  setAnswers: any;
  previousAnswer?: IResUserAnswerQuestion;
  newestAnswer: Array<IResNewsestUserAnswerQuestion>;
  situationgroupid: number;
  situationid: number;
  questionid: number;
  onChange?: any;
}

interface IMultipleOptions extends IQuestionDetail {
  placeholder?: string;
}
interface IRadioQuestion extends IQuestionDetail {
  answers: Array<IQuestionAnswer>;
  multiple?: boolean;
}

interface ICaseQuestion {
  setListAnswer: any;
  listAnswer: any;
  className?: 'string';
  setIsQuestion: any;
  situation: ISituation;
  situationgroupid: number;
  situationid: number;
  listenerClickSubmit?: any;
  progressExam: number;
  setProgressExam: any;
  isReDo?: boolean;
  setOpenModal: any;
  openModalResult?: boolean;
}
interface ISearchBarExam {
  handleResultData?: (data) => void;
  handleResetResult?: () => void;
  setSubHeading?: (data: string) => void;
  defaultBoardIndex?: number;
}

interface INotification {
  isShow: Boolean;
  handleClose: any;
  notifyMessage: string;
}

interface IListResultData {
  className?: string;
  data: Array<{ leftData: any; rightData: any }>;
  handleClickText?: (data: any) => void;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

interface ITopSchoolResult {
  listSchoolResult: any;
  loading?: Boolean;
  handleClickStudent: (row: any) => void;
  handleClickSchool?: any;
}
interface IListSchoolItem {
  onHoverSchool: (returnData: any, key: number) => void;
  handleMouseLeave: (returnData: any) => void;
  handleClickSchool?: (school: any) => void;
  handleClickStudent?: any;
  keyIndex: number;
  isShowPopup?: Boolean;
  school: any;
  isLeftArrow?: boolean;
}
interface ISection {
  onNext?: any;
  isActive?: boolean;
}

// interface IPaticipants {
//   paticipants: IPersonal[] | ISchool[];
// }

interface IPersonal {
  userid: number;
  name: string;
  ispost: number;
  linkpost: string;
}

interface ISchool {
  schoolid: number;
  userid: number;
  name: string;
  ispost: boolean;
  linkpost: string;
}

interface ITypeGroupInput {
  type: ?number;
  pointsChange: any;
  firstSubmitted?: boolean;
  subjects?: any; // Array<ISubject>;
  priorityPointChange?: any;
}

interface ISubject {
  subjectid?: number;
  subjectname?: string;
}

interface IInputSearch extends IStyle {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  maxLength?: number | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onkeypress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onkeyup?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeydown?: React.KeyboardEventHandler<HTMLInputElement>;
  // type?: 'text' | 'password' | 'number';
  type?: 'text' | 'password' | 'number' | 'tel';
  background?: Property.Background<string | number> | undefined;
  borderRadius?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  className?: string | undefined;
  error?: any;
  isSalary?: boolean;
  zIndex?: number;
  pattern?: string;
  isCreateNewCV?: boolean;

  min?: string | number;
  onInput?: any;
  inputmode?: any;
  readOnly?: boolean;
  disabled?: boolean;
  caution?: string;
  showErrorModal?: boolean;
  onFocus?: any;
  paddingRight?: any;
  paddingLeft?: any;
}

interface IModalLoader {
  isOpen?: boolean;
  classNameLoader?: string;
}

interface ICalendar {
  onSelect?: (time: Date) => void;
  value?: Date;
  isShow: any;
  getTime?: any;
  isBeforeNow?: boolean;
  constraintDateBefore?: Date;
  constraintDateAfter?: Date;
  titleStart?: any;
  validateTime?: any;
}

interface IOTPInput {
  code: Array<string>;
  setCode: any;
}

interface IOTPInputv2 {
  length: number; // Number of inputs
  onChangeOTP: (otp: string | any) => any; // Handle onOTPChange to use its value
  autoFocus?: boolean; // Auto focus to input programmatically
  isNumberInput?: boolean; // If otp is number
  disabled?: boolean;
  style?: CSSProperties; // Style for container OTP
  className?: string; // Class for container OTP
  inputStyle?: CSSProperties; // Style for input
  inputClassName?: string; // Class for input
  otpValue?: any;
}

interface ISingleOTPInput extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

interface ILoaderModal {
  isShow?: boolean;
}

interface IModalMessage {
  isOpen?: boolean | string;
  handleClose?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent, HTMLButtonElement>) => void) | undefined;
  messages?: string;
  isSuccessed?: boolean;
  handleSuccess?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent, HTMLButtonElement>) => void) | undefined;
  isSucessedSecond?: boolean;
  className?: string;
  verBtn?: string;
  classNameModalWapper?: string;
  isHideCloseBtn?: boolean;
  directSubmitTheme?: boolean;
}

//ButtonVerJob
interface IButtonVerJob {
  children?: string;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

//OldButton
interface IOldButton {
  children?: string;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

interface IInputPrimary {
  placeholder?: string;
  value?: number | string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  type?: 'text' | 'password' | 'number';
  error?: any;
  className?: string;
  name?: string;
  id?: string;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  handleClickIcon?: (() => void) | undefined;
  isShowEge?: boolean;
  subIcon?: any;
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  classNameInput?: string;
  classNameIcon?: string;
  disabled?: boolean;
  autoComplete?: string;
  isLockSpace?: boolean;
}

interface IModalRegisterSupport {
  schoolId: number;
  schoolName?: string;
  ologyId?: number;
  isOpen?: boolean;
  setIsOpen?: any;
  info?: any;
  onClickHeader?: ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  onNotify?: any;
  setIsShow?: any;
}

interface IModalAspiration {
  isOpen?: boolean;
  setIsOpen?: any;
  onClose?: ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

interface ISpecialSchoolCard {
  isOverFlowHeight?: boolean;
  width?: string;
  height?: string;
  isHideContent?: boolean;
  isHideSchoolName?: boolean;
  schoolName?: string;
  schoolImage?: string;
  onClick?: ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  heightImg?: string;
  content?: string;
  schoolId?: number;
}

interface IVideoPlayer {
  width?: number | string;
  urls?: Array<string>;
  className?: string;
  borderRadius?: number;
  thumbnail?: any;
  classNameThumbnail?: string;
  id?: number;
  videoIds?: Array<number>;
}

interface IProgressBarVideo {
  id?: number;
}

interface INewsItem {
  id: number;
  banner: string;
  shorttitle: string;
  title: string;
  onClick?: (e: React.MouseEvent, id: number) => void | undefined;
}

interface IModalFilter {
  children?: any;
  isShow?: boolean;
  setIsShow?: any;
  listSchool?: any;
  setListSchool?: any;
}

interface ITableSchool {
  listSchool: IHighSchool[];
  ologyName: string;
  searchid: Number;
  isGetInfo?: boolean;
  preventSellect?: boolean;
  setIsPuclicSchool?: any;
  isLoadingListSchool?: boolean;
}

interface ITableSchool2 {
  listSchool: any[];
  ologyName: string;
  searchid: Number;
  isGetInfo?: boolean;
  preventSellect?: boolean;
}

interface ISvg {
  width?: number;
  height?: number;
  color?: string;
}

interface IHighSchoolAddress {
  highschoolid: number;
  street: string;
  wardid: number;
  wardtext: string;
  districtid: number;
  districttext: string;
  provinceid: number;
  provincetext: string;
  distance: string;
  highschooladdressid?: any;
}

interface IHighSchoolSeasons {
  highschoolid: number;
  highschoolseasonid: number;
  year: number;
  yeartext: string;
  target: number;
  fee: string;
  referencepoint: [
    {
      highschoolseasonid: number;
      wishtimesid: string;
      wishtimestext: string;
      point: number;
    },
  ];
}

interface IHighSchool {
  highschoolid: number;
  highschoolname: string;
  titletag: string;
  highlightpoint: string;
  ratepercent: number;
  highschooladdresses: IHighSchoolAddress[];
  highschoolseasons: IHighSchoolSeasons[];
  addressdistance: string;
  yearscore: string;
  searchadmissionid: string;
  ischoose: 1;
}

interface INonPublicHighSchool {
  highschoolid: number;
  highschoolname: string;
  totalscore: number;
  ratepercent: number;
  addressdistance: sring;
  kindschoolid: number;
  typeschoolid: number;
  admissioncondition: string;
  fee: string;
  highschooladdresses: IHighSchoolAddress[];
}
interface ISearchResult {
  result: number;
  message: string;
  content: {
    publichighschools: IHighSchool[];
    nonpublichighschools: INonPublicHighSchool[];
  };
}

interface IBANNERADS {
  id?: any;
  listBanner: any;
  height?: any;
  setOpenModal?: any;
  isOpenWheel?: boolean;
  isShowDot?: boolean;
  className?: any;
  slidesToShow?: number;
  slidesToScroll?: number;
  isMultipleItem?: boolean;
  itemPerSlices?: number;
}

interface HeaderTiTleMobile {
  title?: string;
  isShowNoti?: boolean;
  numberUnread?: number;
  onClick?: any;
}

interface IntroCard {
  title: string;
  buttonContent: string;
  img: string;
  onClick?: any;
}

interface TutorItem {
  id: number | string;
  img: string;
  subjects: string;
  grades: string;
  addresses: string;
  numberStar: number;
  name: string;
  isHorizontal?: boolean;
  onClick?: any;
  className?: string;
  layer?: string;
  titleButton?: string;
  isFromNewPostPage?: boolean;
  ischosen?: boolean;
  clickWhenChosen?: any;
  clickWhenNotChosen?: any;
  textBtnWhenChosen?: string;
  textBtnWhenNotChosen?: string;
  onClickTotal?: any;
  textBtnWhenNotChosen?: string;
  onClickTotal?: any;
  isHiddenBtn?: boolean;
  isFromListTutor?: boolean;
}
type ListTutorItem = List<TutorItem>;

interface ListStar {
  number: number;
  score?: number;
  isSmallStar?: boolean;
  onClick?: any;
}

// interface ListStar {
//   number: number;
//   score?: number;
// }
interface IHeaderSearchMobile {
  placeholder?: string;
  value?: string;
  onChange?: (prop) => void;
  isShowSearchOpt?: boolean;
  onClick?: () => void;
}

interface ISchedule {
  day?: number;
  session?: string;
  label?: string;
}

type ListWeekday = List<{ weekdayid: number; weekdayname?: string; sessiondays: ListSession }>;
type ListSession = List<{ sessiondayid: number; sessionday: string }>;

interface ICardPost {
  id: number;
  title: string;
  schedule: ListWeekday;
  timepost: string;
  name: string;
  classes: string;
  location: string;
  startdate?: string;
  nextfeedate?: string;
  gender?: string | number;
  isOpen?: boolean;
  onClick?: any;
  onClickTotal?: any;
  buttonText?: any;
  isConfirmTeaching?: boolean;
  //isOpenPost?:number; // open or close toggle
  isOpenPost?: boolean; // open or close toggle
  handleEditPost?: any; // open edit post
  handleOpenCloseToggle?: any; // handle toggle
  isChosen?: boolean
}

interface SubjectItem {
  SubjectId: number;
  SubjectName: string;
  NumTutor: number;
  onClick: any;
}
type ListSubject = List<SubjectItem>;

interface ListGenaral {
  title: string;
  children: ReactNode | ReactNode[];
  isShow?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface DropdownTick {
  placeholder?: string;
  listOption: List<{ key: number; value: string }>;
  isMultipleOption?: boolean;
  setListChosenOption: any;
  className?: string;
  listChosenOption: List<{ key: number; value: string }>;
  error?: string;
}

type ListOption = List<{ key: number; value: string }>;

type ListOptionApi = { id: number; title: string; searchtext: string }[];

interface ButtonStudent {
  onClick?: any;
  content: string;
  paddingLeft?: string;
  paddingTop?: string;
  borderRadius?: string;
}

interface IRadioButton {
  id: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  checked: boolean;
  label: string;
}

interface ITutor {
  // tutorid: number;
  // userid?: number;
  // fullname?: string;
  // birthdate?: string;
  // phone?: string;
  // totalrating?: number;
  // avatar?: string;
  // thumbnailavatar: string;
  // postid?: number;
  // isopen?: number;
  // statusprocessid?: number;
  // statusprocessname?: null;
  // ischoose?: boolean;
  // posttutorid?: number;
  // isregister?: number;
  // academiclevelid?: number;
  // academiclevelname?: string;
  // experience?: string;
  // tutorSubjectLists?: {
  //   tutorid: number;
  //   subjectid: number;
  //   subjectname: string;
  // }[];
  // tutorClassLists?: {
  //   tutorid: number;
  //   classid: number;
  //   classname: string;
  // }[];
  // tutorAreaLists?: {
  //   tutorid: number;
  //   areaid: number;
  //   areaname: string;
  // }[];
  // tutorSubjects: {
  //   tutorid: number;
  //   subjectid: number;
  //   subjectname: string;
  // }[];
  // tutorClasses: {
  //   tutorid: number;
  //   classid: number;
  //   classname: string;
  // }[];
  // tutorAreas: {
  //   tutorid: number;
  //   areaid: number;
  //   areaname: string;
  // }[];
  // tutorTeachingForms: {
  //   tutorid: number;
  //   teachingformid: number;
  //   teachingformname: string;
  // }[];
  // tutorDegrees: {
  //   id: number;
  //   tutorid: number;
  //   namemedia: string;
  //   thumbnailmedia: string;
  //   typediplomaid: number;
  //   typediplomaname: string;
  // }[];
  // subjectsearchtext?: null;
  // classsearchtext?: null;
  // numsubject?: number;

  TutorId: number;
  TutorUserId: number;
  NameProfile: null;
  FullName: string;
  BirthDate: string;
  Phone: string;
  TotalRating: number;
  Avatar: string;
  ThumbnailAvatar: string;
  PostId: number;
  IsOpen: number;
  StatusProcessId: number;
  StatusProcessName: null;
  IsChoose: boolean;
  PostTutorId: number;
  IsRegister: number;
  AcademicLevelId: number;
  AcademicLevelName: string;
  Experience: string;
  TutorSubjectLists: {
    TutorId: number;
    SubjectId: number;
    SubjectName: string;
  }[];
  TutorClassLists: {
    TutorId: number;
    ClassId: number;
    ClassName: string;
  }[];
  TutorAreaLists: {
    TutorId: number;
    AreaId: number;
    AreaName: string;
  }[];
  TutorSubjects: {
    TutorId: number;
    SubjectId: number;
    SubjectName: string;
  }[];
  TutorClasses: {
    TutorId: number;
    ClassId: number;
    ClassName: string;
  }[];
  TutorAreas: {
    TutorId: number;
    AreaId: number;
    AreaName: string;
  }[];
  TutorTeachingForms: {
    TutorId: number;
    TeachingFormId: number;
    TeachingFormName: string;
  }[];
  TutorDegrees: {
    Id: number;
    TutorId: number;
    NameMedia: string;
    ThumbnailMedia: string;
    TypeDiplomaId: number;
    TypeDiplomaName: string;
  }[];
  SubjectSearchText: null;
  ClassSearchText: null;
  NumSubject: number;
  NumClass: number;
}
interface ListTutor {
  listTutor: ITutor[];
  isHorizontal?: boolean;
  name?: string;
  onClick?: any;
}

interface IPost {
  id: number;
  userid?: number;
  fullname: string;
  subjectid?: number;
  subjecttext: string;
  classid?: number;
  classtext?: string;
  postdate: string;
  isopen?: number;
  ischoosefinal?: number;
  postTeachingForms: {
    id: number;
    title: string;
    postid: number;
  }[];
  postareas: {
    id: number;
    title: string;
    postid: number;
  }[];
  postsessionweeks?: {
    weekdayid: number;
    weekdaytext: string;
    sessiondayid: number;
    sessiondaytext: any;
    postid: number;
    sessiondays: {
      sessiondayid: number;
      sessiondaytext: string;
    }[];
  }[];

  subjectsearchtext?: string;
  classsearchtext?: string;
  numsubject?: number;
  numclassid?: number;
}

interface IFileImage {
  id?: number;
  image: string | File;
}

interface ITutorProfileDetail {
  tutorid: number;
  fullname: string;
  birthdate: string;
  phone: string;
  academiclevel: IDataFill[];
  experience: string;
  totalrating: number;
  gender: IDataFill[];
  avatar: string | File;
  certificated: number | undefined;
  subjects: IDataFill[];
  classes: IDataFill[];
  teachingForms: IDataFill[];
  areas: IDataFill[];
  degreefiles: string[] | File[];
  studentcardfiles: string[] | File[];
  identitybeforefile: string | File;
  identityafterfile: string | File;
  // for update tutor profile
  degreefilesDefault?: any[];
  degreeremoveids?: any[];
  studentcardfilesDefault?: any[];
  studentcardremoveids?: any[];
  identitiesDefault?: any[];
  removefileids?: any[];
}

interface INotiItem {
  NotificationId?: number;
  Content?: string;
  UserId?: number;
  PostTutorId?: number;
  PostId?: number;
  TutorId?: number;
  SubjectName?: string;
  NumSession?: number;
  IsFlexibleTime?: number;
  TypeNotificationId?: number;
  TimeNotification?: string;
  IsSeen?: number;
  NumProfile?: number;
  PostTeachingForms?: {
    Id: number;
    Title: string;
    PostId: number;
  }[];
}

interface IPostTeachingFroms {
  Id?: number;
  Title?: string;
  PostId?: number;
}
interface IPostAreas {
  Id?: number;
  Title?: string;
  PostId?: number;
}
interface ISessionDays {
  SessionDayId?: number;
  SessionDayText?: string;
}
interface IPostSessiOnWeeks {
  PostId?: number;
  SessionDayId?: number;
  SessionDays?: ISessionDays[];
  sessiondaytext?: string;
  WeekdayId?: number;
  WeekdayText?: string;
}
interface IPostNew {
  ClassId?: number;
  ClassSearchText?: string;
  ClassText?: string;
  FullName?: string;
  Id?: number;
  IsChooseFinal?: number;
  IsOpen?: number;
  NamePost?: any;
  NextFeeDate?: any;
  NumClassId?: number;
  NumSubject?: number;
  PostAreas?: IPostAreas[];
  PostDate?: string;
  PostSessionWeeks?: IPostSessiOnWeeks[];
  PostTeachingForms?: IPostTeachingFroms[];
  StartDate?: string;
  SubjectId?: number;
  SubjectSearchText?: string;
  SubjectText?: string;
  UserId?: number;
}
