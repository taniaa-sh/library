'use client';

import { useRouter } from 'next/navigation';
import AdminButton from '../../_components/AdminButton';
import imagesAddresses from '@/utils/imageAddresses';
import SiteUrls from '@/utils/routs';

const AddBookBtn = () => {
    const router = useRouter();

    return (
        <AdminButton
            text="Create a New Book"
            iconAddress={imagesAddresses.icons.plus}
            iconPosition="right"
            color="blue"
            containerClassName="cursor-pointer text-nowrap"
            onClick={() => router.push(SiteUrls.adminAddBook)}
        />
    );
};

export default AddBookBtn;
