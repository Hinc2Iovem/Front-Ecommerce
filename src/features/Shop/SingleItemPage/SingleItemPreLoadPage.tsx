import { ClipLoader } from "react-spinners";

export default function SingleItemPreLoadPage() {
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
      <main className="my-[4rem] flex flex-col gap-[1rem] w-full px-[1rem]">
        <div className="flex w-full justify-between">
          <ul className="flex gap-[1rem]">
            <li className="w-[8rem] h-[3rem] bg-white shadow-sm rounded-md"></li>
            <li className="w-[6rem] h-[3rem] bg-white shadow-sm rounded-md"></li>
          </ul>
          <div className="w-[12rem] bg-white shadow-sm rounded-md "></div>
        </div>

        <div className="w-full p-[1rem] h-[70rem] rounded-md bg-white shadow-sm justify-between gap-[1rem] flex md:flex-row flex-col items-center relative">
          <div className="flex flex-col gap-[1rem] md:w-[50%] w-full">
            <div className="bg-white shadow-md rounded-md h-[40rem]"></div>
            <div className="items-center gap-[.5rem] md:flex hidden">
              <div className="w-[calc(25%-.5rem)] h-[10rem] rounded-md shadow-md bg-white"></div>
              <div className="w-[calc(25%-.5rem)] h-[10rem] rounded-md shadow-md bg-white"></div>
              <div className="w-[calc(25%-.5rem)] h-[10rem] rounded-md shadow-md bg-white"></div>
              <div className="w-[calc(25%-.5rem)] h-[10rem] rounded-md shadow-md bg-white"></div>
            </div>
            <div className="md:flex hidden gap-[1rem] mt-[5rem] items-center">
              <div className="bg-white shadow-md rounded-md h-[5rem] w-[5rem]"></div>
              <div className="bg-white shadow-md rounded-md h-[5rem] w-[5rem]"></div>
            </div>
          </div>

          <div className="flex flex-col gap-[1rem] w-full md:w-[50%] md:self-start md:mt-[3.5rem] h-full mt-[2rem]">
            <div className="bg-white shadow-md w-[10rem] h-[4rem] md:block hidden"></div>
            <div className="bg-white shadow-md sm:w-[30rem] w-full h-[3rem] md:self-auto self-center"></div>
            <div className="flex flex-col gap-[.2rem]">
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="bg-white shadow-md w-full h-[1rem]"></div>
              <div className="md:flex hidden flex-col gap-[.2rem]">
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
                <div className="bg-white shadow-md w-full h-[1rem]"></div>
              </div>
            </div>

            <div className="flex w-full gap-[.5rem]">
              <div className="flex w-[30%] h-[5rem] bg-white rounded-md shadow-md"></div>
              <div className="flex w-[70%] h-[5rem] bg-white rounded-md shadow-md"></div>
            </div>
          </div>

          <ClipLoader className="absolute top-[1rem] right-[1rem]" size={20} />
        </div>
      </main>

      <footer className="w-full h-[19rem] bg-white shadow-sm rounded-md p-[1rem]">
        <div className="w-full h-[4rem] bg-white shadow-md"></div>
        <div className="flex items-center gap-[.7rem] mt-[5rem]">
          <div className="w-[3rem] h-[3rem] rounded-full shadow-md bg-white"></div>
          <div className="w-[3rem] h-[3rem] rounded-full shadow-md bg-white"></div>
          <div className="w-[3rem] h-[3rem] rounded-full shadow-md bg-white"></div>
          <div className="w-[3rem] h-[3rem] rounded-full shadow-md bg-white"></div>
        </div>
      </footer>
    </section>
  );
}
