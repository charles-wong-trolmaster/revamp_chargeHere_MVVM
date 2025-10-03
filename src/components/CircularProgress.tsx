interface CircularProgressProps {
  type: "power" | "time";
  value: number;
  barColor?: string;
}

const CircularProgress = (props: CircularProgressProps) => {
  const {} = props;
  return <div uk-spinner="ratio: 1.5" />;
};

export default CircularProgress;
