import React, { useEffect, useState } from "react";
import { ReactComponent as DataWhiteIcon } from "../icons/4_Resources/Data_White.svg";
import { ReactComponent as DataGrayIcon } from "../icons/4_Resources/Data_Gray.svg";
import { ReactComponent as DocumentGrayIcon } from "../icons/4_Resources/Documents_Gray.svg";
import { ReactComponent as DocumentWhiteIcon } from "../icons/4_Resources/Documents_White.svg";

import "./ResourcePage.css";
import Tabs from "../components/Resource/Tabs/Tabs";
import AccordionItem from "../components/Resource/AccordionItem/AccordionItem";
import DataCard from "../components/Resource/DataCard/DataCard";

const CATEGORIES = {
  "DATA DOWNLOADS": ["Category1", "Category2", "Category3"],
  "TECHNICAL DOCUMENTS": ["All Documents", "Memorandums", "Technical Reports"],
};

const FILTER_CATEGORY = {
  "Filter Category1": [
    "Category 1-1",
    "Category 1-2",
    "Category 1-3",
    "Category 1-4",
    "Category 1-5",
  ],
  "Filter Category2": [
    "Category 2-1",
    "Category 2-2",
    "Category 2-3",
    "Category 2-4",
    "Category 2-5",
  ],
};

const DATAS = [
  {
    id: "0000-0000-0000",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0001",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0002",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0003",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0004",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0005",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0006",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0007",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0008",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
  {
    id: "0000-0000-0009",
    title: "Data Title",
    description:
      "This is a description of the data this is available for download.",
    source: "",
    lastUpdated: "Date",
  },
];

const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("DATA DOWNLOADS");
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState([]);

  useEffect(() => {
    setSelectedTab(CATEGORIES[selectedCategory as keyof typeof CATEGORIES][0]);
  }, [selectedCategory]);

  return (
    <div className="main-content-container">
      <div className="sidebar-container">
        <div
          className={`sidebar-item-container${
            selectedCategory === "DATA DOWNLOADS" ? " resource-icon-active" : ""
          }`}
          onClick={() => setSelectedCategory("DATA DOWNLOADS")}
        >
          {selectedCategory === "DATA DOWNLOADS" ? (
            <DataWhiteIcon />
          ) : (
            <DataGrayIcon />
          )}
          DATA DOWNLOADS
        </div>
        <hr
          style={{
            borderBottom: "2px solid #4F4F4F",
            width: "100%",
          }}
        />
        <div
          className={`sidebar-item-container${
            selectedCategory === "TECHNICAL DOCUMENTS"
              ? " resource-icon-active"
              : ""
          }`}
          onClick={() => setSelectedCategory("TECHNICAL DOCUMENTS")}
        >
          {selectedCategory === "TECHNICAL DOCUMENTS" ? (
            <DocumentWhiteIcon />
          ) : (
            <DocumentGrayIcon />
          )}
          TECHNICAL DOCUMENTS
        </div>
      </div>

      <div className="project-manage-container program-development-content-container">
        <p className="project-manage-title">Data Downloads</p>

        <Tabs
          active={selectedTab}
          tabs={CATEGORIES[selectedCategory as keyof typeof CATEGORIES]}
          onChange={setSelectedTab}
        />

        {selectedCategory === "DATA DOWNLOADS" ? (
          <div
            style={{
              display: "flex",

              width: "100%",
              gap: "40px",
              marginTop: "40px",

              height: "100%",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "30%",
              }}
            >
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                style={{
                  border: "2px solid #263C8C",
                  padding: "4px",
                  fontSize: "16px",
                  borderRadius: "5px",
                }}
                placeholder="Search"
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#263C8C",
                }}
              >
                <span>Filters</span>
                <span style={{ fontWeight: 600, textDecoration: "underline" }}>
                  CLEAR FILTERS
                </span>
              </div>

              {Object.keys(CATEGORIES).map((category, index) => (
                <AccordionItem
                  index={index}
                  category={category}
                  items={CATEGORIES[category as keyof typeof CATEGORIES]}
                  selectedItems={[]}
                />
              ))}
            </div>

            <div
              style={{
                width: "100%",
                paddingRight: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              {DATAS.map(({ id, title, description, source, lastUpdated }) => (
                <DataCard
                  id={id}
                  title={title}
                  description={description}
                  source={source}
                  lastUpdated={lastUpdated}
                />
              ))}
            </div>
          </div>
        ) : (
          <>Technical Documents</>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
