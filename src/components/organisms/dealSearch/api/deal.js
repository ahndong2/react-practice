import { API, HOST_API, setFromData } from '../../../../library/API';
import { Debug } from '../../../../library/Debug';

// 딜 검색
export const getDealList = (data, search) => {
  // 카테고리 ID, 키워드 검색시 기존에 Page 저장되있던값 초기화
  const page = search.keyword || search.categoriesID ? 1 : search.currentPage;

  if (search.categoriesID) {
    // 카테고리 검색
    if (!search.subCategoriesID) {
      alert('세부 카테고리를 선택해주세요.');
      return;
    }
  }

  const request = {
    method: 'GET',
    url: `${HOST_API}/admin/deals`,
    params: {
      page,
      limit: search.limit,
      keywordKey: 'dealSearch',
      keywordValue: search.keyword,
      categoryID: search.subCategoriesID,
    },
  };

  return API(request);
};

export default {
  getDealList,
};
