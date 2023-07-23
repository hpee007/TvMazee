import { useEffect, useState } from "react";
import HTTP from "../Config";

export default function useFetchData(url, option, title) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = title
    if (!url) return;
    const fetchTV = async () => {
      setLoading(true);
      await HTTP.get(url, option)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchTV();
  }, [url, option, title]);

  return { data, error, loading };
}
