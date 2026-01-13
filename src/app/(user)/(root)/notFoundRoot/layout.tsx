export const metadata = {
    title: 'Not Found page',
};

type PropsType = {
    children: React.ReactNode;
};

const PanelLayout: React.FC<PropsType> = async ({ children }) => {
    return (
        <div className="">
            {children}
        </div>
    );
};
export default PanelLayout;