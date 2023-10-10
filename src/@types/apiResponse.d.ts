interface UserInfo {
  Id: number;
  FullName: string;
  Phone: string;
  GenderId: number;
  GenderText: string;
  RoleId: number;
  RoleText: string;
  SearchText: string;
  ThumbnailAvatar: string;
  Avatar: string;
}

interface IDataFill {
  key: number;
  value: string;
}
export interface IItem {
  Id?: number;
  Title?: string;
  PostId?: number;
}

export interface IWeekDay {
  WeekdayId?: number;
  WeekdayText?: string;
  SessionDayId?: number;
  SessionDayText?: null;
  PostId?: number;
  SessionDays?: ISessionDay[];
}

export interface ISessionDay {
  SessionDayId?: number;
  SessionDayText?: string;
}
export interface IInfoPost {
  Id: number;
  UserId: number;
  FullName: string;
  Phone: string;
  GenderId: number;
  GenderText: string;
  Avatar: string;
  ThumbnailAvatar: string;
  SubjectId: number;
  SubjectText: string;
  ClassId: number;
  ClassText: string;
  IsFlexibleTime: number;
  Address: string;
  Contact: string;
  Description: string;
  IsOpen: number;
  PostDate: string;
  PostGenders: IItem[];
  PostTeachingForms: IItem[];
  PostAreas: IItem[];
  PostSessionWeeks: IWeekDay[];
  IsChooseFinal?: boolean
}

export interface IInfoPostDetail extends IInfoPost {
  SubjectSearchText?: string;
  ClassSearchText?: string;
  NumSubject?: number;
  NumClassId?: number;
}

interface ITutorProfileDetail {
  TutorId: number;
  FullName: string;
  BirthDate: string;
  Phone: string;
  AcademicLevelId: number;
  AcademicLevelName: string;
  IsCertification: number;
  Experience: string;
  TotalRating: number;
  Gender: string;
  Avatar: string;
  ThumbnailAvatar: string;
  PostTutorId: number;
  IsRegister: number;
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
  TutorDegrees: any[];
  TutorIdentitys: any[];
  TutorStudentCards: any[];
}


