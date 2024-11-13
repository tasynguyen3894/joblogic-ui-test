export interface Color {
  slug: string,
  hex: string,
  name: string
}


export interface FeaturedImage {
  alt: string,
  url: string
}

export interface Combination {
  id: number;
  liked: boolean,
  slug: string,
  likes: number,
  name: string,
  color: Color,
  featuredImage: FeaturedImage
  colors: Color[]
}

export interface RelatedCombinations {
  id: number;
  liked: boolean,
  slug: string,
  likes: number,
  name: string,
  colors: string[]
}

export interface CombinationGroup {
  combination: Combination;
  relatedCombinations: RelatedCombinations[];
}



export interface ColorService {
  getCombinations(options?: {
    page?: number,
    limit?: number
  }): Promise<{
    data: CombinationGroup[],
    pagination: {
      page: number,
      totalPage: number,
    }
  }>;
  getCombinationById(id: number): Promise<CombinationGroup>
}




