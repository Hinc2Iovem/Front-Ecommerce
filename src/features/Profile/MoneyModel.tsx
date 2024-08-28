import { useEffect, useState } from "react";
import useAddMoney from "../../hooks/User/useAddMoney";

const CHECK_NUMBER = /^\d+$/;

type MoneyModelTypes = {
  userId: string;
  setMoneyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedMoney: React.Dispatch<React.SetStateAction<number>>;
  moneyModal: boolean;
  secondModalRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function MoneyModel({
  userId,
  moneyModal,
  setMoneyModal,
  setUpdatedMoney,
  secondModalRef,
}: MoneyModelTypes) {
  const [money, setMoney] = useState("");
  const [error, setError] = useState(false);
  const addMoney = useAddMoney();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (CHECK_NUMBER.test(money)) {
      let moneyToNumber = +money;
      if (moneyToNumber < 0) {
        moneyToNumber = moneyToNumber * -1;
      }
      addMoney({ userId, money: moneyToNumber }).then(() =>
        setUpdatedMoney((prev) => (prev += moneyToNumber))
      );
      setMoneyModal(false);
      return;
    } else {
      setError(true);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      if (CHECK_NUMBER.test(money)) {
        setError(false);
      }
    }
  }, [error, money]);

  useEffect(() => {
    setMoney("");
  }, [moneyModal]);

  return (
    <aside
      ref={secondModalRef}
      className={`${
        moneyModal ? "top-[5rem]" : "top-[-30rem]"
      } absolute transition-all right-0 z-[1] bg-white w-[25rem] sm:w-[30rem] shadow-md h-[10rem] rounded-md p-[1rem]`}
    >
      <div className="absolute w-full flex justify-between items-center bottom-[.3rem]">
        {error ? (
          <p className="text-[1.4rem] text-red-400">Only numbers</p>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <input
          className={`${
            error
              ? "border-red-500 border-[2px] border-dotted text-red-400"
              : "border-gray-600 border-[2px] border-dotted"
          } w-full outline-none text-gray-600 p-[.3rem] px-[.5rem]`}
          type="text"
          placeholder="1000000"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
      </form>
    </aside>
  );
}
