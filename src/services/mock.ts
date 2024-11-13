import type { ColorService, CombinationGroup } from './interfaces';


export function getMockColorService(): ColorService {
  return {
    getCombinations(options) {
      return new Promise((resolve, reject) => {
        fetch('/combinations.json').then(res => res.json()).then(data => {
          const apiMockData = data.combinations as CombinationGroup[];
          const { page = 1, limit = 5 } = options ? options : {
            page: 1,
            limit: 5
          }
          const result = apiMockData.slice((page - 1) * limit, (page - 1) * limit + limit);
          resolve({
            data: result,
            pagination: {
              page,
              totalPage: Math.ceil(apiMockData.length / limit)
            }
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCombinationById(id: number) {
      return new Promise((resolve, reject) => {
        fetch('/combinations.json').then(res => res.json()).then(data => {
          const apiMockData = data.combinations as CombinationGroup[];
          const item = apiMockData.find(item => {
            return item.combination.id === id
          });
          if(item) {
            resolve(item);
          } else {
            reject('404');
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
