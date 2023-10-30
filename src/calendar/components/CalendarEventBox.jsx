export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      &nbsp;<span>-</span>&nbsp;
      <span>Creado por: </span>
      <span>{user.name}</span>
    </>
  );
};
