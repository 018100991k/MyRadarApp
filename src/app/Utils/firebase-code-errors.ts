export enum AuthErrorCodeEnum {
  EmailAlreadyInUse = 'auth/email-already-in-use',
  InvalidEmail = 'auth/invalid-email',
  OperationNotAllowed = 'auth/operation-not-allowed',
  WeakPassword = 'auth/weak-password',
  UserDisabled = 'auth/user-disabled',
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
  PopupClosedByUser = 'auth/popup-closed-by-user',
  ProviderAlreadyLinked = 'auth/provider-already-linked',
  RequiresRecentLogin = 'auth/requires-recent-login',
  CredentialAlreadyInUse = 'auth/credential-already-in-use',
  MissingEmail = 'auth/missing-email',
  MissingPassword = 'auth/missing-password',
}
