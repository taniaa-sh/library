import About from "./_components/About";

const AboutUs = async () => {

    async function fakeFetch() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    await fakeFetch();

    return (
        <div className="w-full mt-4 flex flex-col gap-10 md:gap-20 px-4 md:px-10 pt-30 pb-10">
            <About />
        </div>
    )
}

export default AboutUs