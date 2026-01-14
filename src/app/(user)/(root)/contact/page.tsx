import Image from "next/image";
import ContactUs from "./_components/ContactUs";
import imagesAddresses from "@/utils/imageAddresses";

const ContactUsPage = async () => {

    async function fakeFetch() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    await fakeFetch();

    return (
        <div className="w-full mt-4 flex flex-col gap-10 md:gap-20 px-4 md:px-10 pt-30 pb-10">
            <Image
                src={imagesAddresses.images.notFoundBg}
                alt="weather"
                width={1200}
                height={100}
                className="!w-full rounded-lg"
            />
            <ContactUs />
        </div>
    )

}

export default ContactUsPage