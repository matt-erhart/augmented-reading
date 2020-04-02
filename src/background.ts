import extension from "./extensionAPIs";

// const TextMenu = {
//   id: "Queue Keywords",
//   title: "Queue Keywords",
//   contexts: ["selection"]
// };

// const LinkMenu = {
//   id: "Queue Link",
//   title: "Queue Link",
//   contexts: ["link"]
// };

// interface ClickedData {
//   editable: boolean;
//   frameId: number;
//   linkUrl: string;
//   menuItemId: string;
//   pageUrl: string;
// }

// extension.runtime.onInstalled.addListener(details => {
//   chrome.contextMenus.create(TextMenu);
//   chrome.contextMenus.create(LinkMenu);
//   chrome.contextMenus.onClicked.addListener(d => {
//     const clickedData = d as ClickedData;

//     if (clickedData.menuItemId === TextMenu.id) {
//       chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(
//           tabs[0].id,
//           { selectedText: clickedData },
//           function(response) {
//             console.log(response);
//           }
//         );
//       });
//     }
//     if (clickedData.menuItemId === LinkMenu.id) {
//       chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(
//           tabs[0].id,
//           { selectedText: clickedData },
//           function(response) {
//             console.log("asdf");
//           }
//         );
//       });
//     }
//   });

//   if (details.reason === "install") {
//     console.log("extension installed!");
//   }
// });
