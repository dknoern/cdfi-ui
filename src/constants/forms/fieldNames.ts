enum UserFieldNames {
  NAME = 'name',
  SURNAME = 'surname',
  EMAIL = 'email',
  PHONE = 'phone',
}

enum MiscFieldNames {
  ACCOUNT_ID = 'accountId',
  CATEGORY_NAME = 'category',
  DESCRIPTION = 'description',
}

export const fieldNames = {
  user: UserFieldNames,
  misc: MiscFieldNames,
};
