export const createPopupTemplate = () => {
  return {
    title: "{HWY}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          // {
          //   fieldName: "OBJECTID", //ObjectId
          //   label: "ObjectId",
          // },
          {
            fieldName: "ID",
            label: "ID"
          },
          {
            fieldName: "HWY",
            label: "Route"
          },
          {
            fieldName: "BMP",
            label: "Begin Marker",
            format: {
              places: 0,
              digitSeparator: true
            }
          },
          {
            fieldName: "EMP",
            label: "End Marker",
            format: {
              places: 0,
              digitSeparator: true
            }
          },
          // {
          //   fieldName: 'Overall_Score',
          //   label: 'Overall Score (0-100)',
          //   format: {
          //     places: 2,
          //     digitSeparator: true,
          //   },
          // },
          {
            fieldName: "Pavement_Score",
            label: "Pavement Score (0-10)",
            format: {
              places: 2,
              digitSeparator: true
            }
          },
          {
            fieldName: "Bridge Score",
            label: "Bridge Score (0-10)",
            format: {
              places: 2,
              digitSeparator: true
            }
          },
          {
            fieldName: "Safety_Score",
            label: "Safety Score (0-10)",
            format: {
              places: 2,
              digitSeparator: true
            }
          },
          {
            fieldName: "Congestion_Score",
            label: "Congestion Score (0-10)",
            format: {
              places: 2,
              digitSeparator: true
            }
          },
          {
            fieldName: "Economic_Score",
            label: "Economic Score (0-10)",
            format: {
              places: 2,
              digitSeparator: true
            }
          },
          {
            fieldName: "Connectivity_Score",
            label: "Connectivity Score (0-10)",
            format: {
              places: 2,
              digitSeparator: true
            }
          }
        ]
      }
    ]
  };
};
