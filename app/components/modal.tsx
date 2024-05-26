const Modal = (props: any) => {
  return (
    <div className="fixed t-0 l-0 z-50 h-full w-full bg-smoke flex justify-center items-center overflow-auto">
      <div className="relative p-8 bg-white w-full max-w-md h-full md:h-auto m-auto rounded-md flex-col flex items-center">
        <button
          className="absolute top-0 right-0 p-4 hover:border-black"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <svg
            className="h-12 w-12 fill-current text-slate-500 hover:text-slate-800"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
