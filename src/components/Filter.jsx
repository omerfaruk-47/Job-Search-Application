import { sortOptions, statusOptions, typeOptions } from "./../constants/index";
import { filterBySearch, sortJobs } from "../redux/slices/jobSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { clearFilters } from "../redux/slices/jobSlice";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  // 1 .yoluseDebounce ile performans artırırımı sağlar ve 500 ms de bir arama yapar.
  const debouncedText = useDebounce(text, 500);

  // 2 .yol her tuş vuruşunda filtreleme yapmak düşük donanımlı cihazlarda kasmalara ve donmalara sebep olabileceğinden filtreme işlemini kullancı yazma işini bıraktığı anda yapmalıyız. Bu işleme Debounce denir. Ardışık olarak udemifgerçekleşen fonksiyon çağırma işlemlerinde fonksiyonun kısa bir zaman aralığında çağrılığını görmezsden gelir.
  useEffect(() => {
    //bir sayaç başlat ve işlemi sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);

    // eğerki süre bitmeden tekrardan useEffect çalışırsa önceki sayacın çalışmasını durdur
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtering Form</h2>
      <form>
        <div>
          <label>Search by Company Name</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>
        <div>
          <label>Situation</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz </option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz </option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sort</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden>Seçiniz </option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            id="special-button"
          >
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Reset Filters</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
