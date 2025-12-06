'use client';

import { useRouter } from 'next/navigation';
import imagesAddresses from '@/utils/imageAddresses';
import SiteUrls from '@/utils/routs';
import CustomButton from '../../../../../components/CustomButton';

const AddBookBtn = () => {
    const router = useRouter();

    return (
        <CustomButton
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
