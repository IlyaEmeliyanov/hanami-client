// Importing libraries
import React, { useEffect, useState } from "react";

// Importing components
import Spacer from "../components/common/Spacer";
import MenuCard from "../components/MenuCard";

// Importing images
import Logo from "../images/logo.svg";

// Importing icons
import ShoppingCartIcon from "../images/icons/shopping-cart.svg";
import SearchIcon from "../images/icons/search.svg";

const Home = () => {
  const getLabel = (seconds) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const MINUTES = 15;

  let [seconds, setSeconds] = useState(MINUTES * 60);
  const [timeLabel, setLabel] = useState(`${MINUTES}:00`);

  // setInterval(() => {
  //   if (seconds > 0) {
  //     seconds--;
  //     setSeconds(seconds);
  //     setLabel(getLabel(seconds));
  //   } else {
  //     setLabel("00:00");
  //   }
  // }, 1000);

  // dishes, drinks, wines, desserts

  const categories = ["dishes", "wines", "drinks", "desserts"];

  const dishesSections = [
    "antipasti",
    "bowl",
    "degustazione",
    "frittura",
    "futomaki",
    "gunkan",
    "gyoza",
    "hanami special roll",
    "hosomaki",
    "insalate",
    "maki fritto",
    "menu cena",
    "nigiri",
    "onigiri",
    "primi",
    "riso",
    "sushi misto",
    "tartare e sashimi",
    "tataki",
    "temaki",
    "teppanyaki",
    "uramaki",
    "zuppe",
    "sushi gio",
  ];

  const winesSections = ["bianchi", "rossi", "bollicine", "rosati"];

  // States
  const [menu, setMenu] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const [curCategory, setCategory] = useState("dishes");
  const [sections, setSections] = useState(dishesSections);
  const [curSection, setSection] = useState(sections[0]);
  const [filteredMenu, setFilteredMenu] = useState();

  const [totalCount, setTotalCount] = useState(0);

  const [dishes, setDishes] = useState([]);
  const [wines, setWines] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    (async () => {
      let data;
      try {
        const response = await fetch("http://localhost:5500/menu");
        data = await response.json();
        setFilteredMenu(data[curCategory][curSection]);
        setIsLoaded(true);
      } catch (error) {
        data = [];
      }
      setMenu(data);
    })();
  }, []);

  useEffect(() => {
    if (menu) {
      if (curCategory === "dishes") {
        setSections(dishesSections);
        setSection(sections[0]);
        setFilteredMenu(menu[curCategory][curSection] ?? []);
      } else if (curCategory == "wines") {
        setSections(winesSections);
        setSection(sections[0]);
        setFilteredMenu(menu[curCategory][curSection] ?? []);
      } else {
        setSections([]);
        setFilteredMenu(menu[curCategory] ?? []);
      }
    }
  }, [curCategory]);

  useEffect(() => {
    if (menu) {
      if ((curCategory == "dishes") | "wines")
        setFilteredMenu(menu[curCategory][curSection]);
      else setFilteredMenu(menu[curCategory] ?? []);
    }
  }, [curSection]);

  return (
    <section>
      <header className="header">
        <ul className="flex justify-between items-center">
          <li>
            <img src={Logo} alt="logo" />
          </li>
          <li>
            <p className="text-fontPrimary font-semibold">{timeLabel}</p>
          </li>
          {/* <li className="flex justify-center items-center gap-2">
              <img src={ShoppingCartIcon} alt="shopping-cart-icon" />
              <img src={SearchIcon} alt="search-icon" />
            </li> */}
        </ul>
      </header>

      <Spacer height="2rem" />

      <div className="">
        <ul className="flex overflow-x-scroll py-4">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => setCategory(category)}
              className="px-[1.5rem] py-[10px]"
            >
              <h3
                className={`font-semibold text-${
                  category === curCategory
                    ? "active underline"
                    : "fontSecondary"
                }`}
              >
                {category.toUpperCase()}
              </h3>
            </li>
          ))}
        </ul>
        <ul className="flex overflow-x-scroll py-4">
          {sections.map((section, index) => (
            <li
              key={index}
              onClick={() => setSection(section)}
              className="px-[1.5rem] py-[10px]"
            >
              <p
                className={`font-semibold text-${
                  section === curSection ? "active underline" : "fontSecondary"
                }`}
              >
                {section.toUpperCase()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {isLoaded && (
        <ul className="overflow-y-scroll">
          {filteredMenu.map((dish, index) => (
            <li key={index}>
                <MenuCard dishData={dish} />
            </li>
          ))}
        </ul>
      )}

      <button className="fixed z-10 w-full h-[5rem] left-[50%] bottom-0 -translate-x-[50%] px-auto py-[0.5rem] text-[#000] uppercase font-medium rounded-full gradient">
        <span className="text-[#000]">€ 28,00 (2/5 piatti)</span>
        <p className="text-[#000] uppercase font-semibold">
          procedi all'ordine
        </p>
      </button>
    </section>
  );
};

export default Home;
