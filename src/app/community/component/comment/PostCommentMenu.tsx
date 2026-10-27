import { useState, type MouseEvent } from 'react';
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuButton } from '@/app/community/style/PostComment.style';

interface PostCommentMenuProps {
  /** "수정"을 눌렀을 때 */
  onEdit: () => void;

  /** "삭제"를 눌렀을 때 (확인창은 부른 쪽이 띄운다) */
  onDelete: () => void;
}

/**
 * 내 댓글의 ⋮ 버튼과 수정, 삭제 메뉴. 메뉴 항목을 누르면 메뉴를 닫고 해당 동작을 부른다.
 */
const PostCommentMenu = ({ onEdit, onDelete }: PostCommentMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleClose();
    onEdit();
  };

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

  return (
    <>
      <MenuButton size="small" aria-label="댓글 메뉴" onClick={handleOpen}>
        <MoreVertIcon fontSize="inherit" />
      </MenuButton>
      <Menu anchorEl={anchorEl} open={anchorEl !== null} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          수정
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlinedIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography component="span" color="error">
            삭제
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostCommentMenu;
