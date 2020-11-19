export const adminLteConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    { label: 'Dashboard', route: 'admin/home', iconClasses: 'fa fa-tachometer' },
    {
      label: 'CMS', iconClasses: 'fa fa-list-alt', children: [
        { label: 'About Us', iconClasses: '', route: 'about-us' },
        { label: 'Services', iconClasses: '', route: 'services' },
        { label: 'Privacy Policy', iconClasses: '', route: 'privacy-policy' },
        { label: 'How It Works', iconClasses: '', route: 'how-it-works' },
        { label: 'Terms And Conditions', iconClasses: '', route: 'terms-and-conditions' }
      ]
    }
  ]
};
