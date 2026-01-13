export const metadata = {
    title: 'Library Contact Us',
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