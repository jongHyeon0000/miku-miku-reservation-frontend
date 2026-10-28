import type { Meta, StoryObj } from '@storybook/react-vite'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import { FieldColumn, FormLayout, ThumbnailBox } from '@/app/category/common/style/CategoryForm.style'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { DialogFormBody, FormActions } from '@/app/common/style/CommonForm.style'
import { ThumbFrame } from '@/app/common/style/CommonMedia.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 분류 폼 스타일을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '분류/폼 스타일 [CategoryForm.style.tsx]',
}

export default meta

type Story = StoryObj

/**
 * 카테고리 화면의 분류 추가, 수정 창(src/app/category/shop/component/ShopFormDialog.tsx 등 5개 축).
 * 왼쪽은 썸네일 칸(ThumbnailBox), 오른쪽은 입력칸 세로 묶음(FieldColumn)이고, 둘은 FormLayout 이 가로로 나란히 놓는다.
 * 썸네일 칸 안은 실제로는 이미지 올리기 컴포넌트가 채우며, 여기서는 빈 이미지 칸으로 대신한다
 */
export const CategoryFormDialog: Story = {
  name: '카테고리 > 추가 수정 창 > 썸네일과 입력칸',
  render: () => (
    <Dialog open fullWidth maxWidth="md">
      <DialogFormBody noValidate>
        <DialogTitle>샘플 분류 추가</DialogTitle>
        <DialogContent>
          <FormLayout>
            <ThumbnailBox>
              <ThumbFrame>
                <ImageOutlinedIcon color="disabled" fontSize="large" />
              </ThumbFrame>
            </ThumbnailBox>
            <FieldColumn>
              <TextField label="이름" />
              <TextField label="주소 (선택)" placeholder="https://" />
              <TextField label="설명 (선택)" multiline minRows={5} maxRows={5} />
            </FieldColumn>
          </FormLayout>
        </DialogContent>
        <FormActions>
          <TonalButton>닫기</TonalButton>
          <Button type="submit" variant="contained">
            추가
          </Button>
        </FormActions>
      </DialogFormBody>
    </Dialog>
  ),
}
