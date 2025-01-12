import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';

import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import PersonIcon from '@mui/icons-material/Person';

import MyProfile from './MyProfile';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CardMembership, Email, Groups2, HourglassBottom, LinkedIn, LocalActivity, Phone,  WhatsApp, Work } from '@mui/icons-material';

import WhatsAppContact from './Social/WhatsAppContact';
import GitHubContact from './Social/GitHubContact';
import EmailContact from './Social/EmailContact';
import LinkedInContact from './Social/LinkedInContact';
import TimeLine from './TimeLine';
import ProjectActivity from './ProjectActivity';
import ProjectDetails from './ProjectDetails';
import OtherActivites from './OtherActivites';
import Certifications from './Certifications';
import ClubActivities from './ClubActivities';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Details',
  },
  {
    segment: 'myprofile',
    title: 'My Profile',
    icon: <PersonIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind:'header',
    title:'Timeline'
  },
  {
    segment: 'mytimeline',
    title: 'My Timeline',
    icon: <HourglassBottom />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Know me',
  },
  {
    segment: 'clubactivities',
    title: 'Club Actvities',
    icon: <Groups2 />,
  },
  {
    segment: 'projectactivity',
    title: 'Projects',
    icon: <Work />,
  },
  {
    segment:'certifications',
    title:'My Certifications',
    icon:<CardMembership />
  },
  {
    segment: 'contacts',
    title: 'Contacts',
    icon: <Phone />,
    children: [
      {
        segment: 'github',
        title: 'Github',
        icon: <GitHubIcon />,
      },
      {
        segment: 'linkedin',
        title: 'LinkedIn',
        icon: <LinkedIn />,
      },
      {
        segment: 'whatsapp',
        title: 'WhatsApp',
        icon: <WhatsApp />,
      },
      {
        segment: 'email',
        title: 'Gmail',
        icon: <Email />,
      },
    ]
  },
  {
    kind:'divider'
  },
  {
    kind:'header',
    title:'Other Activities'
  },
  {
    segment:'otheractivities',
    title:'Other Activities',
    icon:<LocalActivity />
  }
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashBoard(props) {
  const { window } = props;

  const router = useDemoRouter('/myprofile');

  const renderContent = () => {
    switch (router.pathname) {
      case '/clubactivities':
        return <ClubActivities navigate={router.navigate} />
      case '/certifications':
        return <Certifications navigate={router.navigate} />
      case '/otheractivities':
        return <OtherActivites navigate={router.navigate}/>
      case '/projectactivity':
        return <ProjectActivity navigate={router.navigate}/>
        case '/projectdetails':
        return <ProjectDetails navigate={router.navigate} />
      case '/mytimeline':
        return <TimeLine navigate={router.navigate}/>
      case '/contacts':
        return <MyProfile navigate={router.navigate}/>
      case '/myprofile':
        return <MyProfile navigate={router.navigate} />;
      case '/contacts/whatsapp':
        return <WhatsAppContact navigate={router.navigate} />;
      case '/contacts/github':
        return <GitHubContact navigate={router.navigate} />;
      case '/contacts/email':
        return <EmailContact navigate={router.navigate} />;
      case '/contacts/linkedin':
        return <LinkedInContact navigate={router.navigate} />;
      default:
        return <div>404: Page Not Found</div>;
    }
  };

  React.useEffect(() => {
    console.log('Current Path:', router.pathname);
  }, [router.pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={window ? window() : undefined}
    >
      <DashboardLayout>
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}
