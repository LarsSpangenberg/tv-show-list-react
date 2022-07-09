import { FC } from 'react';
import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

interface ShowsListHeadProps {
  numSelected: number;
  rowsCount: number;
  handleCheckAll: () => void;
}

const ShowsListHead: FC<ShowsListHeadProps> = ({
  numSelected,
  rowsCount,
  handleCheckAll,
}) => {
  const isAllSelected = rowsCount > 0 && numSelected === rowsCount;
  const isAnySelected = numSelected > 0 && numSelected < rowsCount;

  return (
    <TableHead>
      <TableRow
        sx={{
          bgcolor: 'primary.dark',
          '& th': { color: 'common.white' },
        }}
      >
        <TableCell padding='checkbox'>
          <Checkbox
            sx={{ color: 'secondary.light' }}
            indeterminate={isAnySelected}
            checked={isAllSelected}
            onClick={handleCheckAll}
            checkedIcon={<CheckBoxIcon sx={{ color: 'secondary.light' }} />}
            indeterminateIcon={<IndeterminateCheckBoxIcon />}
          />
        </TableCell>

        <TableCell>Title</TableCell>
        <TableCell align='center'>Season</TableCell>
        <TableCell align='center'>Episode</TableCell>
        <TableCell align='center'>Status</TableCell>
        <TableCell align='center'>Tags</TableCell>
        <TableCell align='center'>Note</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ShowsListHead;
