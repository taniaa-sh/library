import EditBookPage from "../_components/EditBookPage";

const EditBook = async () => {

    return (
        <div className="bg-light-300 dark:bg-dark-900 px-8 py-10 !mt-[130px] md:!mt-[70px] w-full min-h-dvh">
            <div className="flex flex-col gap-6 bg-white dark:bg-dark-900 py-6 px-5 rounded-lg min-h-dvh">
                <EditBookPage />
            </div>
        </div>
    );
};

export default EditBook;
