export type Maybe<T> = T | null;


export interface ImageTransformOptions {
  
  backgroundColor?: Maybe<HexColor>;
  
  cornerRadius?: Maybe<number>;
  
  format?: Maybe<ImageFormat>;
  
  height?: Maybe<Dimension>;
  
  quality?: Maybe<Quality>;
  
  resizeFocus?: Maybe<ImageResizeFocus>;
  
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  
  width?: Maybe<Dimension>;
}

export interface AssetFilter {
  
  AND?: Maybe<(Maybe<AssetFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  contentType?: Maybe<string>;
  
  contentType_contains?: Maybe<string>;
  
  contentType_exists?: Maybe<boolean>;
  
  contentType_in?: Maybe<(Maybe<string>)[]>;
  
  contentType_not?: Maybe<string>;
  
  contentType_not_contains?: Maybe<string>;
  
  contentType_not_in?: Maybe<(Maybe<string>)[]>;
  
  description?: Maybe<string>;
  
  description_contains?: Maybe<string>;
  
  description_exists?: Maybe<boolean>;
  
  description_in?: Maybe<(Maybe<string>)[]>;
  
  description_not?: Maybe<string>;
  
  description_not_contains?: Maybe<string>;
  
  description_not_in?: Maybe<(Maybe<string>)[]>;
  
  fileName?: Maybe<string>;
  
  fileName_contains?: Maybe<string>;
  
  fileName_exists?: Maybe<boolean>;
  
  fileName_in?: Maybe<(Maybe<string>)[]>;
  
  fileName_not?: Maybe<string>;
  
  fileName_not_contains?: Maybe<string>;
  
  fileName_not_in?: Maybe<(Maybe<string>)[]>;
  
  height?: Maybe<number>;
  
  height_exists?: Maybe<boolean>;
  
  height_gt?: Maybe<number>;
  
  height_gte?: Maybe<number>;
  
  height_in?: Maybe<(Maybe<number>)[]>;
  
  height_lt?: Maybe<number>;
  
  height_lte?: Maybe<number>;
  
  height_not?: Maybe<number>;
  
  height_not_in?: Maybe<(Maybe<number>)[]>;
  
  OR?: Maybe<(Maybe<AssetFilter>)[]>;
  
  size?: Maybe<number>;
  
  size_exists?: Maybe<boolean>;
  
  size_gt?: Maybe<number>;
  
  size_gte?: Maybe<number>;
  
  size_in?: Maybe<(Maybe<number>)[]>;
  
  size_lt?: Maybe<number>;
  
  size_lte?: Maybe<number>;
  
  size_not?: Maybe<number>;
  
  size_not_in?: Maybe<(Maybe<number>)[]>;
  
  sys?: Maybe<SysFilter>;
  
  title?: Maybe<string>;
  
  title_contains?: Maybe<string>;
  
  title_exists?: Maybe<boolean>;
  
  title_in?: Maybe<(Maybe<string>)[]>;
  
  title_not?: Maybe<string>;
  
  title_not_contains?: Maybe<string>;
  
  title_not_in?: Maybe<(Maybe<string>)[]>;
  
  url?: Maybe<string>;
  
  url_contains?: Maybe<string>;
  
  url_exists?: Maybe<boolean>;
  
  url_in?: Maybe<(Maybe<string>)[]>;
  
  url_not?: Maybe<string>;
  
  url_not_contains?: Maybe<string>;
  
  url_not_in?: Maybe<(Maybe<string>)[]>;
  
  width?: Maybe<number>;
  
  width_exists?: Maybe<boolean>;
  
  width_gt?: Maybe<number>;
  
  width_gte?: Maybe<number>;
  
  width_in?: Maybe<(Maybe<number>)[]>;
  
  width_lt?: Maybe<number>;
  
  width_lte?: Maybe<number>;
  
  width_not?: Maybe<number>;
  
  width_not_in?: Maybe<(Maybe<number>)[]>;
}

export interface ContentfulMetadataFilter {
  
  tags?: Maybe<ContentfulMetadataTagsFilter>;
  
  tags_exists?: Maybe<boolean>;
}

export interface ContentfulMetadataTagsFilter {
  
  id_contains_all?: Maybe<(Maybe<string>)[]>;
  
  id_contains_none?: Maybe<(Maybe<string>)[]>;
  
  id_contains_some?: Maybe<(Maybe<string>)[]>;
}

export interface SysFilter {
  
  firstPublishedAt?: Maybe<DateTime>;
  
  firstPublishedAt_exists?: Maybe<boolean>;
  
  firstPublishedAt_gt?: Maybe<DateTime>;
  
  firstPublishedAt_gte?: Maybe<DateTime>;
  
  firstPublishedAt_in?: Maybe<(Maybe<DateTime>)[]>;
  
  firstPublishedAt_lt?: Maybe<DateTime>;
  
  firstPublishedAt_lte?: Maybe<DateTime>;
  
  firstPublishedAt_not?: Maybe<DateTime>;
  
  firstPublishedAt_not_in?: Maybe<(Maybe<DateTime>)[]>;
  
  id?: Maybe<string>;
  
  id_contains?: Maybe<string>;
  
  id_exists?: Maybe<boolean>;
  
  id_in?: Maybe<(Maybe<string>)[]>;
  
  id_not?: Maybe<string>;
  
  id_not_contains?: Maybe<string>;
  
  id_not_in?: Maybe<(Maybe<string>)[]>;
  
  publishedAt?: Maybe<DateTime>;
  
  publishedAt_exists?: Maybe<boolean>;
  
  publishedAt_gt?: Maybe<DateTime>;
  
  publishedAt_gte?: Maybe<DateTime>;
  
  publishedAt_in?: Maybe<(Maybe<DateTime>)[]>;
  
  publishedAt_lt?: Maybe<DateTime>;
  
  publishedAt_lte?: Maybe<DateTime>;
  
  publishedAt_not?: Maybe<DateTime>;
  
  publishedAt_not_in?: Maybe<(Maybe<DateTime>)[]>;
  
  publishedVersion?: Maybe<number>;
  
  publishedVersion_exists?: Maybe<boolean>;
  
  publishedVersion_gt?: Maybe<number>;
  
  publishedVersion_gte?: Maybe<number>;
  
  publishedVersion_in?: Maybe<(Maybe<number>)[]>;
  
  publishedVersion_lt?: Maybe<number>;
  
  publishedVersion_lte?: Maybe<number>;
  
  publishedVersion_not?: Maybe<number>;
  
  publishedVersion_not_in?: Maybe<(Maybe<number>)[]>;
}

export interface ChapterFilter {
  
  AND?: Maybe<(Maybe<ChapterFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  global?: Maybe<boolean>;
  
  global_exists?: Maybe<boolean>;
  
  global_not?: Maybe<boolean>;
  
  id?: Maybe<number>;
  
  id_exists?: Maybe<boolean>;
  
  id_gt?: Maybe<number>;
  
  id_gte?: Maybe<number>;
  
  id_in?: Maybe<(Maybe<number>)[]>;
  
  id_lt?: Maybe<number>;
  
  id_lte?: Maybe<number>;
  
  id_not?: Maybe<number>;
  
  id_not_in?: Maybe<(Maybe<number>)[]>;
  
  name?: Maybe<string>;
  
  name_contains?: Maybe<string>;
  
  name_exists?: Maybe<boolean>;
  
  name_in?: Maybe<(Maybe<string>)[]>;
  
  name_not?: Maybe<string>;
  
  name_not_contains?: Maybe<string>;
  
  name_not_in?: Maybe<(Maybe<string>)[]>;
  
  OR?: Maybe<(Maybe<ChapterFilter>)[]>;
  
  sys?: Maybe<SysFilter>;
  
  team?: Maybe<CfTeamNestedFilter>;
  
  team_exists?: Maybe<boolean>;
}

export interface CfTeamNestedFilter {
  
  alias?: Maybe<string>;
  
  alias_contains?: Maybe<string>;
  
  alias_exists?: Maybe<boolean>;
  
  alias_in?: Maybe<(Maybe<string>)[]>;
  
  alias_not?: Maybe<string>;
  
  alias_not_contains?: Maybe<string>;
  
  alias_not_in?: Maybe<(Maybe<string>)[]>;
  
  AND?: Maybe<(Maybe<CfTeamNestedFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  description?: Maybe<string>;
  
  description_contains?: Maybe<string>;
  
  description_exists?: Maybe<boolean>;
  
  description_in?: Maybe<(Maybe<string>)[]>;
  
  description_not?: Maybe<string>;
  
  description_not_contains?: Maybe<string>;
  
  description_not_in?: Maybe<(Maybe<string>)[]>;
  
  id?: Maybe<number>;
  
  id_exists?: Maybe<boolean>;
  
  id_gt?: Maybe<number>;
  
  id_gte?: Maybe<number>;
  
  id_in?: Maybe<(Maybe<number>)[]>;
  
  id_lt?: Maybe<number>;
  
  id_lte?: Maybe<number>;
  
  id_not?: Maybe<number>;
  
  id_not_in?: Maybe<(Maybe<number>)[]>;
  
  name?: Maybe<string>;
  
  name_contains?: Maybe<string>;
  
  name_exists?: Maybe<boolean>;
  
  name_in?: Maybe<(Maybe<string>)[]>;
  
  name_not?: Maybe<string>;
  
  name_not_contains?: Maybe<string>;
  
  name_not_in?: Maybe<(Maybe<string>)[]>;
  
  OR?: Maybe<(Maybe<CfTeamNestedFilter>)[]>;
  
  sys?: Maybe<SysFilter>;
}

export interface EntryFilter {
  
  AND?: Maybe<(Maybe<EntryFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  OR?: Maybe<(Maybe<EntryFilter>)[]>;
  
  sys?: Maybe<SysFilter>;
}

export interface MenuFilter {
  
  AND?: Maybe<(Maybe<MenuFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  menuITems_exists?: Maybe<boolean>;
  
  OR?: Maybe<(Maybe<MenuFilter>)[]>;
  
  sys?: Maybe<SysFilter>;
}

export interface OnboardStepFilter {
  
  AND?: Maybe<(Maybe<OnboardStepFilter>)[]>;
  
  body?: Maybe<string>;
  
  body_contains?: Maybe<string>;
  
  body_exists?: Maybe<boolean>;
  
  body_in?: Maybe<(Maybe<string>)[]>;
  
  body_not?: Maybe<string>;
  
  body_not_contains?: Maybe<string>;
  
  body_not_in?: Maybe<(Maybe<string>)[]>;
  
  chapter?: Maybe<CfChapterNestedFilter>;
  
  chapter_exists?: Maybe<boolean>;
  
  codeBlock?: Maybe<string>;
  
  codeBlock_contains?: Maybe<string>;
  
  codeBlock_exists?: Maybe<boolean>;
  
  codeBlock_in?: Maybe<(Maybe<string>)[]>;
  
  codeBlock_not?: Maybe<string>;
  
  codeBlock_not_contains?: Maybe<string>;
  
  codeBlock_not_in?: Maybe<(Maybe<string>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  mainImage_exists?: Maybe<boolean>;
  
  OR?: Maybe<(Maybe<OnboardStepFilter>)[]>;
  
  step?: Maybe<number>;
  
  step_exists?: Maybe<boolean>;
  
  step_gt?: Maybe<number>;
  
  step_gte?: Maybe<number>;
  
  step_in?: Maybe<(Maybe<number>)[]>;
  
  step_lt?: Maybe<number>;
  
  step_lte?: Maybe<number>;
  
  step_not?: Maybe<number>;
  
  step_not_in?: Maybe<(Maybe<number>)[]>;
  
  sys?: Maybe<SysFilter>;
  
  title?: Maybe<string>;
  
  title_contains?: Maybe<string>;
  
  title_exists?: Maybe<boolean>;
  
  title_in?: Maybe<(Maybe<string>)[]>;
  
  title_not?: Maybe<string>;
  
  title_not_contains?: Maybe<string>;
  
  title_not_in?: Maybe<(Maybe<string>)[]>;
}

export interface CfChapterNestedFilter {
  
  AND?: Maybe<(Maybe<CfChapterNestedFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  global?: Maybe<boolean>;
  
  global_exists?: Maybe<boolean>;
  
  global_not?: Maybe<boolean>;
  
  id?: Maybe<number>;
  
  id_exists?: Maybe<boolean>;
  
  id_gt?: Maybe<number>;
  
  id_gte?: Maybe<number>;
  
  id_in?: Maybe<(Maybe<number>)[]>;
  
  id_lt?: Maybe<number>;
  
  id_lte?: Maybe<number>;
  
  id_not?: Maybe<number>;
  
  id_not_in?: Maybe<(Maybe<number>)[]>;
  
  name?: Maybe<string>;
  
  name_contains?: Maybe<string>;
  
  name_exists?: Maybe<boolean>;
  
  name_in?: Maybe<(Maybe<string>)[]>;
  
  name_not?: Maybe<string>;
  
  name_not_contains?: Maybe<string>;
  
  name_not_in?: Maybe<(Maybe<string>)[]>;
  
  OR?: Maybe<(Maybe<CfChapterNestedFilter>)[]>;
  
  sys?: Maybe<SysFilter>;
  
  team_exists?: Maybe<boolean>;
}

export interface TeamFilter {
  
  alias?: Maybe<string>;
  
  alias_contains?: Maybe<string>;
  
  alias_exists?: Maybe<boolean>;
  
  alias_in?: Maybe<(Maybe<string>)[]>;
  
  alias_not?: Maybe<string>;
  
  alias_not_contains?: Maybe<string>;
  
  alias_not_in?: Maybe<(Maybe<string>)[]>;
  
  AND?: Maybe<(Maybe<TeamFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  description?: Maybe<string>;
  
  description_contains?: Maybe<string>;
  
  description_exists?: Maybe<boolean>;
  
  description_in?: Maybe<(Maybe<string>)[]>;
  
  description_not?: Maybe<string>;
  
  description_not_contains?: Maybe<string>;
  
  description_not_in?: Maybe<(Maybe<string>)[]>;
  
  id?: Maybe<number>;
  
  id_exists?: Maybe<boolean>;
  
  id_gt?: Maybe<number>;
  
  id_gte?: Maybe<number>;
  
  id_in?: Maybe<(Maybe<number>)[]>;
  
  id_lt?: Maybe<number>;
  
  id_lte?: Maybe<number>;
  
  id_not?: Maybe<number>;
  
  id_not_in?: Maybe<(Maybe<number>)[]>;
  
  name?: Maybe<string>;
  
  name_contains?: Maybe<string>;
  
  name_exists?: Maybe<boolean>;
  
  name_in?: Maybe<(Maybe<string>)[]>;
  
  name_not?: Maybe<string>;
  
  name_not_contains?: Maybe<string>;
  
  name_not_in?: Maybe<(Maybe<string>)[]>;
  
  OR?: Maybe<(Maybe<TeamFilter>)[]>;
  
  sys?: Maybe<SysFilter>;
}

export interface TodoFilter {
  
  AND?: Maybe<(Maybe<TodoFilter>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  description?: Maybe<string>;
  
  description_contains?: Maybe<string>;
  
  description_exists?: Maybe<boolean>;
  
  description_in?: Maybe<(Maybe<string>)[]>;
  
  description_not?: Maybe<string>;
  
  description_not_contains?: Maybe<string>;
  
  description_not_in?: Maybe<(Maybe<string>)[]>;
  
  id?: Maybe<number>;
  
  id_exists?: Maybe<boolean>;
  
  id_gt?: Maybe<number>;
  
  id_gte?: Maybe<number>;
  
  id_in?: Maybe<(Maybe<number>)[]>;
  
  id_lt?: Maybe<number>;
  
  id_lte?: Maybe<number>;
  
  id_not?: Maybe<number>;
  
  id_not_in?: Maybe<(Maybe<number>)[]>;
  
  OR?: Maybe<(Maybe<TodoFilter>)[]>;
  
  step?: Maybe<CfOnboardStepNestedFilter>;
  
  step_exists?: Maybe<boolean>;
  
  sys?: Maybe<SysFilter>;
  
  title?: Maybe<string>;
  
  title_contains?: Maybe<string>;
  
  title_exists?: Maybe<boolean>;
  
  title_in?: Maybe<(Maybe<string>)[]>;
  
  title_not?: Maybe<string>;
  
  title_not_contains?: Maybe<string>;
  
  title_not_in?: Maybe<(Maybe<string>)[]>;
}

export interface CfOnboardStepNestedFilter {
  
  AND?: Maybe<(Maybe<CfOnboardStepNestedFilter>)[]>;
  
  body?: Maybe<string>;
  
  body_contains?: Maybe<string>;
  
  body_exists?: Maybe<boolean>;
  
  body_in?: Maybe<(Maybe<string>)[]>;
  
  body_not?: Maybe<string>;
  
  body_not_contains?: Maybe<string>;
  
  body_not_in?: Maybe<(Maybe<string>)[]>;
  
  chapter_exists?: Maybe<boolean>;
  
  codeBlock?: Maybe<string>;
  
  codeBlock_contains?: Maybe<string>;
  
  codeBlock_exists?: Maybe<boolean>;
  
  codeBlock_in?: Maybe<(Maybe<string>)[]>;
  
  codeBlock_not?: Maybe<string>;
  
  codeBlock_not_contains?: Maybe<string>;
  
  codeBlock_not_in?: Maybe<(Maybe<string>)[]>;
  
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  
  mainImage_exists?: Maybe<boolean>;
  
  OR?: Maybe<(Maybe<CfOnboardStepNestedFilter>)[]>;
  
  step?: Maybe<number>;
  
  step_exists?: Maybe<boolean>;
  
  step_gt?: Maybe<number>;
  
  step_gte?: Maybe<number>;
  
  step_in?: Maybe<(Maybe<number>)[]>;
  
  step_lt?: Maybe<number>;
  
  step_lte?: Maybe<number>;
  
  step_not?: Maybe<number>;
  
  step_not_in?: Maybe<(Maybe<number>)[]>;
  
  sys?: Maybe<SysFilter>;
  
  title?: Maybe<string>;
  
  title_contains?: Maybe<string>;
  
  title_exists?: Maybe<boolean>;
  
  title_in?: Maybe<(Maybe<string>)[]>;
  
  title_not?: Maybe<string>;
  
  title_not_contains?: Maybe<string>;
  
  title_not_in?: Maybe<(Maybe<string>)[]>;
}

  export enum ImageFormat {
    Avif = "AVIF",
    Jpg = "JPG",
    JpgProgressive = "JPG_PROGRESSIVE",
    Png = "PNG",
    Png8 = "PNG8",
    Webp = "WEBP",
  }

  export enum ImageResizeFocus {
    Bottom = "BOTTOM",
    BottomLeft = "BOTTOM_LEFT",
    BottomRight = "BOTTOM_RIGHT",
    Center = "CENTER",
    Face = "FACE",
    Faces = "FACES",
    Left = "LEFT",
    Right = "RIGHT",
    Top = "TOP",
    TopLeft = "TOP_LEFT",
    TopRight = "TOP_RIGHT",
  }

  export enum ImageResizeStrategy {
    Crop = "CROP",
    Fill = "FILL",
    Fit = "FIT",
    Pad = "PAD",
    Scale = "SCALE",
    Thumb = "THUMB",
  }

  export enum AssetOrder {
    ContentTypeAsc = "contentType_ASC",
    ContentTypeDesc = "contentType_DESC",
    FileNameAsc = "fileName_ASC",
    FileNameDesc = "fileName_DESC",
    HeightAsc = "height_ASC",
    HeightDesc = "height_DESC",
    SizeAsc = "size_ASC",
    SizeDesc = "size_DESC",
    SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
    SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
    SysIdAsc = "sys_id_ASC",
    SysIdDesc = "sys_id_DESC",
    SysPublishedAtAsc = "sys_publishedAt_ASC",
    SysPublishedAtDesc = "sys_publishedAt_DESC",
    SysPublishedVersionAsc = "sys_publishedVersion_ASC",
    SysPublishedVersionDesc = "sys_publishedVersion_DESC",
    UrlAsc = "url_ASC",
    UrlDesc = "url_DESC",
    WidthAsc = "width_ASC",
    WidthDesc = "width_DESC",
  }

  export enum ChapterOrder {
    GlobalAsc = "global_ASC",
    GlobalDesc = "global_DESC",
    IdAsc = "id_ASC",
    IdDesc = "id_DESC",
    NameAsc = "name_ASC",
    NameDesc = "name_DESC",
    SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
    SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
    SysIdAsc = "sys_id_ASC",
    SysIdDesc = "sys_id_DESC",
    SysPublishedAtAsc = "sys_publishedAt_ASC",
    SysPublishedAtDesc = "sys_publishedAt_DESC",
    SysPublishedVersionAsc = "sys_publishedVersion_ASC",
    SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  }

  export enum EntryOrder {
    SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
    SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
    SysIdAsc = "sys_id_ASC",
    SysIdDesc = "sys_id_DESC",
    SysPublishedAtAsc = "sys_publishedAt_ASC",
    SysPublishedAtDesc = "sys_publishedAt_DESC",
    SysPublishedVersionAsc = "sys_publishedVersion_ASC",
    SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  }

  export enum MenuOrder {
    SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
    SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
    SysIdAsc = "sys_id_ASC",
    SysIdDesc = "sys_id_DESC",
    SysPublishedAtAsc = "sys_publishedAt_ASC",
    SysPublishedAtDesc = "sys_publishedAt_DESC",
    SysPublishedVersionAsc = "sys_publishedVersion_ASC",
    SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  }

  export enum OnboardStepOrder {
    StepAsc = "step_ASC",
    StepDesc = "step_DESC",
    SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
    SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
    SysIdAsc = "sys_id_ASC",
    SysIdDesc = "sys_id_DESC",
    SysPublishedAtAsc = "sys_publishedAt_ASC",
    SysPublishedAtDesc = "sys_publishedAt_DESC",
    SysPublishedVersionAsc = "sys_publishedVersion_ASC",
    SysPublishedVersionDesc = "sys_publishedVersion_DESC",
    TitleAsc = "title_ASC",
    TitleDesc = "title_DESC",
  }

  export enum TeamOrder {
    AliasAsc = "alias_ASC",
    AliasDesc = "alias_DESC",
    DescriptionAsc = "description_ASC",
    DescriptionDesc = "description_DESC",
    IdAsc = "id_ASC",
    IdDesc = "id_DESC",
    NameAsc = "name_ASC",
    NameDesc = "name_DESC",
    SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
    SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
    SysIdAsc = "sys_id_ASC",
    SysIdDesc = "sys_id_DESC",
    SysPublishedAtAsc = "sys_publishedAt_ASC",
    SysPublishedAtDesc = "sys_publishedAt_DESC",
    SysPublishedVersionAsc = "sys_publishedVersion_ASC",
    SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  }

  export enum TodoOrder {
    DescriptionAsc = "description_ASC",
    DescriptionDesc = "description_DESC",
    IdAsc = "id_ASC",
    IdDesc = "id_DESC",
    SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
    SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
    SysIdAsc = "sys_id_ASC",
    SysIdDesc = "sys_id_DESC",
    SysPublishedAtAsc = "sys_publishedAt_ASC",
    SysPublishedAtDesc = "sys_publishedAt_DESC",
    SysPublishedVersionAsc = "sys_publishedVersion_ASC",
    SysPublishedVersionDesc = "sys_publishedVersion_DESC",
    TitleAsc = "title_ASC",
    TitleDesc = "title_DESC",
  }


export type DateTime = any;


export type HexColor = any;


export type Dimension = any;


export type Quality = any;


export type Json = any;

export type AllTeamsInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsInfoQuery = { __typename?: 'Query', teamCollection?: { __typename?: 'TeamCollection', items: Array<{ __typename?: 'Team', name?: string | null, alias?: string | null } | null> } | null };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', team?: { __typename?: 'Team', name?: string | null, linkedFrom?: { __typename?: 'TeamLinkingCollections', chapterCollection?: { __typename?: 'ChapterCollection', total: number, items: Array<{ __typename?: 'Chapter', name?: string | null, id?: number | null, linkedFrom?: { __typename?: 'ChapterLinkingCollections', onboardStepCollection?: { __typename?: 'OnboardStepCollection', total: number, items: Array<{ __typename?: 'OnboardStep', step?: number | null, title?: string | null, body?: string | null, codeBlock?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null } | null };

export type TodosForStepQueryVariables = Exact<{
  stepId: Scalars['String'];
}>;


export type TodosForStepQuery = { __typename?: 'Query', onboardStep?: { __typename?: 'OnboardStep', linkedFrom?: { __typename?: 'OnboardStepLinkingCollections', todoCollection?: { __typename?: 'TodoCollection', items: Array<{ __typename?: 'Todo', description?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null };
