// assets
import { DashboardOutlined, FormOutlined, UsergroupAddOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  FormOutlined,
  UsergroupAddOutlined,
  UserOutlined, MessageOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== // 

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'applications',
      title: 'Applications',
      type: 'item',
      url: '/dashboard/applications',
      icon: icons.FormOutlined,
      breadcrumbs: false
    },
    {
      id: 'contacts',
      title: 'Emails & Phones',
      type: 'item',
      url: '/dashboard/email-phone',
      icon: icons.MessageOutlined,
      breadcrumbs: false
    },
    {
      id: 'admins',
      title: 'Admins',
      type: 'item',
      url: '/dashboard/admins',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/dashboard/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
