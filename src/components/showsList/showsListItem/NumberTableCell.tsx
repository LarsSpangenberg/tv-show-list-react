import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { TableCell, Box, IconButton, debounce } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const buttonStyles = {
  opacity: 0,
  transition: 'opacity .3s ease-in-out',
};

interface NumberTableCellProps {
  value: number;
  onClick: MouseEventHandler<HTMLElement>;
  updateValue: (value: number) => void;
}

const NumberTableCell: FC<NumberTableCellProps> = ({
  value: val,
  updateValue,
  ...attributes
}) => {
  const [value, setValue] = useState(val);

  const debouncedUpdateValue = useCallback(
    debounce((newValue) => {
      updateValue(newValue);
    }, 1000),
    []
  );

  function handleIncDecClick(
    isIncrementing: boolean,
    e: React.MouseEvent<HTMLElement>
  ) {
    e.stopPropagation();
    let newValue;

    if (isIncrementing) {
      debouncedUpdateValue.clear();
      newValue = value + 1;
      setValue(newValue);
      debouncedUpdateValue(newValue);
    } else if (!isIncrementing && value > 1) {
      debouncedUpdateValue.clear();
      newValue = value - 1;
      setValue(newValue);
      debouncedUpdateValue(newValue);
    }
  }

  return (
    <TableCell
      align='center'
      sx={{ '&:hover button': { opacity: 1 } }}
      {...attributes}
    >
      <Box
        width={100}
        display='inline-flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <IconButton
          onClick={handleIncDecClick.bind(this, false)}
          size='small'
          sx={buttonStyles}
        >
          <RemoveIcon fontSize='small' />
        </IconButton>

        {value}

        <IconButton
          sx={buttonStyles}
          onClick={handleIncDecClick.bind(this, true)}
          size='small'
        >
          <AddIcon fontSize='small' />
        </IconButton>
      </Box>
    </TableCell>
  );
};

export default NumberTableCell;
