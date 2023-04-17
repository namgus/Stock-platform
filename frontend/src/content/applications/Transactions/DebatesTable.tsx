import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { NaverDebate, NaverDebateStatus } from 'src/models/naver_debate';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface DebatesTableProps {
  className?: string;
  naverDebates: NaverDebate[];
}

interface Filters {
  sentiment?: NaverDebateStatus;
}

const getStatusLabel = (naverDebateStatus: NaverDebateStatus): JSX.Element => {
  const map = {
    neutral: {
      text: 'Neutral',
      color: 'secondary'
    },
    positive: {
      text: 'Positive',
      color: 'success'
    },
    negative: {
      text: 'Negative',
      color: 'error'
    }
  };

  const { text, color }: any = map[naverDebateStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  naverDebates: NaverDebate[],
  filters: Filters
): NaverDebate[] => {
  return naverDebates.filter((naverDebate) => {
    let matches = true;

    if (filters.sentiment && naverDebate.sentiment !== filters.sentiment) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  naverDebates: NaverDebate[],
  page: number,
  limit: number
): NaverDebate[] => {
  return naverDebates.slice(page * limit, page * limit + limit);
};

const DebatesTable: FC<DebatesTableProps> = ({ naverDebates }) => {
  const [selectedNaverDebates, setSelectedNaverDebates] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedNaverDebates.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    sentiment: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'neutral',
      name: 'Neutral'
    },
    {
      id: 'positive',
      name: 'Positive'
    },
    {
      id: 'negative',
      name: 'Negative'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      sentiment: value
    }));
  };

  const handleSelectAllNaverDebates = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedNaverDebates(
      event.target.checked
        ? naverDebates.map((naverDebate) => naverDebate.id)
        : []
    );
  };

  const handleSelectOneNaverDebate = (
    event: ChangeEvent<HTMLInputElement>,
    naverDebateId: string
  ): void => {
    if (!selectedNaverDebates.includes(naverDebateId)) {
      setSelectedNaverDebates((prevSelected) => [
        ...prevSelected,
        naverDebateId
      ]);
    } else {
      setSelectedNaverDebates((prevSelected) =>
        prevSelected.filter((id) => id !== naverDebateId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredNaverDebates = applyFilters(naverDebates, filters);
  const paginatedNaverDebates = applyPagination(
    filteredNaverDebates,
    page,
    limit
  );
  const selectedSomeNaverDebates =
    selectedNaverDebates.length > 0 &&
    selectedNaverDebates.length < naverDebates.length;
  const selectedAllNaverDebates =
    selectedNaverDebates.length === naverDebates.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sentiment</InputLabel>
                <Select
                  value={filters.sentiment || 'all'}
                  onChange={handleStatusChange}
                  label="Sentiment"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="네이버 종목토론실"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align='center'>
                순서
              </TableCell>
              <TableCell>날짜</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>조회</TableCell>
              <TableCell>공감</TableCell>
              <TableCell>비공감</TableCell>
              <TableCell>감성분석</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedNaverDebates.map((naverDebate) => {
              const isNaverDebateSelected = selectedNaverDebates.includes(
                naverDebate.id
              );
              return (
                <TableRow
                  hover
                  key={naverDebate.id}
                  selected={isNaverDebateSelected}
                >
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {naverDebate.id + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(naverDebate.date, 'yyyy-MM-dd HH:mm')}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(naverDebate.orderDate, 'MMMM dd yyyy')}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {naverDebate.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {naverDebate.views}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {naverDebate.good}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {naverDebate.bad}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusLabel(naverDebate.sentiment)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredNaverDebates.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

DebatesTable.propTypes = {
  naverDebates: PropTypes.array.isRequired
};

DebatesTable.defaultProps = {
  naverDebates: []
};

export default DebatesTable;
