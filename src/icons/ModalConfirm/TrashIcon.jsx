import Icon from "@ant-design/icons";
const trashSvg = () => {
  return (
    <svg
      width="89"
      height="88"
      viewBox="0 0 89 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.5 11H55.5M11.5 22H77.5M70.1667 22L67.5953 60.5707C67.2095 66.3576 67.0166 69.2511 65.7667 71.445C64.6663 73.3766 63.0066 74.9294 61.0061 75.8988C58.7339 77 55.834 77 50.0343 77H38.9657C33.166 77 30.2661 77 27.9939 75.8988C25.9934 74.9294 24.3337 73.3766 23.2333 71.445C21.9834 69.2511 21.7905 66.3576 21.4047 60.5707L18.8333 22M37.1667 38.5V56.8333M51.8333 38.5V56.8333"
        stroke="currentColor"
        stroke-width="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function TrashIconInModal(props) {
  return <Icon component={trashSvg} {...props} />;
}
