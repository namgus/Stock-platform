import { Card } from '@mui/material';
import { Comment } from 'src/models/comment';
import CommentsTable from './CommentsTable';
import { subDays } from 'date-fns';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    axios.get('http://3.36.50.105:8000/stock/comment', {
        params: {
            code: {code}
        }
    })
      .then(response => {
        const financialData = response.data.reverse();

        const updatedComments = financialData.map((data, index) => ({
          id: index,
          date: new Date(data.created_at).getTime(),
          comment: data.comments,
          sentiment: "Positive"
        }));

        // update the state with the modified Comments data
        setComments(updatedComments);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  return (
    <Card>
      <CommentsTable comment={comments} />
    </Card>
    
  );
}

export default Comments;
