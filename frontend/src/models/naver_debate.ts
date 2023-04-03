export type NaverDebateStatus = 'positive' | 'negative' | 'neutral';

export interface NaverDebate {
  id: string;
  status: NaverDebateStatus;
  date: number;
  title: string;
  views: number;
  good: number;
  bad: number;
  sentiment: NaverDebateStatus;
}
