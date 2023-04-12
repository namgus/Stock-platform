export type CommentStatus = 'positive' | 'negative' | 'neutral';

export interface Comment {
    id: string;
    date: number;
    comment: string;
    sentiment: string;
  }
  