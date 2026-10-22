import { useSearchParams } from 'react-router-dom';
import CategoryAxisTabs from '@/app/category/common/component/CategoryAxisTabs';
import { DEFAULT_CATEGORY_AXIS, isCategoryAxisKey, type CategoryAxisKey } from '@/app/category/common/constant/categoryAxes';
import FigureTypeCategoryContent from '@/app/category/figure-type/page/FigureTypeCategoryContent';
import GenreCharacterCategoryContent from '@/app/category/genre-character/page/GenreCharacterCategoryContent';
import MakerCategoryContent from '@/app/category/maker/page/MakerCategoryContent';
import SeriesCategoryContent from '@/app/category/series/page/SeriesCategoryContent';
import ShopCategoryContent from '@/app/category/shop/page/ShopCategoryContent';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';

/**
 * 카테고리 관리 화면 (/categories)
 * 축(판매처, 형태, 시리즈, 장르·캐릭터, 제조사)은 주소의 ?axis= 로 바꾸고, 축마다 독립된 화면을 그린다.
 */
const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const axisParam = searchParams.get('axis');
  const axis: CategoryAxisKey = isCategoryAxisKey(axisParam) ? axisParam : DEFAULT_CATEGORY_AXIS;

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          카테고리 관리
        </PageTitle>
      </PageHeader>

      <CategoryAxisTabs axis={axis} onChange={(nextAxis) => setSearchParams({ axis: nextAxis })} />

      {axis === 'shop' && <ShopCategoryContent />}
      {axis === 'figure-type' && <FigureTypeCategoryContent />}
      {axis === 'series' && <SeriesCategoryContent />}
      {axis === 'genre-character' && <GenreCharacterCategoryContent />}
      {axis === 'maker' && <MakerCategoryContent />}
    </PageContainer>
  );
};

export default CategoryPage;
