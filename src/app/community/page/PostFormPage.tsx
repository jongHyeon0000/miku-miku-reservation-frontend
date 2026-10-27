import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { FormBody } from '@/app/common/style/CommonForm.style';
import { EndRow } from '@/app/common/style/CommonLayout.style';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';
import PostFormActions, { POST_FORM_ID } from '@/app/community/component/form/PostFormActions';
import PostFormFields from '@/app/community/component/form/PostFormFields';
import type { PostDetail } from '@/app/community/interface/PostDetail';
import type { PostSaveRequestBody } from '@/app/community/interface/PostSaveRequestBody';
import useCreatePost from '@/app/community/service/useCreatePost';
import useReadPost from '@/app/community/service/useReadPost';
import useUpdatePost from '@/app/community/service/useUpdatePost';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

interface PostFormPageProps {
  /** insert: 글 쓰기, edit: 글 수정 */
  mode: 'insert' | 'edit';
}

interface PostFormContentProps {
  mode: 'insert' | 'edit';

  /** 수정할 글. 글 쓰기면 없다 */
  post?: PostDetail;

  saving: boolean;
  onSubmit: (values: PostSaveRequestBody) => void;
  onCancel: () => void;
}

/**
 * 게시글 쓰기, 수정 화면 (/community/new, /community/:postId/edit)
 * 수정은 상세 때 받아 둔 글을 그대로 쓴다(보관된 값이 없을 때만 서버에서 읽는다).
 */
const PostFormPage = ({ mode }: PostFormPageProps) => {
  const navigate = useNavigate();
  const postId = Number(useParams().postId);
  const showResult = useUiStore((state) => state.showResult);
  const isEdit = mode === 'edit';

  const { post, postLoading, fetchReadPost } = useReadPost(postId, isEdit);
  const { createPostLoading, fetchCreatePost } = useCreatePost();
  const { updatePostLoading, fetchUpdatePost } = useUpdatePost();

  const saving = createPostLoading || updatePostLoading;
  const isOk = post !== undefined && post.code === API_CODE.OK;
  const detail = isOk ? post.data : null;
  const failed = isEdit && post !== undefined && post.code !== API_CODE.OK ? post : null;
  const loaded = !isEdit || detail !== null;

  const handleCancel = () => navigate(isEdit ? `/community/${postId}` : '/community');

  const handleSave = async (values: PostSaveRequestBody) => {
    const res = isEdit ? await fetchUpdatePost(postId, values) : await fetchCreatePost(values);
    showResult(res);
    if (res.code !== API_CODE.OK) return;

    navigate(`/community/${res.data!.postId}`);
  };

  /* 남의 글은 고칠 수 없으므로 상세로 돌려보낸다(서버도 저장 때 403 을 준다) */
  if (isEdit && detail !== null && !detail.mine) {
    return <Navigate to={`/community/${postId}`} replace />;
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          {isEdit ? '글 수정' : '글 쓰기'}
        </PageTitle>
        <PostFormActions mode={mode} saving={saving} showSubmit={loaded} onCancel={handleCancel} />
      </PageHeader>

      {failed !== null && <ErrorView message={failed.message} onRetry={fetchReadPost} />}
      {loaded && (
        <PostFormContent mode={mode} post={detail !== null ? detail : undefined} saving={saving} onSubmit={handleSave} onCancel={handleCancel} />
      )}

      <LoadingOverlay open={postLoading || saving} />
    </PageContainer>
  );
};

/**
 * 폼 본체. 처음 값(수정이면 받은 글)을 한 번만 받으므로, 글을 받은 뒤에 그린다.
 */
const PostFormContent = ({ mode, post, saving, onSubmit, onCancel }: PostFormContentProps) => {
  const form = useForm<PostSaveRequestBody>({
    mode: 'onTouched',
    defaultValues: {
      title: post !== undefined ? post.title : '',
      content: post !== undefined ? post.content : '',
    },
  });

  return (
    <FormBody id={POST_FORM_ID} noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <PostFormFields form={form} disabled={saving} />
      <EndRow>
        <PostFormActions mode={mode} saving={saving} showSubmit onCancel={onCancel} />
      </EndRow>
    </FormBody>
  );
};

export default PostFormPage;
