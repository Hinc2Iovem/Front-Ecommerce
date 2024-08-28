import { useEffect } from "react";

type FetchOnLimitTypes = {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  scrollTriggerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function useFetchOnLimit({
  setLimit,
  loading,
  scrollTriggerRef,
}: FetchOnLimitTypes) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setLimit((prevLimit) => prevLimit + 12);
      }
    });

    if (scrollTriggerRef.current) {
      observer.observe(scrollTriggerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, scrollTriggerRef, setLimit]);
}
