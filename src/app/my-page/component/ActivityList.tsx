import type { KeyboardEvent, ReactNode } from 'react';
import { GroupStack } from '@/app/common/style/CommonLayout.style';
import { PagerRow, Panel, RowBox } from '@/app/common/style/CommonList.style';
import { styled } from '@mui/material/styles';

/** 활동 목록의 한 줄 */
export interface ActivityListItem {
  /** 줄을 가리는 번호 (눌렀을 때 onOpen 으로 돌아온다) */
  id: number;

  /** 위에 크게 보이는 글 (글은 제목, 답변은 내용) */
  main: ReactNode;

  /** 아래에 작게 보이는 정보 한 줄 */
  meta: ReactNode;
}

interface ActivityListProps {
  /** 보여 줄 줄들 */
  items: ActivityListItem[];

  /** 줄을 눌렀을 때 */
  onOpen: (id: number) => void;

  /** 패널 맨 아래 칸에 넣을 내용 (최근 글의 글 전체 보기). 없으면 칸도 없다 */
  footer?: ReactNode;
}

/**
 * 프로필의 최근 글, 최근 답변 목록. 줄마다 위에 큰 글, 아래에 작은 정보 한 줄을 보여 준다.
 * 줄 틀은 커뮤니티 목록과 같은 Panel, RowBox 이고, 맨 아래 칸은 커뮤니티 목록의 쪽 번호 칸과 같은 PagerRow 다.
 */
const ActivityList = ({ items, onOpen, footer }: ActivityListProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, id: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onOpen(id);
  };

  return (
    <Panel>
      {items.map((item) => (
        <ActivityRow
          key={item.id}
          role="button"
          tabIndex={0}
          onClick={() => onOpen(item.id)}
          onKeyDown={(event) => handleKeyDown(event, item.id)}
        >
          <GroupStack>
            {item.main}
            {item.meta}
          </GroupStack>
        </ActivityRow>
      ))}
      {footer !== undefined && <PagerRow>{footer}</PagerRow>}
    </Panel>
  );
};

export default ActivityList;

/** 누르는 줄이라 마우스를 올리면 손가락 모양이 된다(커뮤니티 목록의 PostRow 와 같다) */
const ActivityRow = styled(RowBox)({
  cursor: 'pointer',
});
