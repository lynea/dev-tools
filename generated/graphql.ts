import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Dimension: any;
  HexColor: any;
  JSON: any;
  Quality: any;
};

export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  onboardStepCollection?: Maybe<OnboardStepCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsOnboardStepCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

export type Chapter = Entry & {
  __typename?: 'Chapter';
  contentfulMetadata: ContentfulMetadata;
  global?: Maybe<Scalars['Boolean']>;
  linkedFrom?: Maybe<ChapterLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
  team?: Maybe<ChapterTeam>;
};


export type ChapterGlobalArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type ChapterLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ChapterNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type ChapterTeamArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};

export type ChapterCollection = {
  __typename?: 'ChapterCollection';
  items: Array<Maybe<Chapter>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ChapterFilter = {
  AND?: InputMaybe<Array<InputMaybe<ChapterFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ChapterFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  global?: InputMaybe<Scalars['Boolean']>;
  global_exists?: InputMaybe<Scalars['Boolean']>;
  global_not?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  team_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ChapterLinkingCollections = {
  __typename?: 'ChapterLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  onboardStepCollection?: Maybe<OnboardStepCollection>;
};


export type ChapterLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ChapterLinkingCollectionsOnboardStepCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ChapterLinkingCollectionsOnboardStepCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ChapterLinkingCollectionsOnboardStepCollectionOrder {
  StepAsc = 'step_ASC',
  StepDesc = 'step_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ChapterOrder {
  GlobalAsc = 'global_ASC',
  GlobalDesc = 'global_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ChapterTeam = Company | Department | Team;

export type Company = Entry & {
  __typename?: 'Company';
  alias?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<CompanyLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
};


export type CompanyAliasArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type CompanyDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type CompanyIdArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type CompanyLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CompanyNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type CompanyCollection = {
  __typename?: 'CompanyCollection';
  items: Array<Maybe<Company>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type CompanyFilter = {
  AND?: InputMaybe<Array<InputMaybe<CompanyFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CompanyFilter>>>;
  alias?: InputMaybe<Scalars['String']>;
  alias_contains?: InputMaybe<Scalars['String']>;
  alias_exists?: InputMaybe<Scalars['Boolean']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  alias_not?: InputMaybe<Scalars['String']>;
  alias_not_contains?: InputMaybe<Scalars['String']>;
  alias_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['Int']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_gt?: InputMaybe<Scalars['Int']>;
  id_gte?: InputMaybe<Scalars['Int']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  id_lt?: InputMaybe<Scalars['Int']>;
  id_lte?: InputMaybe<Scalars['Int']>;
  id_not?: InputMaybe<Scalars['Int']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CompanyLinkingCollections = {
  __typename?: 'CompanyLinkingCollections';
  chapterCollection?: Maybe<ChapterCollection>;
  departmentCollection?: Maybe<DepartmentCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type CompanyLinkingCollectionsChapterCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CompanyLinkingCollectionsChapterCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type CompanyLinkingCollectionsDepartmentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CompanyLinkingCollectionsDepartmentCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type CompanyLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum CompanyLinkingCollectionsChapterCollectionOrder {
  GlobalAsc = 'global_ASC',
  GlobalDesc = 'global_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum CompanyLinkingCollectionsDepartmentCollectionOrder {
  AliasAsc = 'alias_ASC',
  AliasDesc = 'alias_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum CompanyOrder {
  AliasAsc = 'alias_ASC',
  AliasDesc = 'alias_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Department = Entry & {
  __typename?: 'Department';
  alias?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<DepartmentLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
};


export type DepartmentAliasArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type DepartmentCompanyArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CompanyFilter>;
};


export type DepartmentDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type DepartmentIdArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type DepartmentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type DepartmentNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type DepartmentCollection = {
  __typename?: 'DepartmentCollection';
  items: Array<Maybe<Department>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type DepartmentFilter = {
  AND?: InputMaybe<Array<InputMaybe<DepartmentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DepartmentFilter>>>;
  alias?: InputMaybe<Scalars['String']>;
  alias_contains?: InputMaybe<Scalars['String']>;
  alias_exists?: InputMaybe<Scalars['Boolean']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  alias_not?: InputMaybe<Scalars['String']>;
  alias_not_contains?: InputMaybe<Scalars['String']>;
  alias_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  company?: InputMaybe<CfCompanyNestedFilter>;
  company_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['Int']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_gt?: InputMaybe<Scalars['Int']>;
  id_gte?: InputMaybe<Scalars['Int']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  id_lt?: InputMaybe<Scalars['Int']>;
  id_lte?: InputMaybe<Scalars['Int']>;
  id_not?: InputMaybe<Scalars['Int']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type DepartmentLinkingCollections = {
  __typename?: 'DepartmentLinkingCollections';
  chapterCollection?: Maybe<ChapterCollection>;
  entryCollection?: Maybe<EntryCollection>;
  teamCollection?: Maybe<TeamCollection>;
};


export type DepartmentLinkingCollectionsChapterCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<DepartmentLinkingCollectionsChapterCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type DepartmentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type DepartmentLinkingCollectionsTeamCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<DepartmentLinkingCollectionsTeamCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum DepartmentLinkingCollectionsChapterCollectionOrder {
  GlobalAsc = 'global_ASC',
  GlobalDesc = 'global_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum DepartmentLinkingCollectionsTeamCollectionOrder {
  AliasAsc = 'alias_ASC',
  AliasDesc = 'alias_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum DepartmentOrder {
  AliasAsc = 'alias_ASC',
  AliasDesc = 'alias_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  Jpg = 'JPG',
  JpgProgressive = 'JPG_PROGRESSIVE',
  Png = 'PNG',
  Png8 = 'PNG8',
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  Bottom = 'BOTTOM',
  BottomLeft = 'BOTTOM_LEFT',
  BottomRight = 'BOTTOM_RIGHT',
  Center = 'CENTER',
  Face = 'FACE',
  Faces = 'FACES',
  Left = 'LEFT',
  Right = 'RIGHT',
  Top = 'TOP',
  TopLeft = 'TOP_LEFT',
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  Crop = 'CROP',
  Fill = 'FILL',
  Fit = 'FIT',
  Pad = 'PAD',
  Scale = 'SCALE',
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  cornerRadius?: InputMaybe<Scalars['Int']>;
  format?: InputMaybe<ImageFormat>;
  height?: InputMaybe<Scalars['Dimension']>;
  quality?: InputMaybe<Scalars['Quality']>;
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  width?: InputMaybe<Scalars['Dimension']>;
};

export type Menu = Entry & {
  __typename?: 'Menu';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<MenuLinkingCollections>;
  menuITems?: Maybe<Scalars['JSON']>;
  sys: Sys;
};


export type MenuLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MenuMenuITemsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type MenuCollection = {
  __typename?: 'MenuCollection';
  items: Array<Maybe<Menu>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type MenuFilter = {
  AND?: InputMaybe<Array<InputMaybe<MenuFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MenuFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  menuITems_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
};

export type MenuLinkingCollections = {
  __typename?: 'MenuLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type MenuLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum MenuOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type OnboardStep = Entry & {
  __typename?: 'OnboardStep';
  body?: Maybe<Scalars['String']>;
  chapter?: Maybe<Chapter>;
  codeBlock?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<OnboardStepLinkingCollections>;
  mainImage?: Maybe<Asset>;
  step?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


export type OnboardStepBodyArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type OnboardStepChapterArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ChapterFilter>;
};


export type OnboardStepCodeBlockArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type OnboardStepLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type OnboardStepMainImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type OnboardStepStepArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type OnboardStepTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type OnboardStepCollection = {
  __typename?: 'OnboardStepCollection';
  items: Array<Maybe<OnboardStep>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type OnboardStepFilter = {
  AND?: InputMaybe<Array<InputMaybe<OnboardStepFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OnboardStepFilter>>>;
  body?: InputMaybe<Scalars['String']>;
  body_contains?: InputMaybe<Scalars['String']>;
  body_exists?: InputMaybe<Scalars['Boolean']>;
  body_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  body_not?: InputMaybe<Scalars['String']>;
  body_not_contains?: InputMaybe<Scalars['String']>;
  body_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  chapter?: InputMaybe<CfChapterNestedFilter>;
  chapter_exists?: InputMaybe<Scalars['Boolean']>;
  codeBlock?: InputMaybe<Scalars['String']>;
  codeBlock_contains?: InputMaybe<Scalars['String']>;
  codeBlock_exists?: InputMaybe<Scalars['Boolean']>;
  codeBlock_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  codeBlock_not?: InputMaybe<Scalars['String']>;
  codeBlock_not_contains?: InputMaybe<Scalars['String']>;
  codeBlock_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  mainImage_exists?: InputMaybe<Scalars['Boolean']>;
  step?: InputMaybe<Scalars['Int']>;
  step_exists?: InputMaybe<Scalars['Boolean']>;
  step_gt?: InputMaybe<Scalars['Int']>;
  step_gte?: InputMaybe<Scalars['Int']>;
  step_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  step_lt?: InputMaybe<Scalars['Int']>;
  step_lte?: InputMaybe<Scalars['Int']>;
  step_not?: InputMaybe<Scalars['Int']>;
  step_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OnboardStepLinkingCollections = {
  __typename?: 'OnboardStepLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  todoCollection?: Maybe<TodoCollection>;
};


export type OnboardStepLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type OnboardStepLinkingCollectionsTodoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<OnboardStepLinkingCollectionsTodoCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum OnboardStepLinkingCollectionsTodoCollectionOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum OnboardStepOrder {
  StepAsc = 'step_ASC',
  StepDesc = 'step_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  chapter?: Maybe<Chapter>;
  chapterCollection?: Maybe<ChapterCollection>;
  company?: Maybe<Company>;
  companyCollection?: Maybe<CompanyCollection>;
  department?: Maybe<Department>;
  departmentCollection?: Maybe<DepartmentCollection>;
  entryCollection?: Maybe<EntryCollection>;
  menu?: Maybe<Menu>;
  menuCollection?: Maybe<MenuCollection>;
  onboardStep?: Maybe<OnboardStep>;
  onboardStepCollection?: Maybe<OnboardStepCollection>;
  team?: Maybe<Team>;
  teamCollection?: Maybe<TeamCollection>;
  todo?: Maybe<Todo>;
  todoCollection?: Maybe<TodoCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryChapterArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryChapterCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ChapterOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChapterFilter>;
};


export type QueryCompanyArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCompanyCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CompanyOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CompanyFilter>;
};


export type QueryDepartmentArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryDepartmentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<DepartmentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DepartmentFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryMenuArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryMenuCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<MenuOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MenuFilter>;
};


export type QueryOnboardStepArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryOnboardStepCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<OnboardStepOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OnboardStepFilter>;
};


export type QueryTeamArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTeamCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TeamOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamFilter>;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTodoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TodoOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoFilter>;
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type Team = Entry & {
  __typename?: 'Team';
  alias?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  department?: Maybe<Department>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<TeamLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
};


export type TeamAliasArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type TeamDepartmentArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<DepartmentFilter>;
};


export type TeamDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type TeamIdArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type TeamLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type TeamNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TeamCollection = {
  __typename?: 'TeamCollection';
  items: Array<Maybe<Team>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TeamFilter = {
  AND?: InputMaybe<Array<InputMaybe<TeamFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TeamFilter>>>;
  alias?: InputMaybe<Scalars['String']>;
  alias_contains?: InputMaybe<Scalars['String']>;
  alias_exists?: InputMaybe<Scalars['Boolean']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  alias_not?: InputMaybe<Scalars['String']>;
  alias_not_contains?: InputMaybe<Scalars['String']>;
  alias_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  department?: InputMaybe<CfDepartmentNestedFilter>;
  department_exists?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['Int']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_gt?: InputMaybe<Scalars['Int']>;
  id_gte?: InputMaybe<Scalars['Int']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  id_lt?: InputMaybe<Scalars['Int']>;
  id_lte?: InputMaybe<Scalars['Int']>;
  id_not?: InputMaybe<Scalars['Int']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type TeamLinkingCollections = {
  __typename?: 'TeamLinkingCollections';
  chapterCollection?: Maybe<ChapterCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type TeamLinkingCollectionsChapterCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TeamLinkingCollectionsChapterCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TeamLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TeamLinkingCollectionsChapterCollectionOrder {
  GlobalAsc = 'global_ASC',
  GlobalDesc = 'global_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum TeamOrder {
  AliasAsc = 'alias_ASC',
  AliasDesc = 'alias_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Todo = Entry & {
  __typename?: 'Todo';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<TodoLinkingCollections>;
  step?: Maybe<OnboardStep>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


export type TodoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type TodoIdArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type TodoLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type TodoStepArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<OnboardStepFilter>;
};


export type TodoTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TodoCollection = {
  __typename?: 'TodoCollection';
  items: Array<Maybe<Todo>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TodoFilter = {
  AND?: InputMaybe<Array<InputMaybe<TodoFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TodoFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['Int']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_gt?: InputMaybe<Scalars['Int']>;
  id_gte?: InputMaybe<Scalars['Int']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  id_lt?: InputMaybe<Scalars['Int']>;
  id_lte?: InputMaybe<Scalars['Int']>;
  id_not?: InputMaybe<Scalars['Int']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  step?: InputMaybe<CfOnboardStepNestedFilter>;
  step_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TodoLinkingCollections = {
  __typename?: 'TodoLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type TodoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TodoOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type CfChapterNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfChapterNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfChapterNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  global?: InputMaybe<Scalars['Boolean']>;
  global_exists?: InputMaybe<Scalars['Boolean']>;
  global_not?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  team_exists?: InputMaybe<Scalars['Boolean']>;
};

export type CfCompanyNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfCompanyNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfCompanyNestedFilter>>>;
  alias?: InputMaybe<Scalars['String']>;
  alias_contains?: InputMaybe<Scalars['String']>;
  alias_exists?: InputMaybe<Scalars['Boolean']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  alias_not?: InputMaybe<Scalars['String']>;
  alias_not_contains?: InputMaybe<Scalars['String']>;
  alias_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['Int']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_gt?: InputMaybe<Scalars['Int']>;
  id_gte?: InputMaybe<Scalars['Int']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  id_lt?: InputMaybe<Scalars['Int']>;
  id_lte?: InputMaybe<Scalars['Int']>;
  id_not?: InputMaybe<Scalars['Int']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfDepartmentNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfDepartmentNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfDepartmentNestedFilter>>>;
  alias?: InputMaybe<Scalars['String']>;
  alias_contains?: InputMaybe<Scalars['String']>;
  alias_exists?: InputMaybe<Scalars['Boolean']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  alias_not?: InputMaybe<Scalars['String']>;
  alias_not_contains?: InputMaybe<Scalars['String']>;
  alias_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  company_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['Int']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_gt?: InputMaybe<Scalars['Int']>;
  id_gte?: InputMaybe<Scalars['Int']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  id_lt?: InputMaybe<Scalars['Int']>;
  id_lte?: InputMaybe<Scalars['Int']>;
  id_not?: InputMaybe<Scalars['Int']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfOnboardStepNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfOnboardStepNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfOnboardStepNestedFilter>>>;
  body?: InputMaybe<Scalars['String']>;
  body_contains?: InputMaybe<Scalars['String']>;
  body_exists?: InputMaybe<Scalars['Boolean']>;
  body_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  body_not?: InputMaybe<Scalars['String']>;
  body_not_contains?: InputMaybe<Scalars['String']>;
  body_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  chapter_exists?: InputMaybe<Scalars['Boolean']>;
  codeBlock?: InputMaybe<Scalars['String']>;
  codeBlock_contains?: InputMaybe<Scalars['String']>;
  codeBlock_exists?: InputMaybe<Scalars['Boolean']>;
  codeBlock_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  codeBlock_not?: InputMaybe<Scalars['String']>;
  codeBlock_not_contains?: InputMaybe<Scalars['String']>;
  codeBlock_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  mainImage_exists?: InputMaybe<Scalars['Boolean']>;
  step?: InputMaybe<Scalars['Int']>;
  step_exists?: InputMaybe<Scalars['Boolean']>;
  step_gt?: InputMaybe<Scalars['Int']>;
  step_gte?: InputMaybe<Scalars['Int']>;
  step_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  step_lt?: InputMaybe<Scalars['Int']>;
  step_lte?: InputMaybe<Scalars['Int']>;
  step_not?: InputMaybe<Scalars['Int']>;
  step_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AllCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCompaniesQuery = { __typename?: 'Query', companyCollection?: { __typename?: 'CompanyCollection', items: Array<{ __typename?: 'Company', name?: string | null, alias?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'CompanyLinkingCollections', chapterCollection?: { __typename?: 'ChapterCollection', items: Array<{ __typename?: 'Chapter', sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', items: Array<{ __typename?: 'OnboardStep', step?: number | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null } | null> } | null };

export type CompaniesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CompaniesQuery = { __typename?: 'Query', company?: { __typename?: 'Company', name?: string | null, linkedFrom?: { __typename?: 'CompanyLinkingCollections', chapterCollection?: { __typename?: 'ChapterCollection', total: number, items: Array<{ __typename?: 'Chapter', name?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', total: number, items: Array<{ __typename?: 'OnboardStep', step?: number | null, title?: string | null, body?: string | null, codeBlock?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null } | null };

export type AllDepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDepartmentsQuery = { __typename?: 'Query', departmentCollection?: { __typename?: 'DepartmentCollection', items: Array<{ __typename?: 'Department', name?: string | null, alias?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'DepartmentLinkingCollections', chapterCollection?: { __typename?: 'ChapterCollection', items: Array<{ __typename?: 'Chapter', sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', items: Array<{ __typename?: 'OnboardStep', step?: number | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null } | null> } | null };

export type DepartmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DepartmentQuery = { __typename?: 'Query', department?: { __typename?: 'Department', name?: string | null, linkedFrom?: { __typename?: 'DepartmentLinkingCollections', chapterCollection?: { __typename?: 'ChapterCollection', total: number, items: Array<{ __typename?: 'Chapter', name?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', total: number, items: Array<{ __typename?: 'OnboardStep', step?: number | null, title?: string | null, body?: string | null, codeBlock?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null } | null };

export type AllGobalChaptersInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGobalChaptersInfoQuery = { __typename?: 'Query', chapterCollection?: { __typename?: 'ChapterCollection', total: number, items: Array<{ __typename?: 'Chapter', name?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', total: number, items: Array<{ __typename?: 'OnboardStep', title?: string | null, body?: string | null, codeBlock?: string | null, step?: number | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null };

export type AllTeamsInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsInfoQuery = { __typename?: 'Query', teamCollection?: { __typename?: 'TeamCollection', items: Array<{ __typename?: 'Team', name?: string | null, alias?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'TeamLinkingCollections', chapterCollection?: { __typename?: 'ChapterCollection', items: Array<{ __typename?: 'Chapter', sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', items: Array<{ __typename?: 'OnboardStep', step?: number | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null } | null> } | null };

export type TeamsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeamsQuery = { __typename?: 'Query', team?: { __typename?: 'Team', name?: string | null, linkedFrom?: { __typename?: 'TeamLinkingCollections', chapterCollection?: { __typename?: 'ChapterCollection', total: number, items: Array<{ __typename?: 'Chapter', name?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', total: number, items: Array<{ __typename?: 'OnboardStep', step?: number | null, title?: string | null, body?: string | null, codeBlock?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null } | null };

export type TodosForStepQueryVariables = Exact<{
  stepId: Scalars['String'];
}>;


export type TodosForStepQuery = { __typename?: 'Query', onboardStep?: { __typename?: 'OnboardStep', mainImage?: { __typename?: 'Asset', url?: string | null } | null, linkedFrom?: { __typename?: 'OnboardStepLinkingCollections', todoCollection?: { __typename?: 'TodoCollection', items: Array<{ __typename?: 'Todo', description?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null };


export const AllCompaniesDocument = gql`
    query allCompanies {
  companyCollection(limit: 3) {
    items {
      name
      alias
      sys {
        id
      }
      linkedFrom {
        chapterCollection(limit: 50) {
          items {
            sys {
              id
            }
            linkedFrom {
              onboardStepCollection(limit: 10) {
                items {
                  step
                  sys {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAllCompaniesQuery__
 *
 * To run a query within a React component, call `useAllCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<AllCompaniesQuery, AllCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCompaniesQuery, AllCompaniesQueryVariables>(AllCompaniesDocument, options);
      }
export function useAllCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCompaniesQuery, AllCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCompaniesQuery, AllCompaniesQueryVariables>(AllCompaniesDocument, options);
        }
export type AllCompaniesQueryHookResult = ReturnType<typeof useAllCompaniesQuery>;
export type AllCompaniesLazyQueryHookResult = ReturnType<typeof useAllCompaniesLazyQuery>;
export type AllCompaniesQueryResult = Apollo.QueryResult<AllCompaniesQuery, AllCompaniesQueryVariables>;
export const CompaniesDocument = gql`
    query Companies($id: String!) {
  company(id: $id) {
    name
    linkedFrom {
      chapterCollection {
        total
        items {
          sys {
            id
          }
          name
          linkedFrom {
            onboardStepCollection {
              total
              items {
                sys {
                  id
                }
                step
                title
                body
                codeBlock
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
      }
export function useCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
export const AllDepartmentsDocument = gql`
    query allDepartments {
  departmentCollection(limit: 3) {
    items {
      name
      alias
      sys {
        id
      }
      linkedFrom {
        chapterCollection(limit: 50) {
          items {
            sys {
              id
            }
            linkedFrom {
              onboardStepCollection(limit: 10) {
                items {
                  step
                  sys {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAllDepartmentsQuery__
 *
 * To run a query within a React component, call `useAllDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<AllDepartmentsQuery, AllDepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllDepartmentsQuery, AllDepartmentsQueryVariables>(AllDepartmentsDocument, options);
      }
export function useAllDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllDepartmentsQuery, AllDepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllDepartmentsQuery, AllDepartmentsQueryVariables>(AllDepartmentsDocument, options);
        }
export type AllDepartmentsQueryHookResult = ReturnType<typeof useAllDepartmentsQuery>;
export type AllDepartmentsLazyQueryHookResult = ReturnType<typeof useAllDepartmentsLazyQuery>;
export type AllDepartmentsQueryResult = Apollo.QueryResult<AllDepartmentsQuery, AllDepartmentsQueryVariables>;
export const DepartmentDocument = gql`
    query department($id: String!) {
  department(id: $id) {
    name
    linkedFrom {
      chapterCollection {
        total
        items {
          sys {
            id
          }
          name
          linkedFrom {
            onboardStepCollection {
              total
              items {
                sys {
                  id
                }
                step
                title
                body
                codeBlock
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useDepartmentQuery__
 *
 * To run a query within a React component, call `useDepartmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDepartmentQuery(baseOptions: Apollo.QueryHookOptions<DepartmentQuery, DepartmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DepartmentQuery, DepartmentQueryVariables>(DepartmentDocument, options);
      }
export function useDepartmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DepartmentQuery, DepartmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DepartmentQuery, DepartmentQueryVariables>(DepartmentDocument, options);
        }
export type DepartmentQueryHookResult = ReturnType<typeof useDepartmentQuery>;
export type DepartmentLazyQueryHookResult = ReturnType<typeof useDepartmentLazyQuery>;
export type DepartmentQueryResult = Apollo.QueryResult<DepartmentQuery, DepartmentQueryVariables>;
export const AllGobalChaptersInfoDocument = gql`
    query allGobalChaptersInfo {
  chapterCollection(where: {team_exists: false}) {
    total
    items {
      name
      sys {
        id
      }
      linkedFrom {
        onboardStepCollection {
          total
          items {
            title
            body
            codeBlock
            step
            sys {
              id
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAllGobalChaptersInfoQuery__
 *
 * To run a query within a React component, call `useAllGobalChaptersInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllGobalChaptersInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllGobalChaptersInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllGobalChaptersInfoQuery(baseOptions?: Apollo.QueryHookOptions<AllGobalChaptersInfoQuery, AllGobalChaptersInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllGobalChaptersInfoQuery, AllGobalChaptersInfoQueryVariables>(AllGobalChaptersInfoDocument, options);
      }
export function useAllGobalChaptersInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllGobalChaptersInfoQuery, AllGobalChaptersInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllGobalChaptersInfoQuery, AllGobalChaptersInfoQueryVariables>(AllGobalChaptersInfoDocument, options);
        }
export type AllGobalChaptersInfoQueryHookResult = ReturnType<typeof useAllGobalChaptersInfoQuery>;
export type AllGobalChaptersInfoLazyQueryHookResult = ReturnType<typeof useAllGobalChaptersInfoLazyQuery>;
export type AllGobalChaptersInfoQueryResult = Apollo.QueryResult<AllGobalChaptersInfoQuery, AllGobalChaptersInfoQueryVariables>;
export const AllTeamsInfoDocument = gql`
    query allTeamsInfo {
  teamCollection(limit: 3) {
    items {
      name
      alias
      sys {
        id
      }
      linkedFrom {
        chapterCollection(limit: 50) {
          items {
            sys {
              id
            }
            linkedFrom {
              onboardStepCollection(limit: 10) {
                items {
                  step
                  sys {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAllTeamsInfoQuery__
 *
 * To run a query within a React component, call `useAllTeamsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTeamsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTeamsInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTeamsInfoQuery(baseOptions?: Apollo.QueryHookOptions<AllTeamsInfoQuery, AllTeamsInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTeamsInfoQuery, AllTeamsInfoQueryVariables>(AllTeamsInfoDocument, options);
      }
export function useAllTeamsInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTeamsInfoQuery, AllTeamsInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTeamsInfoQuery, AllTeamsInfoQueryVariables>(AllTeamsInfoDocument, options);
        }
export type AllTeamsInfoQueryHookResult = ReturnType<typeof useAllTeamsInfoQuery>;
export type AllTeamsInfoLazyQueryHookResult = ReturnType<typeof useAllTeamsInfoLazyQuery>;
export type AllTeamsInfoQueryResult = Apollo.QueryResult<AllTeamsInfoQuery, AllTeamsInfoQueryVariables>;
export const TeamsDocument = gql`
    query Teams($id: String!) {
  team(id: $id) {
    name
    linkedFrom {
      chapterCollection {
        total
        items {
          sys {
            id
          }
          name
          linkedFrom {
            onboardStepCollection {
              total
              items {
                sys {
                  id
                }
                step
                title
                body
                codeBlock
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const TodosForStepDocument = gql`
    query todosForStep($stepId: String!) {
  onboardStep(id: $stepId) {
    mainImage {
      url
    }
    linkedFrom {
      todoCollection {
        items {
          sys {
            id
          }
          description
          title
        }
      }
    }
  }
}
    `;

/**
 * __useTodosForStepQuery__
 *
 * To run a query within a React component, call `useTodosForStepQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosForStepQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosForStepQuery({
 *   variables: {
 *      stepId: // value for 'stepId'
 *   },
 * });
 */
export function useTodosForStepQuery(baseOptions: Apollo.QueryHookOptions<TodosForStepQuery, TodosForStepQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodosForStepQuery, TodosForStepQueryVariables>(TodosForStepDocument, options);
      }
export function useTodosForStepLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosForStepQuery, TodosForStepQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodosForStepQuery, TodosForStepQueryVariables>(TodosForStepDocument, options);
        }
export type TodosForStepQueryHookResult = ReturnType<typeof useTodosForStepQuery>;
export type TodosForStepLazyQueryHookResult = ReturnType<typeof useTodosForStepLazyQuery>;
export type TodosForStepQueryResult = Apollo.QueryResult<TodosForStepQuery, TodosForStepQueryVariables>;