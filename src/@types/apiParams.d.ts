interface IPagination {
  currentpage?: number;
  limit?: number;
  currentdate?: string;
}

interface IParamsgetListSchoolSelection {
  currentpage?: number;
  currentdate?: string;
  limit?: number;
  findstring?: string;
  districtid: number | null;
  levelid?: number;
}

interface IParamsRegisterForExam {
  email: string;
  firstname: string;
  lastname: string;
  gender: number;
  password: string;
  birthday: any;
  grade: string;
  schoolexamid: number;
  levelid: number;
}

interface IParamsLogin {
  phone?: string;
  password?: string;
}

interface IPramGetResultExam {
  districtid?: number;
  schoolid?: number;
  boardid?: number;
  orderby?: Number;
}
interface IGetListSchoolExam {
  currentpage?: number;
  limit?: number;
  districtid?: number;
  schoolid?: number;
  boardid?: number;
  orderby?: Number;
}
interface IGetResultDistrict {
  currentpage: number;
  limit: number;
}
interface IGetResultTopExam {
  currentpage: number;
  currentdata?: any;
  limit: number;
  schoolid?: number;
  orderby?: number;
}
interface IGetResultExamDetail {
  email?: string;
  userid?: string | number;
}

interface IParamsGetUserCareerSelection {
  findtext?: string;
  resultdiscid?: number;
}

interface IParamsGetUserOlogySelection {
  careerids?: Array<number>;
  findtext?: string;
}

interface IParamsGetUserSchoolSelection {
  ologyids?: Array<number>;
  findtext?: string;
}

interface IParamsCreateStudentFutureInfo {
  resultdiscid: number;
  careerid: number;
  ologyid: number;
  schoolid: number;
  expectedfutureids: Array<number>;
}

interface IQuestionAnswer {
  questionid: number;
  score: number;
}

interface IParamsGetListQuestionCharacter extends IPagination {}

interface IParamsUserAnswerQuestion {
  questionid: number;
  questiondetailid: number;
  isright: number;
}

interface IParamsUserAnswerQuestionDISC {
  questionid?: number;
  questiondetailleastid?: number;
  questiondetailmostid?: number;
  mostpoint?: number;
  leastpoint?: number;
}

interface IParamsSubmitExam extends IParamsCreateStudentFutureInfo {
  answerQuestionExamCreateModels: Array<IParamsUserAnswerQuestion>;
  answerQuestionDISCModels: Array<IParamsUserAnswerQuestionDISC>;
}

interface IParamCreateNewsfeed {
  content?: string;
  postfor?: string;
  kindexam: number;
  studentexamname: string;
  scoredisc: number;
  scoreexam: number;
  examtime: string;
}

interface IFindTextRequest {
  findtext?: string;
  provinceid?: number;
}

interface IFindOlogiesRequest {
  currentpage?: number;
  currentdate?: string;
  limit?: number;
  findtext?: string;
}

interface IOlogySearch {
  findtext?: string;
  schoolid?: number;
}

interface IElectronicFormUserProfile {
  schoolId?: number;
  ologyId?: number;
}
interface IRequestCreateProfileCollegeForm {
  schoolid?: Number;
  userProfile?: {
    userid?: Number;
    fullname?: string;
    gender?: Number;
    birth?: Date | string;
    phone?: string;
    data?: {
      trainingLevelId?: Number;
      city?: Number;
      race?: string;
      identity?: string;
      identityDate?: Date | string;
      identityLocation?: Number;
      household?: string;
      religion?: string;
      receiveLocation?: string;
      receiveEmail?: string;
      parentPhone?: string;
      schoolReportList?: Array<ICertificateUpload>;
      highSchoolDiplomaList?: Array<ICertificateUpload>;
      collegeForm?: {
        householdNum?: string;
        healtInsurance?: string;
        schoolName?: string;
        trainingLevelSubmit?: Number;
        graduated?: Number;
        graduatedText?: string;
        firstOlogy?: Number;
        secondOlogy?: Number;
        schoolId?: Number;
      };
    };
  };
}

interface ISchoolProfile {
  schoolid?: number;
}

interface IGetListSubjectParams {
  ologyid?: number;
  typeform?: number;
}

// interface IGetAdmissionChanceSchoolsParams {
//   ologyid?: number;
//   typeform?: number;
//   semesters?: Array<ISemesterPoint>;
//   ratecapacity?: number;
//   prioritypoint?: number;
//   fullname: string;
//   phone: string;
//   email: string;
//   gcode: string;
//   refferalcode?: string;
// }

interface IGetAdmissionChanceForm {
  ologyid?: number;
}

interface IGetSchoolPolicy {
  schoolids?: string;
}

interface ISemesterPoint {
  code?: string;
  subjectid?: number;
  point?: string;
}

interface IReqCreateContactInfo {
  fullname?: string;
  email?: string;
  phone?: string;
}

interface IParamsSendOTPUpdateUserIdentifyingInfo {
  password: string;
  phone: string;
  type: 'UPDATE_PHONE' | 'UPDATE_EMAIL';
  isfromhsdt: number;
}

interface IParamsUpdateUserIdentifyingInfo extends IParamsSendOTPUpdateUserIdentifyingInfo {
  otp: string;
}

interface IAppBanner {
  id: number;
  name: string;
  link: string;
  linkclick: string;
  numorder: number;
  type: string;
  typepopup?: number;
}

interface ICheckOTP {
  otp: string;
  email?: string;
  phone?: string;
  // type: 'EMAIL' | 'PHONE';
  action: 'REGISTER' | 'FORGETPASS';
}

interface ISendOTP {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: 'EMAIL' | 'PHONE';
  action: 'REGISTER' | 'FORGETPASS';
}

interface IParamRenewPassword {
  email: string;
  otp: string;
  phone: string;
  newpassword: string;
  confirmnewpassword: string;
  username: string;
}

interface ILoginDataApi {
  phone: string | number;
  password: string;
}

interface ISupportDataApi {
  fullname: string;
  phone: string;
  email: string;
  content: string;
  schoolid: number;
}

interface IHotNewsApi {
  schoolid: number;
  typenewsid: number;
}
interface IStoreRecommendation {}

interface IGetRecommendations {}

interface ISvg {
  width?: number;
  height?: number;
  color?: string;
}

interface IChangePasswordApi {
  oldpassword: string;
  newpassword: string;
}

//=======================CAS10=====================//

interface IParamsNormalApi {
  currentpage?: number;
  limit?: number;
  findtext?: string;
}

interface IParamsGetListSubject extends IParamsNormalApi {
  typeadmission: number;
}

interface IParamsGetListSecondarySchool extends IParamsNormalApi {
  currentpage: number;
  limit: number;
  findtext: string;
}

interface IParamsGetListSecondarySchool extends IParamsNormalApi {}

interface IParamsGetListDistrict extends IParamsNormalApi {
  provinceid: number;
}

interface IParamsGetListWard extends IParamsNormalApi {
  districtid: number;
}

interface IParamsCreateSearchAdmission {
  typeadmissionid: number;
  scoremath: number;
  scoreliterature: number;
  scorelanguage: number;
  priorityobjectid: number;
  subjectid: number;
  scoresubject: number;
  street: string;
  wardid: number;
  districtid: number;
  provinceid: number;
  secondaryschoolid: number;
  fullname: string;
  phone: string;
  email: string;
  phoneparent: string;
  isAboard: boolean;
}

interface IParamsGetFillSearch {
  email?: string;
  phone?: string;
}

interface IParamsCreateConsultion {
  highschoolid: number;
  fullname: string;
  email: string;
  phone: string;
  content: string;
}

interface IParamsGetGoogleMap {
  street: string;
  ward: string;
  district: string;
  province: string;
}

interface IParamsGetGoogleMap {
  street: string;
  ward: string;
  district: string;
  province: string;
}

interface IParamsSendOTP {
  phone: string;
  type: 'PHONE' | '';
  action: 'VERIFIERADMISSIONHS' | '';
}

interface IParamsRegisterAfterOTPAndLoginAHS {
  otp: string;
  fullname: string;
  email: string;
  phone: string;
  action: 'VERIFIERADMISSIONHS' | '';
}

interface IParamsCreateHistorySearchAdmission {
  searchadmissionid: number;
  publichighschools: any[];
  totalscore: number;
  searchsubjectid: any;
}

interface IParamsCheckUserWithPhone {
  phone: string;
}

interface IParamsDetailConsultant {
  currentpage?: number;
  limit?: number;
  userconsultantid: number;
  fromdate: string;
  todate: string;
}

interface DataSendOTP {
  phone: string;
  type: string;
  action: string;
}

interface DataCheckOTP {
  Phone: string;
  Otp: string;
}

interface DataRegister {
  fullname: string;
  phone: string;
  genderid: number;
  avatar: any;
  password: string;
}

interface IParamCreateGetListTutor {
  CurrentPage?: number,
  Limit?: number,
  Status?: string,
  FindString?: string,
  GenderId?: number,
  AcademicLevelId?: number,
  PostId?: number,
  SubjectIds?: any[],
  ClassIds?: number[],
  TeachingFormIds?: number[],
  AreaIds?: number[]
}
interface IParamGetMyListPost {
  CurrentPage?: number;
  Limit?: number;
  TutorId?: number;
  Action?: string;
  SubjectIds?: number[];
  ClassIds?: number[];
  AreaIds?: number[];
}

interface IParamCreatePost {
  SubjectId?: number;
  ClassId?: number;
  IsFlexibleTime?: number;
  Address?: string;
  Contact?: string;
  Description?: string;
  Teachingformids?: number[];
  GenderIds?: number[];
  AreaIds?: number[];
  PostSessionWeeks?: {
    WeekdayId: number;
    SessionDays: {
      SessionDayId: number;
    }[];
  }[];
}

interface IParamUpdatePost extends IParamCreatePost {
  Id: string;
}

interface IParamCreateReviewTutor {
  PostTutorId: number | string;
  Rating: number;
  Content?: string;
  TypeReviewId: number;
  StatusProcessId: number;
}

interface IParamGetListPost {
  CurrentPage?: number;
  Limit?: number;
  SubjectIds?: number[];
  ClassIds?: number[];
  TeachingFormIds?: number[];
  AreaIds?: number[];
  SearchText?: string;
}

interface IParamsCreateTutor {
  fullname: string;
  birthdate: string;
  phone: string;
  academiclevelid: number;
  experience: string;
  genderid: number;
  avatar: File;
  iscertificated: number;
  subjectids: number[];
  classids: number[];
  teachingformids: number[];
  areaids: number[];
  degreefiles: File[];
  studentcardfiles: File[];
  identitybeforefile: File;
  identityafterfile: File;
}