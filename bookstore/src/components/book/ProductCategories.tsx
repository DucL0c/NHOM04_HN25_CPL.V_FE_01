import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CategoryGroup {
  title: string;
  items: string[];
}

const categories: CategoryGroup[] = [
  {
    title: "English Books",
    items: [
      "Art & Photography",
      "Biographies & Memoirs",
      "Business & Economics",
      "How-to - Self Help",
      "Children's Books",
      "Dictionary",
      "Education - Teaching",
      "Fiction - Literature",
      "Magazines",
      "Medical Books",
      "Parenting & Relationships",
      "Reference",
      "Science - Technology",
      "History, Politics & Social Sciences",
      "Travel & Holiday",
      "Cookbooks, Food & Wine",
    ],
  },
  { title: "Sách tiếng Việt", items: [
    "Văn học",
    "Khoa học xã hội",
    "Kinh tế",
    "Giáo dục",
    "Sách thiếu nhi",
    "Sách tham khảo",
    "Sách giáo khoa",
    "Sách văn học",
    "Sách lịch sử",
    "Sách du lịch",
  ] },
  { title: "Văn phòng phẩm", items: [
    "Bút viết",
    "Giấy",
    "Sổ tay",
    "Bảng trắng",
    "Bảng ghi chú",
    "Băng dính",
    "Kéo",
    "Ghim giấy",
    "Bìa hồ sơ",
    "Thước kẻ",
  ] },
  { title: "Quà lưu niệm", items: [
    "Móc khóa",
    "Bưu thiếp",
    "Sổ tay",
    "Bảng tên",
    "Đồ chơi",
    "Gấu bông",
    "Ly sứ",
    "Áo thun",
    "Nón",
    "Túi xách",
  ] },
];

const ProductCategories: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm w-full max-w-xs">
      <h2 className="px-4 py-3 font-semibold text-gray-800 text-base border-b border-gray-300">
        Khám phá theo danh mục
      </h2>
      <div>
        {categories.map((group, index) => (
          <div key={group.title} className="border-b border-gray-300 last:border-b-0 py-2">
            {/* Header group */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <span>{group.title}</span>
              {group.items.length > 0 ? (
                openIndex === index ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )
              ) : (
                <ChevronDown size={16} className="opacity-0" />
              )}
            </button>

            {/* Items */}
            {openIndex === index && group.items.length > 0 && (
              <ul className="px-6 pb-3 space-y-1">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-black hover:text-blue-600 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
