import { useEffect } from 'react';
import React from 'react'; 
import { useAuth } from '@/contexts/auth-context';
import { usePathname, useRouter } from 'next/navigation';

export default function withAuth(Component: React.ComponentType) {
    return function WithAuth(props: any) {
    const { user, token } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!user || !token) {
          router.push("/");
        } else {
          const role =user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].toLowerCase();
          const rolePath = `/${role}`; 
    
          if (!pathname.startsWith(rolePath)) {
            // router.push("/no-verify");
            router.back();
          }
        }
      }, [user, token, router, pathname]);

    if (!user || !token) {
      return null; 
    }

    return <Component {...props} />;
  };
}
