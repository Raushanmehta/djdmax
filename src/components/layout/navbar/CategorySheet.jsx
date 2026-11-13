import { eventLevelThree } from "@/data/category/levelThree/eventLevelThree";
import { eventLevelTwo } from "@/data/category/levelTwo/eventLevelTwo";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";


const categoryTwo = {
  event: eventLevelTwo,
};

const categoryThree = {
  event: eventLevelThree,
};

export default function CategorySheet({ selectedCategory, setShowSheet }) {
  const navigate = useNavigate();

  const childCategory = (category, parentCategoryId) => {
    return category?.filter(
      (child) => child.parentCategoryId === parentCategoryId
    );
  };

  const handleNavigate = (categoryId) => {
    navigate(`/events/${categoryId}`);
    setShowSheet?.(false);
  };

  return (
    <div className="bg-orange-50 backdrop-blur-xl shadow-2xl lg:h-auto w-full 
    border border-white/10 sticky top-0 rounded-b-2xl overflow-hidden mt-12">
      <div className="flex flex-wrap text-sm  ">

        {categoryTwo[selectedCategory]?.map((parent, index) => (
          <div
            key={parent.categoryId}
            className={`p-6 lg:w-[20%] transition-colors duration-200 
            ${index % 2 === 0 ? "bg-orange-50" : "bg-orange-200"}`}>

            {/* Parent Title */}
            <p className="mb-4 font-semibold text-black">
              {parent.name}
            </p>

            <Separator className="mb-4" />

            {/* Child Categories */}
            <ul className="space-y-2">
              {childCategory(
                categoryThree[selectedCategory],
                parent.categoryId
              )?.map((child) => (
                <li
                  key={child.categoryId}
                  onClick={() => handleNavigate(child.categoryId)}
                  className="cursor-pointer text-black
                   hover:text-orange-400 transition-colors">
                  {child.name}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
  );
};
