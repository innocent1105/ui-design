import { Card, CardContent } from '@/components/ui/card';
import { MailIcon, UserPlusIcon, MessageCircleIcon, ImageIcon } from 'lucide-react';

export interface TimelinePhotoItem {
  type: 'photos';
  user: string;
  content: string;
  photos: string[];
  time?: string;
}
export interface TimelineTextItem {
  type: 'email' | 'friend' | 'comment';
  user: string;
  content: string;
  time?: string;
}
export type TimelineItem = TimelinePhotoItem | TimelineTextItem;

export interface TimelineBlock {
  date: string;
  items: (TimelineItem & { time?: string })[];
}

const iconForType = (type: TimelineItem['type'], active: boolean) => {
  const base = active
    ? 'w-3.5 h-3.5 text-green-500 dark:text-green-400'
    : 'w-3.5 h-3.5 text-gray-500 dark:text-gray-400';
  switch (type) {
    case 'email':
      return <MailIcon className={base} />;
    case 'friend':
      return <UserPlusIcon className={base} />;
    case 'comment':
      return <MessageCircleIcon className={base} />;
    case 'photos':
      return <ImageIcon className={base} />;
    default:
      return <span className={base + ' rounded-full inline-block'} />;
  }
};

const titleForType = (type: TimelineItem['type']) => {
  switch (type) {
    case 'email':
      return 'Email';
    case 'friend':
      return 'Friend Request';
    case 'comment':
      return 'Comment';
    case 'photos':
      return 'Photos';
    default:
      return '';
  }
};

const ProfileTimeline = ({ timeline }: { timeline: TimelineBlock[] }) => (
  <div className="space-y-10">
    {timeline.map((block, idx) => (
      <div key={idx}>
        <div className="sticky top-0 bg-background py-1 mb-4">
          <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full shadow-sm">{block.date}</span>
        </div>
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-6">
          {block.items.map((item, i) => {
            const active = i === 0;
            return (
              <li key={i} className={`mb-10 ms-6 ${i === block.items.length - 1 ? '' : ''}`}>
                <span className={`absolute flex items-center justify-center w-8 h-8 -start-4 ring-4 ring-white dark:ring-gray-900  ${active
                  ? 'bg-green-200 dark:bg-green-900'
                  : 'bg-gray-100 dark:bg-gray-700'
                  } rounded-full`}>
                  {iconForType(item.type, active)}
                </span>
                <Card>
                  <CardContent className="py-0 flex flex-col gap-1">
                    <h3 className="font-medium leading-tight">{titleForType(item.type)}</h3>
                    <div className="text-xs text-muted-foreground mb-1">{item.user}</div>
                    <div className="text-sm mb-2">{item.content}</div>
                    {'photos' in item && (
                      <div className="flex gap-2 mt-2">
                        {item.photos.map((url, j) => (
                          <img key={j} src={url} alt="timeline" className="rounded-lg object-cover w-16 h-16" />
                        ))}
                      </div>
                    )}
                    {item.time && (
                      <div className="text-xs text-muted-foreground text-right mt-2">{item.time}</div>
                    )}
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    ))}
  </div>
);

export default ProfileTimeline;