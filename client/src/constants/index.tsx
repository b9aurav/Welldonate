  import { BsFillGrid1X2Fill, BsFillMegaphoneFill, BsCashStack, BsFillPrinterFill, BsPersonCircle } from "react-icons/bs";

  interface navElement {
      name: string,
      icon: JSX.Element,
      link: string,
      title: string,
      disabled?: boolean
  }

  export const navlinks: navElement[] = [
    {
      name: 'dashboard',
      icon: <BsFillGrid1X2Fill className="w-full h-full p-1"/>,
      title: 'DASHBOARD',
      link: '/',
    },
    {
      name: 'campaign',
      icon: <BsFillMegaphoneFill  className="w-full h-full p-1"/>,
      link: '/create-campaign',
      title: 'CREATE CAMPAIGN'
    },
    {
      name: 'payment',
      icon: <BsCashStack  className="w-full h-full p-1"/>,
      link: '/',
      title: 'PAYMENT',
      disabled: true,
    },
    {
      name: 'withdraw',
      icon: <BsFillPrinterFill  className="w-full h-full p-1"/>,
      link: '/',
      title: 'WITHDRAW',
      disabled: true,
    },
    {
      name: 'profile',
      icon: <BsPersonCircle  className="w-full h-full p-1"/>,
      link: '/profile',
      title: 'PROFILE'
    },
  ];
