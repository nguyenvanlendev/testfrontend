interface ICurrentUserSlice {
  currentUser: IResUser | null;
  isLoading: boolean;
  error: any;
}

interface IcurrentUserInitialState {
  dataUser: IResUser;
  isLoading: boolean;
  error: any;
  historyPoint: Array<any>;
  currentUser: any;
}
