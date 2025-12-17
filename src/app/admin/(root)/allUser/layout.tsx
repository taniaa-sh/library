export const metadata = {
    title: 'Library All Users',
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
