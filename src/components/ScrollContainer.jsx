export default function ScrollContainer({ children, heading }) {
  return (
    <div className="m-3">
      <h1 className="fs-4 colorText">{heading}</h1>
      <div className="d-flex gap-4 overflow-x-scroll scrollBody">
        {children}
      </div>
    </div>
  );
}
