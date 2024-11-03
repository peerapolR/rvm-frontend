import Icon from "@ant-design/icons";

const HomeIconSvg = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M5.616 0.658971L1.304 4.02358C0.584 4.58435 0 5.77799 0 6.68323V12.6194C0 14.4779 1.512 16 3.368 16H12.632C14.488 16 16 14.4779 16 12.6274V6.79538C16 5.82605 15.352 4.58435 14.56 4.03159L9.616 0.562839C8.496 -0.222237 6.696 -0.182182 5.616 0.658971Z"
        fill="#DC818D"
      />
    </svg>
  );
};

export default function HomeIcon(props) {
  return <Icon component={HomeIconSvg} theme="filled" {...props} />;
}
