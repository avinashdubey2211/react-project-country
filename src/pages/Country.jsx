// import { useEffect, useState, useTransition } from "react";
// import { getCountryData } from "../api/postApi";
// import { Loader } from "../components/UI/Loader";
// import { CountryCard } from "../components/Layout/CountryCard";
// import { SearchFilter } from "../components/UI/SerachFilter";

// export const Country = () => {
//   const [isPending, startTransition] = useTransition();
//   const [countries, setCountries] = useState([]);

//   const [search, setSearch] = useState();
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     startTransition(async () => {
//       const res = await getCountryData();
//       setCountries(res.data);
//     });
//   }, []);

//   if (isPending) return <Loader />;

//   // console.log(search, filter);

//   const searchCountry = (country) => {
//     if (search) {
//       return country.name.common.toLowerCase().includes(search.toLowerCase());
//     }
//     return country;
//   };

//   const filterRegion = (country) => {
//     if (filter === "all") return country;
//     return country.region === filter;
//   };

//   // here is the main logic
//   const filterCountries = countries.filter(
//     (country) => searchCountry(country) && filterRegion(country)
//   );

//   return (
//     <section className="country-section">
//       <SearchFilter
//         search={search}
//         setSearch={setSearch}
//         filter={filter}
//         setFilter={setFilter}
//         countries={countries}
//         setCountries={setCountries}
//       />

//       <ul className="grid grid-four-cols">
//         {filterCountries.map((curCountry, index) => {
//           return <CountryCard country={curCountry} key={index} />;
//         })}
//       </ul>
//     </section>
//   );
// };
import { useEffect, useState } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SerachFilter";

export const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCountryData();
        setCountries(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  const filterCountries = countries.filter((country) => {
    const matchesSearch = search
      ? country.name.common.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesFilter = filter === "all" || country.region === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <ul className="grid grid-four-cols">
        {filterCountries.map((country) => (
          <CountryCard country={country} key={country.cca3} />
        ))}
      </ul>
    </section>
  );
};
