import React from 'react'
import { SidebarItem } from './SidebarItem';
import Content from './Content';

type MainContentProps = {
  sidebarItems: SidebarItem[];
  active: string;
};

const DashboardContent: React.FC<MainContentProps> = ({ sidebarItems, active}) => {
  const ActiveComponent = sidebarItems.find((item) => item.id === active)?.component || Content;
  return (
    <div className='flex-1 p-6 bg-white h-full overflow-auto'>
       {/* <h2 className="text-2xl font-bold mb-4">{sidebarItems.find((item) => item.id === active)?.label}</h2> */}
       <ActiveComponent />
    </div> 
  )
}

export default DashboardContent