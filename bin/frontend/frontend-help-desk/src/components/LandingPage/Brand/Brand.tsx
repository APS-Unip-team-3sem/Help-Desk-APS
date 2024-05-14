interface BrandProps {
    [key: string]: any;
}

const Brand: React.FC<BrandProps> = ({ ...props }) => (
    <img
        src="../src/images/logo/logo.png"
        alt="Logo DeskTail"
        {...props}
        width={180}
        height={60}
    />
);

export default Brand;