'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

interface ProgressBarProps {
    isAdmin?: boolean;
}

export default function ProgressBar({ isAdmin = false }: ProgressBarProps) {
    const pathname = usePathname();

    useEffect(() => {
        const color = isAdmin ? '#25388C' : '#D4C851';
        NProgress.configure({
            showSpinner: false,
            trickleSpeed: 200,
            template: `
                <div class="bar" role="bar" style="background: ${color}; height: 3px;">
                    <div class="peg" style="box-shadow: 0 0 10px ${color}, 0 0 5px ${color};"></div>
                </div>
            `,
        });

        NProgress.start();
        NProgress.done();

        return () => { NProgress.done(); };
    }, [pathname, isAdmin]);


    return null;
}
