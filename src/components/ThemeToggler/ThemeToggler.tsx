import { presetDark, usePresets } from "@/config/color-presets";
import { updateThemeColor } from "@/utils/updateThemeColor";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { FaSun } from "react-icons/fa6";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const color = "Blue";
  const presets = usePresets();

  const activeColorArray = Object.values(
    presets.filter((item) => item.name === color)[0].colors
  );

  useEffect(() => {
    if (theme === "light") {
      updateThemeColor(
        activeColorArray[0],
        activeColorArray[1],
        activeColorArray[2],
        activeColorArray[3],
        activeColorArray[4]
      );
    }
    if (theme === "dark") {
      updateThemeColor(
        presetDark.lighter,
        presetDark.light,
        presetDark.default,
        presetDark.dark,
        presetDark.foreground
      );
    }
  }, [activeColorArray, theme]);

  return (
    <div className="w-fit cursor-pointer">
      <FaSun
        className={`text-lg ${theme === "light" ? "text-yellow-400" : ""}`}
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
            return;
          }
          setTheme("light");
        }}
      />
    </div>
  );
};

export default ThemeToggler;
