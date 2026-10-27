import { Controller, type UseFormReturn } from 'react-hook-form';
import { FormHelperText, TextField } from '@mui/material';
import RichTextEditor from '@/app/common/component/RichTextEditor';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import type { PostSaveRequestBody } from '@/app/community/interface/PostSaveRequestBody';
import { validatePostContent, validatePostTitle } from '@/app/community/utils/PostUtils';

interface PostFormFieldsProps {
  /** 글 쓰기 폼 */
  form: UseFormReturn<PostSaveRequestBody>;

  /** 저장 요청 중이면 고칠 수 없다 */
  disabled: boolean;
}

/**
 * 글 쓰기 입력칸. 한 장의 카드 안에 제목 입력칸과 본문 에디터가 있다.
 * 에디터는 처음 값을 한 번만 받으므로, 수정 화면은 글을 받은 뒤에 이 칸을 그린다.
 */
const PostFormFields = ({ form, disabled }: PostFormFieldsProps) => {
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <ColumnCard>
      <TextField
        label="제목"
        fullWidth
        autoFocus
        disabled={disabled}
        error={!!errors.title}
        helperText={errors.title?.message}
        inputRef={register('title', { validate: validatePostTitle }).ref}
        {...register('title', { validate: validatePostTitle })}
      />
      <Controller
        name="content"
        control={control}
        rules={{ validate: validatePostContent }}
        render={({ field, fieldState }) => (
          <>
            <RichTextEditor value={field.value} onChange={field.onChange} placeholder="내용을 입력해 주세요" disabled={disabled} />
            {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
          </>
        )}
      />
    </ColumnCard>
  );
};

export default PostFormFields;
