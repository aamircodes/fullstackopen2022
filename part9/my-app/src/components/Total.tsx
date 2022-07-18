interface TotalProps {
  total: number;
}

const total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

export default total;
