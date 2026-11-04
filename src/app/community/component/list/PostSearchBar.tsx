import { Controller, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import CommonFlatFilter from '@/app/common/component/CommonFlatFilter';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FilterSearchInput } from '@/app/common/style/CommonFilter.style';
import { POST_SEARCH_TYPE_OPTIONS, type PostSearchType } from '@/app/community/constant/postSearchTypes';
import type { PostSearchValues } from '@/app/community/interface/PostListQuery';
import { styled } from '@mui/material/styles';

interface PostSearchBarProps {
  /** 지금 화면 주소에 걸린 검색 조건 (칸의 처음 값) */
  value: PostSearchValues;

  /** 검색 버튼이나 Enter 를 눌렀을 때 */
  onSearch: (values: PostSearchValues) => void;
}

/**
 * 게시판 제목 줄 오른쪽의 검색 줄. 검색 대상(제목+내용, 제목, 내용, 작성자)을 고르고 검색어를 넣는다.
 * 대상을 바꾸는 것만으로는 검색하지 않고, 검색 버튼이나 Enter 를 눌러야 검색한다.
 */
const PostSearchBar = ({ value, onSearch }: PostSearchBarProps) => {
  const { control, register, handleSubmit } = useForm<PostSearchValues>({ defaultValues: value });

  return (
    <SearchForm noValidate onSubmit={handleSubmit(onSearch)}>
      <Controller
        name="searchType"
        control={control}
        render={({ field }) => (
          <CommonFlatFilter
            options={POST_SEARCH_TYPE_OPTIONS}
            value={field.value}
            onChange={(next) => field.onChange(next as PostSearchType)}
          />
        )}
      />
      <FilterSearchInput
        placeholder="검색어를 입력하세요"
        endAdornment={<SearchIcon />}
        inputRef={register('keyword').ref}
        {...register('keyword')}
      />
      <TonalButton type="submit">검색</TonalButton>
    </SearchForm>
  );
};

/** 검색 줄. 칸 사이는 Row 와 같은 간격이다(제목 줄 PageHeader 가 오른쪽 끝으로 민다) */
const SearchForm = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export default PostSearchBar;
