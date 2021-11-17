import addNotification from "react-push-notification";

const Page = () => {
  const buttonClick = () => {
    addNotification({
      title: "Aviso!!!",
      message: "Una nueva consulta ah sido agregada",
      theme: "light",
      native: true, // when using native, your OS will handle theming.
    });
  };

  return (
    <div className="page">
      <button onClick={buttonClick} className="button bg-blue-500 py-1 px-4 text-white">
        Hello world.
      </button>
    </div>
  );
};

export default Page;
