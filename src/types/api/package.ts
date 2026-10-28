export interface RelatedPackageBenefit {
  id: string;
  title: string;
}

/** Shape returned by GET /packages and GET /packages/:id (PackagePaginationDto). */
export interface Package {
  id: string;
  name: string;
  description: string | null;
  /** e.g. 8 = "8% of rental revenue". */
  commissionPercentage: number | null;
  benefits?: RelatedPackageBenefit[];
}

export interface PackageQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  [filter: string]: string | number | undefined;
}
