import { useNavigate } from "react-router-dom";

const ViewCard = ({ count, title, style = {} }) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "flex flex-row items-center gap-2  p-5 rounded-md w-[49%] justify-center h-[200px] view-card-hover cursor-pointer"
      }
      style={{ ...style }}
      onClick={() => navigate(`/${title?.toLowerCase()}`)}
    >
      <p className="font-bold text-2xl">{count}</p>
      <p className="text-[20px]">{title}</p>
    </div>
  );
};

export default ViewCard;
