import { useEffect, useState } from "react";
import { WiDaySunny, WiMoonAltWaxingCrescent4 } from "react-icons/wi";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer 
      hover:bg-gray-100  rounded-full p-2"
    >
      {isDark ? (
        <WiMoonAltWaxingCrescent4 size={26} color="#60A5FA" />
      ) : (
        <WiDaySunny size={26} color="#FACC15" />
      )}
    </div>
  );
};

export default ThemeToggle;