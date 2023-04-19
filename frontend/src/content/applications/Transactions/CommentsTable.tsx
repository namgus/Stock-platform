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
  CardHeader,
  styled,
  InputBase,
  Button
} from '@mui/material';

import Label from 'src/components/Label';
import { Comment, CommentStatus } from 'src/models/comment';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import BulkActions from './BulkActions';

import axios from 'axios';


interface DebatesTableProps {
  className?: string;
  comment: Comment[];
}

interface Filters {
  sentiment?: CommentStatus;
}

const getStatusLabel = (commentStatus: CommentStatus): JSX.Element => {
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

  const { text, color }: any = map[commentStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  comment: Comment[],
  filters: Filters
): Comment[] => {
  return comment.filter((naverDebate) => {
    let matches = true;

    if (filters.sentiment && naverDebate.sentiment !== filters.sentiment) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  comment: Comment[],
  page: number,
  limit: number
): Comment[] => {
  return comment.slice(page * limit, page * limit + limit);
};

const DebatesTable: FC<DebatesTableProps> = ({ comment }) => {
  const [selectedComments, setSelectedComments] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedComments.length > 0;
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

  const handleSelectAllComments = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedComments(
      event.target.checked
        ? comment.map((naverDebate) => naverDebate.id)
        : []
    );
  };

  const handleSelectOneComment = (
    event: ChangeEvent<HTMLInputElement>,
    naverDebateId: string
  ): void => {
    if (!selectedComments.includes(naverDebateId)) {
      setSelectedComments((prevSelected) => [
        ...prevSelected,
        naverDebateId
      ]);
    } else {
      setSelectedComments((prevSelected) =>
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

  const filteredComments = applyFilters(comment, filters);
  const paginatedComments = applyPagination(
    filteredComments,
    page,
    limit
  );
  const selectedSomeComments =
    selectedComments.length > 0 &&
    selectedComments.length < comment.length;
  const selectedAllComments =
    selectedComments.length === comment.length;
  const theme = useTheme();


//   message part
  const MessageInputWrapper = styled(InputBase)(
    ({ theme }) => `
      font-size: ${theme.typography.pxToRem(18)};
      padding: ${theme.spacing(1)};
      width: 100%;
  `
  );
  
  const Input = styled('input')({
    display: 'none'
  });

  const CssTextField = styled(TextField)(
    ({ theme }) => `
      font-size: ${theme.typography.pxToRem(18)};
      padding: ${theme.spacing(1)};
      width: 100%;
  `
  );

  const MessageInput = styled('input')(
    ({ theme }) => `
      font-size: ${theme.typography.pxToRem(18)};
      padding: ${theme.spacing(1)};
      width: 100%;
  `
  );

  // post comment
  const [commentText, setCommentText] = useState<string>("");

  const code = new URLSearchParams(location.search).get('code');
  const postComment = async(commentText: string) => {
    try {
      const response = await axios.post("http://3.38.179.15:8000/stock/comment", {
          
          code,
          comments: commentText
        
      });
      console.log(response.data); // log the response data to the console
    } catch (error) {
      console.error(error); // log the error to the console
    }
  };

  const handlePostCommentClick = () => {
    postComment(commentText);
    setCommentText(""); // clear the comment text
    window.location.reload();
  };


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
            <Box p={0.1}>
              <TablePagination
                component="div"
                count={filteredComments.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 30]}
              />
            </Box>
          }
          title="토론방"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align='center'>순서</TableCell>
              <TableCell padding="checkbox" align='center'>날짜</TableCell>
              <TableCell align='center'>제목</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedComments.map((naverDebate) => {
              const isCommentSelected = selectedComments.includes(
                naverDebate.id
              );
              return (
                <TableRow
                  hover
                  key={naverDebate.id}
                  selected={isCommentSelected}
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
                  <TableCell align='center'>
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
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {naverDebate.comment}
                    </Typography>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Box
      sx={{
        background: theme.colors.alpha.white[50],
        display: 'flex',
        alignItems: 'center',
        p: 2
      }}
    >
        <ArrowForwardIosIcon sx={{ color: blue[500] }}></ArrowForwardIosIcon>
      <Box flexGrow={1} display="flex" alignItems="center">
        {/* <MessageInputWrapper
          // autoComplete="off"
          autoFocus
          placeholder="Write your message here..."
          fullWidth
          value={commentText}
          onChange={handleCommentTextChange}
        /> */}
        <input 
          type="text" 
          value={commentText}
          placeholder="Write your message here..."
          onChange={(e) => setCommentText(e.target.value)}
          style={{
            fontSize: theme.typography.pxToRem(18),
            padding: theme.spacing(1),
            width: '100%'
            }}
        />
      </Box>
      <Box>
        <Tooltip arrow placement="top" title="Choose an emoji">
          <IconButton
            sx={{ fontSize: theme.typography.pxToRem(16) }}
            color="primary"
          >
            😀
          </IconButton>
        </Tooltip>
        <Input accept="image/*" id="messenger-upload-file" type="file" />
        <Tooltip arrow placement="top" title="Attach a file">
          <label htmlFor="messenger-upload-file">
            <IconButton sx={{ mx: 1 }} color="primary" component="span">
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip>
        <Button startIcon={<SendTwoToneIcon />} variant="contained" onClick={handlePostCommentClick}>
          Submit
        </Button>
      </Box>
    </Box>
    </Card>
  );
};

DebatesTable.propTypes = {
  comment: PropTypes.array.isRequired
};

DebatesTable.defaultProps = {
  comment: []
};

export default DebatesTable;
