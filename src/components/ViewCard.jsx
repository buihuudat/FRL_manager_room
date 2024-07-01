const ViewCard = ({ count, title, style = {} }) => {
  return (
    <div
      className={
        "flex flex-row items-center gap-2  p-5 rounded-md w-[49%] justify-center h-[200px]"
      }
      style={{ ...style, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <p className="font-bold text-2xl">{count}</p>
      <p className="text-[20px]">{title}</p>
    </div>
  );
};

export default ViewCard;
