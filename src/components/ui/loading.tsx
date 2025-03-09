import { Oval } from "react-loader-spinner"

type LoadingProps = {
  height: string;
  width: string;
  color?: string;
};

const Loading = ({ height, width, color }: LoadingProps) => {
  return (
    <Oval
      height={height}
      width={width}
      color={color || "#fff"}
      visible={true}
      secondaryColor={color || "#fff"}
      ariaLabel="oval-loading"
    />
  );
};

export { Loading };
