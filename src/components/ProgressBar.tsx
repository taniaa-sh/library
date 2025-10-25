'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function ProgressBar() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.configure({ showSpinner: false });

        NProgress.start();
        NProgress.done();

        return () => { NProgress.done(); };
    }, [pathname]);


    return null;
}
