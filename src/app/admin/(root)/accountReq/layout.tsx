export const metadata = {
    title: 'Library Account Requests',
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
