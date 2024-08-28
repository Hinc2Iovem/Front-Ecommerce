import { ClipLoader } from "react-spinners";

export default function ShopPreLoadComponent() {
  return (
    <section className="flex flex-col mx-auto max-w-[1110px] w-full">
      <header className="h-[9.5rem] w-full bg-white shadow-sm rounded-b-md flex items-center p-[1rem] justify-between">
        <div className="bg-white shadow-md w-[14rem] md:block hidden h-[4.5rem]"></div>
        <div className="bg-white shadow-md w-[55%] md:w-[40%] h-[4.5rem]"></div>
        <div className="w-[11rem] h-[4.5rem] flex items-center gap-[1rem]">
          <div className="w-[3rem] h-[3rem] rounded-full bg-white shadow-md"></div>
          <div className="w-[3rem] h-[3rem] rounded-full bg-white shadow-md"></div>
          <div className="w-[3rem] h-[3rem] rounded-full bg-white shadow-md"></div>
        </div>
      </header>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] p-3 gap-3 justify-center items-center mb-[2rem]">
        {Array.from({ length: 10 }).map((_, i) => {
          return (
            <div
              key={i}
              className="flex flex-col shadow-md gap-3 bg-white p-3 rounded-xl justify-between relative h-[60rem] max-w-full min-w-[30rem] "
            >
              <div className="h-[48%] w-full shadow-sm shadow-gray-400 rounded-md"></div>
              <div className="w-[50%] h-[3rem] shadow-sm shadow-gray-400 rounded-md"></div>
              <div className="w-full h-[22%] shadow-sm shadow-gray-400 rounded-md"></div>
              <div className="my-[2rem] w-[35%] h-[2rem] shadow-sm shadow-gray-400 rounded-md"></div>
              <div className="w-full flex gap-[1rem]">
                <div className="w-[10%] h-[4rem] shadow-sm shadow-gray-400 rounded-md"></div>
                <div className="w-[85%] h-[4rem] shadow-sm shadow-gray-400 rounded-md"></div>
                <ClipLoader
                  className="absolute top-[1rem] right-[1rem]"
                  size={20}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
