import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Heart, Share2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ActivityItem {
  user: string;
  type: string;
  time: string;
  content?: string;
  photos?: string[];
}

const initialCounts = (feed: ActivityItem[]) =>
  feed.map(() => ({ likes: 0, comments: 0, shares: 0 }));

const ProfileActivity = ({ activityFeed }: { activityFeed: ActivityItem[] }) => {
  const [feed, setFeed] = useState(activityFeed);
  const [counts, setCounts] = useState(initialCounts(activityFeed));
  const [commentInputs, setCommentInputs] = useState<string[]>(Array(activityFeed.length).fill(''));

  const handleLike = (idx: number) => {
    setCounts(c => c.map((item, i) => i === idx ? { ...item, likes: item.likes + 1 } : item));
  };
  const handleComment = (idx: number) => {
    setCounts(c => c.map((item, i) => i === idx ? { ...item, comments: item.comments + 1 } : item));
  };
  const handleShare = (idx: number) => {
    setCounts(c => c.map((item, i) => i === idx ? { ...item, shares: item.shares + 1 } : item));
  };
  const handleRemove = (idx: number) => {
    setFeed(f => f.filter((_, i) => i !== idx));
    setCounts(c => c.filter((_, i) => i !== idx));
    setCommentInputs(inputs => inputs.filter((_, i) => i !== idx));
  };
  const handleInputChange = (idx: number, value: string) => {
    setCommentInputs(inputs => inputs.map((input, i) => i === idx ? value : input));
  };
  const handleAddComment = (idx: number, e: React.FormEvent) => {
    e.preventDefault();
    if (commentInputs[idx].trim() !== '') {
      handleComment(idx);
      setCommentInputs(inputs => inputs.map((input, i) => i === idx ? '' : input));
    }
  };

  return (
    <div className="space-y-6">
      {feed.map((item, idx) => (
        <Card key={idx} className="relative">
          <button
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            onClick={() => handleRemove(idx)}
            aria-label="Remove activity"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-lg text-primary">
                {item.user[0]}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.user}</div>
                <div className="text-xs text-muted-foreground mb-1">{item.time}</div>
                {item.type === 'photos' ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {item.photos?.map((url, i) => (
                      <img key={i} src={url} alt="activity" className="rounded-lg object-cover w-full h-28" />
                    ))}
                  </div>
                ) : (
                  <div className="text-sm mt-1">{item.content}</div>
                )}
                <div className="flex gap-6 mt-4 text-muted-foreground">
                  <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={() => handleLike(idx)}>
                    <Heart className="w-5 h-5" />
                    <span className="text-xs">{counts[idx].likes}</span>
                  </button>
                  <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={() => handleComment(idx)}>
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs">{counts[idx].comments}</span>
                  </button>
                  <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={() => handleShare(idx)}>
                    <Share2 className="w-5 h-5" />
                    <span className="text-xs">{counts[idx].shares}</span>
                  </button>
                </div>
                <form className="mt-3 flex gap-2" onSubmit={e => handleAddComment(idx, e)}>
                  <Input
                    value={commentInputs[idx] || ''}
                    onChange={e => handleInputChange(idx, e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" variantClassName="primary">Post</Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileActivity; 