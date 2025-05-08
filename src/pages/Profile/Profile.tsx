import { useState } from 'react';
import PageHeader from '@/components/navigation/page-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileActivity from '@/components/profile/ProfileActivity';
import ProfileTimeline from '@/components/profile/ProfileTimeline';
import ProfileSettings from '@/components/profile/ProfileSettings';
import type { TimelineBlock, TimelineItem } from '@/components/profile/ProfileTimeline';
import profileImage from '@/assets/profile-photo.png';
import postImage1 from '@/assets/post-image-1.png';
import postImage2 from '@/assets/post-image-2.png';

const user = {
  name: 'Nina Mcintire',
  title: 'Software Engineer',
  avatar: profileImage,
  followers: 1322,
  following: 543,
  friends: 13287,
  education: 'B.S. in Computer Science from the University of Tennessee at Knoxville',
  location: 'Malibu, California',
  skills: 'UI Design Coding Javascript PHP Node.js',
  notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.'
};

const activityFeed = [
  {
    user: 'Jonathan Burke Jr.',
    type: 'post',
    time: '7:30 PM today',
    content: 'Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.'
  },
  {
    user: 'Sarah Ross',
    type: 'message',
    time: '3 days ago',
    content: 'Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.'
  },
  {
    user: 'Adam Jones',
    type: 'photos',
    time: '5 days ago',
    photos: [
      postImage1,
      postImage2
    ]
  }
];

const timeline: TimelineBlock[] = [
  {
    date: '10 Feb. 2014',
    items: [
      {
        type: 'email',
        user: 'Support Team',
        content: 'Your order has been shipped, we will send you a tracking number shortly.',
        time: '12:05'
      },
      {
        type: 'friend',
        user: 'Sarah Young',
        content: 'accepted your friend request',
        time: '5 mins ago'
      },
      {
        type: 'comment',
        user: 'Jay White',
        content: 'Take me to your leader! Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!',
        time: '27 mins ago'
      }
    ]
  },
  {
    date: '3 Jan. 2014',
    items: [
      {
        type: 'photos',
        user: 'Mina Lee',
        content: 'uploaded new photos',
        photos: [
          postImage1,
          postImage2,
        ],
        time: '2 days ago'
      }
    ]
  }
];

const Profile = () => {
  const [tab, setTab] = useState('activity');
  return (
    <>
      <PageHeader
        items={[
          { label: 'Home', href: '/' },
          { label: 'User Profile', href: '/profile' }
        ]}
        heading="Profile"
      />
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <ProfileSidebar user={user} />
        <div className="flex-1">
          <Tabs value={tab} onValueChange={setTab} className="mt-4">
            <TabsList className="mb-4 flex gap-2 bg-muted p-1 rounded-lg w-fit">
              <TabsTrigger value="activity" className={tab === 'activity' ? '!bg-primary text-white shadow' : 'text-muted-foreground'}>
                Activity
              </TabsTrigger>
              <TabsTrigger value="timeline" className={tab === 'timeline' ? '!bg-primary text-white shadow' : 'text-muted-foreground'}>
                Timeline
              </TabsTrigger>
              <TabsTrigger value="settings" className={tab === 'settings' ? '!bg-primary text-white shadow' : 'text-muted-foreground'}>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <ProfileActivity activityFeed={activityFeed} />
            </TabsContent>
            <TabsContent value="timeline">
              <ProfileTimeline timeline={timeline} />
            </TabsContent>
            <TabsContent value="settings">
              <ProfileSettings user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Profile; 