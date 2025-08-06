import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

interface TourGuideProps {
  isAdmin?: boolean;
}

const TourGuide = ({ isAdmin = false }: TourGuideProps) => {
  const [driverObj] = useState(() =>
    driver({
      showProgress: true,
      animate: true,
      nextBtnText: "<span class='text-sm text-[#11A8A5]'> >> </span>",
      prevBtnText: "<span class='text-sm text-[#11A8A5]'> << </span>",
      showButtons: ['next', 'previous', 'close'],
      stagePadding: 10,
      smoothScroll: true,
      steps: isAdmin
        ? [
            {
              popover: {
                title: 'Welcome to Suplle',
                description:
                  "Your restaurant profile has been approved. You're now ready to manage your menu, layout, and start serving customers!",
              },
            },
            {
              element: 'aside a[href="/admin/dashboard"]',
              popover: {
                title: 'Dashboard',
                description: 'View your main dashboard with key metrics and statistics.',
                side: 'right',
              },
            },
            {
              element: '#resturant-management',
              popover: {
                title: 'Restaurant Management',
                description: 'Manage all restaurants in the system.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/admin/qr-orders"]',
              popover: {
                title: 'QR Orders',
                description: 'Track and manage orders placed through QR codes.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/admin/qr-designs/view"]',
              popover: {
                title: 'QR Designs',
                description: 'Create and manage QR code designs for restaurants.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/admin/user/view"]',
              popover: {
                title: 'User Management',
                description: 'Manage users and their permissions.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/admin/analytics"]',
              popover: {
                title: 'Analytics',
                description: 'View detailed analytics and reports.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/admin/subscriptions"]',
              popover: {
                title: 'Subscriptions',
                description: 'Manage your subscription plans and billing.',
                side: 'right',
              },
            },
          ]
        : [
            {
              element: 'div#sidebarLogo',
              popover: {
                title: 'Welcome to Owner Dashboard',
                description: 'This is your restaurant management dashboard.',
                side: 'bottom',
              },
            },
            {
              element: 'aside a[href="/dashboard/info"]',
              popover: {
                title: 'Dashboard',
                description: "View your restaurant's key metrics and statistics.",
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/order/dine-in"]',
              popover: {
                title: 'Dine-in Orders',
                description: 'Manage dine-in orders for your restaurant.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/order/take-away"]',
              popover: {
                title: 'Take Away Orders',
                description: 'Manage Your Take Away orders for your restaurant.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/menu/view"]',
              popover: {
                title: 'Menu Management',
                description: "Create and manage your restaurant's menu.",
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/restaurant-layout"]',
              popover: {
                title: 'Restaurant Layout',
                description: "Design and manage your restaurant's seating layout.",
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/user/view"]',
              popover: {
                title: 'User Management',
                description: 'Manage users and their permissions.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/staff/view"]',
              popover: {
                title: 'Staff Management',
                description: 'Manage Staff and their permissions. And also manage their roles.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/analytics"]',
              popover: {
                title: 'Analytics',
                description: 'View detailed analytics and reports for your restaurant.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/subscriptions"]',
              popover: {
                title: 'Subscriptions',
                description: 'Manage your subscription plans and billing.',
                side: 'right',
              },
            },
            {
              element: 'aside a[href="/dashboard/settings"]',
              popover: {
                title: 'Settings',
                description: 'Configure your account settings and preferences.',
                side: 'right',
              },
            },
          ],
    })
  );

  useEffect(() => {
    const tourKey = isAdmin ? 'adminTourSeen' : 'ownerTourSeen';

    // only run tour if not seen this session
    if (!sessionStorage.getItem(tourKey)) {
      // Delay to ensure all UI elements exist
      const timeout = setTimeout(() => {
        driverObj.drive();
        sessionStorage.setItem(tourKey, 'true');
      }, 1000); // 1 second delay

      return () => clearTimeout(timeout);
    }
  }, [driverObj, isAdmin]);

  return null;
};

export default TourGuide;
