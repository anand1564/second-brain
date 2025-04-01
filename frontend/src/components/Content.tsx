import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Link, Youtube, Twitter, FileText, Search } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "link" | "youtube" | "tweet" | "text";
  url?: string;
  filepath?: string;
  userId: string;
  createdAt: string;
  tags?: string[];
}

const ContentCard = ({ item }: { item: ContentItem }) => {
  const getIcon = () => {
    switch (item.type) {
      case "link":
        return <Link className="w-5 h-5 text-blue-500" />;
      case "youtube":
        return <Youtube className="w-5 h-5 text-red-500" />;
      case "tweet":
        return <Twitter className="w-5 h-5 text-sky-500" />;
      case "text":
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">{getIcon()}</div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {item.url}
              </a>
            )}
            <div className="mt-3 flex items-center gap-2">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              <span className="text-xs text-gray-500 ml-auto">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Content() {
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/content/user/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch content");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const transformedData = data.map((item) => ({
            ...item,
            tags: item.tags?.map((tag:any) => `Tag ${tag.tagId}`) || [], // Extract `tagId`
          }));
          setContent(transformedData);
        } else {
          setContent([]);
        }
      })
      .catch((error) => console.error("Error fetching content:", error));
  }, []);
  

  const filteredContent = content.filter((item) => {
    const matchesSearch = searchTerm
      ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const matchesType = selectedType ? item.type === selectedType : true;

    return matchesSearch && matchesType;
  });

  const contentTypes = [
    { type: "link", label: "Links", icon: Link, color: "blue" },
    { type: "youtube", label: "YouTube", icon: Youtube, color: "red" },
    { type: "tweet", label: "Tweets", icon: Twitter, color: "sky" },
    { type: "text", label: "Notes", icon: FileText, color: "gray" },
  ];
  const {userId} = useParams();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Second Brain userId:{userId}</h1>
        <button
          onClick={() => navigate(`/content/${userId}/add`)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              selectedType === null
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {contentTypes.map(({ type, label, icon: Icon, color }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                selectedType === type
                  ? `bg-${color}-100 text-${color}-800`
                  : `bg-gray-100 text-gray-600 hover:bg-gray-200`
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No content found
            </h3>
            <p className="text-gray-600">
              {content.length === 0
                ? "Start by adding some content to your second brain"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          filteredContent.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}