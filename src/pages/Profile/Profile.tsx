import { useState } from 'react';
import PageHeader from '@/components/navigation/page-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileSidebar from '@/components/profile/profile-sidebar';
import ProfileActivity from '@/components/profile/profile-activity';
import ProfileTimeline from '@/components/profile/profile-timeline';
import ProfileSettings from '@/components/profile/profile-settings';
import type { TimelineBlock } from '@/components/profile/profile-timeline';
import profileImage from '@/assets/profile-photo.png';
import postImage1 from '@/assets/post-image-1.png';
import postImage2 from '@/assets/post-image-2.png';

const user = {
  name: 'Julia Williams',
  title: 'Senior Frontend Developer',
  avatar: profileImage,
  followers: 2845,
  following: 892,
  friends: 15678,
  education: 'M.S. in Computer Science from Stanford University',
  location: 'San Francisco, California',
  skills: 'React TypeScript Next.js GraphQL UI/UX Design',
  notes: 'Passionate about building scalable web applications and contributing to open-source projects. Currently working on improving developer experience and accessibility in web development.'
};

const activityFeed = [
  {
    user: 'Emma Thompson',
    type: 'post',
    time: '2 hours ago',
    content: 'Just completed a major refactoring of our component library using React Server Components. The performance improvements are incredible! 🚀 #WebDev #React #Performance'
  },
  {
    user: 'Michael Rodriguez',
    type: 'message',
    time: '1 day ago',
    content: 'Thanks for your help with the TypeScript migration! Your suggestions on handling complex type definitions were exactly what we needed. Looking forward to collaborating on more projects.'
  },
  {
    user: 'Sophie Anderson',
    type: 'photos',
    time: '3 days ago',
    photos: [
      postImage1,
      postImage2
    ]
  }
];

const timeline: TimelineBlock[] = [
  {
    date: '15 Mar. 2024',
    items: [
      {
        type: 'email',
        user: 'GitHub',
        content: 'Your pull request #1234 has been merged into the main branch.',
        time: '09:30'
      },
      {
        type: 'friend',
        user: 'David Kim',
        content: 'accepted your connection request',
        time: '2 hours ago'
      },
      {
        type: 'comment',
        user: 'Lisa Wang',
        content: 'Great presentation at the React Conf! Your insights on state management were really helpful. Looking forward to implementing these patterns in our project.',
        time: '5 hours ago'
      }
    ]
  },
  {
    date: '10 Mar. 2024',
    items: [
      {
        type: 'photos',
        user: 'Team Offsite',
        content: 'shared photos from the annual team retreat',
        photos: [
          postImage1,
          postImage2,
        ],
        time: '3 days ago'
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